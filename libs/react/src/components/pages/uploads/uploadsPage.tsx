import {
  ColdIcon,
  DEFAULT_GRID_COL_DEF,
  ErrorFallback,
  MainContent, Modal,
  MuiDataGrid,
  UploadModal
} from '@coldpbc/components';
import {useAddToastMessage, useAuth0Wrapper, useColdContext, useGraphQLSWR} from '@coldpbc/hooks';
import {FilesWithAssurances, ToastMessage, UploadsQuery} from '@coldpbc/interfaces';
import { get } from 'lodash';
import {GridColDef, GridRenderCellParams, GridRowParams, GridTreeNodeWithRender, GridActionsCellItem } from '@mui/x-data-grid-pro';
import { format } from 'date-fns';
import React, {ReactNode, useState} from 'react';
import {
  ButtonTypes,
  DocumentTypes,
  IconNames, MainDocumentCategory,
  ProcessingStatus,
  UIProcessingStatus,
  UIProcessingStatusMapping,
} from '@coldpbc/enums';
import { HexColors } from '@coldpbc/themes';
import { formatScreamingSnakeCase } from '@coldpbc/lib';
import { withErrorBoundary } from 'react-error-boundary';
import {axiosFetcher} from "@coldpbc/fetchers";
import {AxiosError, isAxiosError} from "axios";

const ProcessingStatusConfig: Record<UIProcessingStatus, {
  icon: IconNames;
  color: string;
  textColorClass: string;
  iconClass: string;
  containerExtraClass?: string;
}> = {
  [UIProcessingStatusMapping[ProcessingStatus.IMPORT_COMPLETE]]: {
    icon: IconNames.ColdCheckIcon,
    color: HexColors.green['200'],
    textColorClass: 'text-green-200',
    iconClass: 'w-6 h-6',
  },
  [UIProcessingStatusMapping[ProcessingStatus.PROCESSING_ERROR]]: {
    icon: IconNames.ColdDangerIcon,
    color: HexColors.red['100'],
    textColorClass: 'text-red-100',
    iconClass: 'w-6 h-6',
  },
  [UIProcessingStatusMapping[ProcessingStatus.MANUAL_REVIEW]]: {
    icon: IconNames.ColdRightArrowIcon,
    color: HexColors.lightblue['100'],
    textColorClass: 'text-lightblue-100',
    iconClass: 'w-6 h-6',
  },
  [UIProcessingStatusMapping[ProcessingStatus.AI_PROCESSING]]: {
    icon: IconNames.ColdAiIcon,
    color: HexColors.yellow['100'],
    textColorClass: 'text-yellow-100',
    iconClass: 'w-5 h-5',
    containerExtraClass: 'p-1 w-6 h-6 flex items-center justify-center', // extra wrapper for AI
  },
};

export const _UploadsPage = () => {
  const {logBrowser} = useColdContext();
  const { orgId } = useAuth0Wrapper();
  const [documentToDelete, setDocumentToDelete] = useState<UploadsQuery | undefined>(undefined);
  const [deletingDocument, setDeletingDocument] = useState<boolean>(false);
  const {addToastMessage} = useAddToastMessage()

  const uploadsQuery = useGraphQLSWR<{
      organizationFiles: UploadsQuery[];
    }>('GET_ALL_UPLOADS', {
      filter: {
        organization: {
          id: orgId,
        },
        visible: true,
      },
    })

  const renderDate = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    let dateString = '--';
    if (new Date(params.value).getTime() !== new Date(0).getTime()) {
      dateString = format(new Date(params.value), 'M/d/yy h:mm a');
    }
    return dateString
  };

  const renderStatus = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    const status = params.value as typeof UIProcessingStatusMapping[keyof typeof UIProcessingStatusMapping];
    const config = ProcessingStatusConfig[status];
    if (!config) return null;

    const coldIcon = (): ReactNode => {
      return (
        <ColdIcon
          name={config.icon}
          className={config.iconClass}
          color={config.color}
        />
      )
    }

    return (
      <div
        className={`w-full h-full flex flex-row justify-start items-center text-body ${config.textColorClass}`}
      >
        {status === UIProcessingStatusMapping[ProcessingStatus.AI_PROCESSING] ? (
          <div className={config.containerExtraClass}>
            {coldIcon()}
          </div>
        ) : (
          <>
            {coldIcon()}
          </>
        )}
        {status}
      </div>
    );
  };

  const error = get(uploadsQuery, 'data.error', null);
  if(error){
    logBrowser(
      'Getting Uploads Error',
      'error',
      {
        error: error
      },
      error
    );
  }

  const fileTypes = Object.values(DocumentTypes).map((type) =>
    formatScreamingSnakeCase(type)
  )

  const statuses = Object.values(UIProcessingStatusMapping)

  const files = get(uploadsQuery, 'data.data.organizationFiles', []);

  logBrowser(
    'Uploads Page',
    'info',
    {
      uploads: files,
      uploadsQuery: uploadsQuery
    }
  )

  const deleteDocument = async (documentToDelete: UploadsQuery | undefined) => {
    if(!documentToDelete) return;
    setDeletingDocument(true);
    const response = await axiosFetcher([`/organizations/${orgId}/files/${documentToDelete.id}`, 'DELETE']);
    if (isAxiosError(response)) {
      const axiosError: AxiosError = response;
      if(axiosError.status === 401) {
        logBrowser('Unauthorized to delete file', 'error', { axiosError }, axiosError);
        await addToastMessage({
          message: 'Unauthorized to delete file',
          type: ToastMessage.FAILURE,
        });
      } else {
        logBrowser('Error deleting file', 'error', { axiosError }, axiosError);
        await addToastMessage({
          message: 'Error deleting file',
          type: ToastMessage.FAILURE,
        });
      }
    } else {
      logBrowser('File deleted', 'info', { response });
      await addToastMessage({
        message: 'File deleted successfully',
        type: ToastMessage.SUCCESS,
      });
    }
    await uploadsQuery.mutate();
    setDeletingDocument(false);
    setDocumentToDelete(undefined);
  };

  const columns: GridColDef[] = [
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'originalName',
      headerName: 'Name',
      cellClassName: 'text-tc-primary text-body'
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'type',
      headerName: 'Import Type',
      type: 'singleSelect',
      valueOptions: fileTypes,
      cellClassName: 'text-tc-secondary text-body',
      valueFormatter: (value: string) => {
        return formatScreamingSnakeCase(value);
      },
      valueGetter: (value: string) => {
        return formatScreamingSnakeCase(value);
      },
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'createdAt',
      headerName: 'Uploaded',
      cellClassName: 'text-tc-secondary text-body',
      renderCell: renderDate,
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'processingStatus',
      headerName: 'Status',
      cellClassName: 'text-body',
      renderCell: renderStatus,
      minWidth: 218,
      type: 'singleSelect',
      valueOptions: statuses,
      valueFormatter: (value: string) => {
        return UIProcessingStatusMapping[value as ProcessingStatus];
      },
      valueGetter: (value: string) => {
        return UIProcessingStatusMapping[value as ProcessingStatus];
      },
    },
    {
      headerClassName: 'bg-gray-30',
      field: 'actions',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem label={'Delete'} onClick={() => setDocumentToDelete(params.row.id)} showInMenu={true}/>,
      ]
    }
  ]

  return (
    <MainContent
      title = { 'Uploads' }
      isLoading={uploadsQuery.isLoading}
      className={'w-[calc(100%-100px)]'}
      headerElement={
      <UploadModal
        refreshData={uploadsQuery.mutate}
        types={[
          MainDocumentCategory.BillOfMaterial,
          MainDocumentCategory.Assurance,
          MainDocumentCategory.InternalSustainabilityPolicy,
          MainDocumentCategory.SustainabilityData,
        ]}
      />
    }
    >
      <MuiDataGrid
        rows={files}
        columns={columns}
        disableRowSelectionOnClick
        initialState={{
          sorting: {
            sortModel:[{
              field: 'createdAt',
              sort: 'desc'
            }]
          }
        }}
      />
      <Modal
        show={documentToDelete !== undefined}
        setShowModal={() => {
          setDocumentToDelete(undefined);
        }}
        header={{
          title: `Are you sure you want to delete ${documentToDelete?.originalName}?`,
          cardProps: {
            glow: false,
          },
        }}
        body={
          <div className={'text-body text-tc-primary'}>
            Once you delete, this document will be removed from Cold and no longer used in any assessments or reporting. This cannot be undone.
          </div>
        }
        footer={{
          rejectButton: {
            label: 'Cancel',
            onClick: () => setDocumentToDelete(undefined),
            variant: ButtonTypes.secondary,
          },
          resolveButton: {
            label: 'Yes, Delete',
            onClick: async () => {
              if (documentToDelete) {
                await deleteDocument(documentToDelete);
              }
            },
            disabled: deletingDocument,
            loading: deletingDocument,
            variant: ButtonTypes.warning,
          },
        }}
      />
    </MainContent>
  )
};

export const UploadsPage = withErrorBoundary(_UploadsPage, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in Upload Page: ', error);
  },
});
