import {
  DEFAULT_GRID_COL_DEF,
  DeleteDocumentModal,
  DocumentUploadButton,
  ErrorFallback,
  MainContent,
  MuiDataGrid,
} from '@coldpbc/components';
import {useAddToastMessage, useAuth0Wrapper, useColdContext, useGraphQLSWR} from '@coldpbc/hooks';
import {ToastMessage, UploadsQuery} from '@coldpbc/interfaces';
import { get } from 'lodash';
import {GridColDef, GridRenderCellParams, GridRowParams, GridTreeNodeWithRender, GridActionsCellItem } from '@mui/x-data-grid-pro';
import { format } from 'date-fns';
import React, {useState} from 'react';
import {
  IconNames,
} from '@coldpbc/enums';
import {getDocumentCategory} from '@coldpbc/lib';
import { withErrorBoundary } from 'react-error-boundary';
import {axiosFetcher} from "@coldpbc/fetchers";
import { isAxiosError} from "axios";


export const _UploadsPage = () => {
  const {logBrowser} = useColdContext();
  const {addToastMessage} = useAddToastMessage()
  const { orgId } = useAuth0Wrapper();
  const [documentToDelete, setDocumentToDelete] = useState<UploadsQuery | undefined>(undefined);

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

  const files = get(uploadsQuery, 'data.data.organizationFiles', []).map((file: UploadsQuery) => {
    return (
      {
        ...file,
        type: getDocumentCategory(file.type),
      }
    )
  })

  logBrowser(
    'Uploads Page',
    'info',
    {
      uploads: files,
      uploadsQuery: uploadsQuery
    }
  )

  const columns: GridColDef[] = [
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'originalName',
      headerName: 'Name',
      cellClassName: 'text-tc-primary text-body'
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'createdAt',
      headerName: 'Uploaded',
      cellClassName: 'text-tc-secondary text-body',
      renderCell: renderDate,
    },
    {
      headerClassName: 'bg-gray-30',
      field: 'actions',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem label={'Delete'} onClick={() => setDocumentToDelete(params.row)} showInMenu={true}/>,
        <GridActionsCellItem
          label="Download"
          onClick={async () => {
            try {
              const response = await axiosFetcher([`/organizations/${orgId}/files/${params.row.id}/url`, 'GET']);
              if (!isAxiosError(response)) {
                window.location.href = response;
                addToastMessage({
                  message: 'File downloaded successfully',
                  type: ToastMessage.SUCCESS,
                });
                logBrowser('File downloaded', 'info', { response });
              } else {
                logBrowser('Error downloading the file', 'error', { response }, response);
                addToastMessage({
                  message: 'Error downloading the file',
                  type: ToastMessage.FAILURE,
                });
              }
            } catch (error) {
              logBrowser('Error downloading the file', 'error', { error }, error);
              addToastMessage({
                message: 'Error downloading the file',
                type: ToastMessage.FAILURE,
              });
            }
          }}
          showInMenu
        />
      ]
    }
  ]

  return (
    <MainContent
      title = { 'Uploads' }
      isLoading={uploadsQuery.isLoading}
      className={'w-[calc(100%-100px)]'}
      headerElement={
        <DocumentUploadButton
          buttonProps={{
            label: 'Upload',
            iconLeft: IconNames.PlusIcon,
            className: 'h-[40px] self-center',
            'data-testid': 'upload-button',
          }}
          mutateFunction={uploadsQuery.mutate}
          successfulToastMessage={{
            message: (
              <div className={'flex flex-col gap-[10px]'}>
                <div className={'font-bold'}>Upload Complete</div>
                <div className={'test-eyebrow'}>✨ Cold AI categorization has started</div>
              </div>
            ),
            position: 'bottomRight',
          }}
          failureToastMessage={{
            position: 'bottomRight',
          }}
          uploadType={'SUSTAINABILITY_DATA'} // this is to kick off the manual review and avoid AI processing
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
      {
        documentToDelete && (
          <DeleteDocumentModal
            show={!!documentToDelete}
            setShowModal={(show: boolean) => {
              if (!show) {
                setDocumentToDelete(undefined);
              }
            }}
            id={documentToDelete?.id || ''}
            documentName={documentToDelete?.originalName || ''}
            refresh={uploadsQuery.mutate}
          />
        )
      }
    </MainContent>
  )
};

export const UploadsPage = withErrorBoundary(_UploadsPage, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in Upload Page: ', error);
  },
});
