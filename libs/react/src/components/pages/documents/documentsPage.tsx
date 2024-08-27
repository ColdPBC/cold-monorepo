import { useAddToastMessage, useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { ColdIcon, DocumentDetailsSidebar, DocumentUploadButton, ErrorFallback, MainContent, Modal, MUIDataGridNoRowsOverlay, Spinner } from '@coldpbc/components';
import { HexColors } from '@coldpbc/themes';
import { DataGrid, GridCallbackDetails, GridColDef, GridRenderCellParams, GridRowParams, GridTreeNodeWithRender, GridValidRowModel, MuiEvent } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { axiosFetcher } from '@coldpbc/fetchers';
import { Files, ToastMessage } from '@coldpbc/interfaces';
import { toArray } from 'lodash';
import { ButtonTypes, ClaimStatus, FileTypes, IconNames } from '@coldpbc/enums';
import { differenceInDays, format } from 'date-fns';
import { isAxiosError } from 'axios';
import { getDateActiveStatus } from '@coldpbc/lib';
import capitalize from 'lodash/capitalize';
import { withErrorBoundary } from 'react-error-boundary';

const _DocumentsPage = () => {
  const [selectedDocument, setSelectedDocument] = React.useState<Files | undefined>(undefined);
  const [documentToDelete, setDocumentToDelete] = React.useState<Files | undefined>(undefined);
  const [deleteButtonLoading, setDeleteButtonLoading] = React.useState(false);
  const [files, setFiles] = React.useState<Files[]>([]);
  const [selectedDocumentURL, setSelectedDocumentURL] = React.useState<string | undefined>(undefined);
  const { orgId } = useAuth0Wrapper();
  const { logBrowser } = useColdContext();
  const { addToastMessage } = useAddToastMessage();
  const filesSWR = useOrgSWR<Files[], any>([`/files`, 'GET'], axiosFetcher);
  const selectedFileURLSWR = useOrgSWR<string>([`/files/${selectedDocument?.id}/url`, 'GET'], axiosFetcher);
  const ref = React.useRef<HTMLDivElement>(null);
  const tableRef = React.useRef<HTMLDivElement>(null);

  const renderStatus = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    // if the value is null return null
    const expirationDate: string | null = params.row.expiration_date;
    let diff = 0;

    switch (params.value) {
      case ClaimStatus.Expired:
        return (
          <div className={'text-body w-full h-full flex flex-row justify-start items-center gap-[0px] text-tc-secondary'}>
            <ColdIcon name={IconNames.ColdDangerIcon} color={HexColors.tc.disabled} />
            <span className={'text-tc-disabled'}>Expired</span>
          </div>
        );
      case ClaimStatus.ExpiringSoon:
        if (expirationDate) {
          diff = differenceInDays(new Date(expirationDate), new Date());
        }
        return (
          <div className={'text-body w-full h-full flex flex-row justify-start items-center gap-[4px] pl-[4px] text-tc-secondary'}>
            <ColdIcon name={IconNames.ColdExpiringIcon} color={HexColors.yellow['200']} />
            <span className={'text-yellow-200'}>{diff} days</span>
          </div>
        );
      case ClaimStatus.Active:
        return (
          <div className={'text-body w-full h-full flex flex-row justify-start items-center gap-[0px] text-tc-secondary'}>
            <ColdIcon name={IconNames.ColdCheckIcon} color={HexColors.green['200']} />
            <span className={'text-green-200'}>Active</span>
          </div>
        );
      default:
      case ClaimStatus.Inactive:
        return (
          <div className={'w-full h-full flex flex-row justify-start items-center text-tc-secondary'}>
            <div className={'w-[24px] h-[24px] flex flex-row justify-center items-center'}>
              <div className={'w-[13px] h-[13px] bg-gray-70 rounded-full'}></div>
            </div>
          </div>
        );
    }
  };

  const renderDocumentType = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    return (
      <div className={'h-full w-full flex flex-row items-center justify-between'}>
        <div className={'px-[8px] py-[2px] border-[1px] border-primary rounded-[30px] text-body'}>{capitalize(params.value)}</div>
      </div>
    );
  };

  const renderDate = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    let dateString = '--';
    if (params.value.getTime() !== new Date(0).getTime()) {
      dateString = format(new Date(params.value), 'MM/d/yy');
    }
    return (
      <div data-chromatic="ignore" className={'w-full h-full flex flex-row justify-start items-center text-tc-secondary'}>
        {dateString}
      </div>
    );
  };

  const selectDocument = (id: string) => {
    const document = files.find(file => file.id === id);
    if (document) {
      setSelectedDocument(document);
    }
  };

  const updateFile = async (fileState: Files | undefined) => {
    if (fileState) {
      const response = await axiosFetcher([
        `/organizations/${orgId}/files/${fileState?.id}`,
        'PATCH',
        {
          effective_end_date: fileState.effective_end_date,
          effective_start_date: fileState.effective_start_date,
          type: fileState.type,
        },
      ]);
      if (isAxiosError(response)) {
        addToastMessage({
          message: 'Error updating file',
          type: ToastMessage.FAILURE,
        });
        logBrowser('Error updating file', 'error', { ...response }, response);
      } else {
        addToastMessage({
          message: 'File updated successfully',
          type: ToastMessage.SUCCESS,
        });
      }
      await filesSWR.mutate();
    }
  };

  const checkIfFileChanged = (fileState: Files | undefined) => {
    if (filesSWR.data && fileState) {
      // check the filesSWR.data for the fileState.id
      const swrFile = filesSWR.data?.find(file => file.id === fileState?.id);
      if (swrFile) {
        return swrFile.effective_end_date !== fileState.effective_end_date || swrFile.effective_start_date !== fileState.effective_start_date || swrFile.type !== fileState.type;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const onSidebarClose = () => {
    setSelectedDocument(undefined);
    if (checkIfFileChanged(selectedDocument)) {
      updateFile(selectedDocument);
    }
  };

  const onRowClick = (params: GridRowParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => {
    // check if the row is selected then close the sidebar
    // if a document is selected then check if the file has changed and update the file
    // if the row is not selected then select the document
    if (selectedDocument) {
      if (selectedDocument.id === params.row.id) {
        setSelectedDocument(undefined);
      } else {
        selectDocument(params.row.id);
      }
      if (checkIfFileChanged(selectedDocument)) {
        updateFile(selectedDocument);
      }
    } else {
      selectDocument(params.row.id);
    }
  };

  useEffect(() => {
    if (filesSWR.data && !isAxiosError(filesSWR.data)) {
      setFiles(filesSWR.data);
    }
  }, [filesSWR.data]);

  useEffect(() => {
    if (selectedFileURLSWR.data && !isAxiosError(selectedFileURLSWR.data)) {
      setSelectedDocumentURL(selectedFileURLSWR.data);
    }
  }, [selectedFileURLSWR]);

  if (filesSWR.error) {
    logBrowser('Error fetching files', 'error', { ...filesSWR.error }, filesSWR.error);
  }

  if (filesSWR.isLoading) {
    return <Spinner />;
  }

  const columns: GridColDef[] = [
    {
      field: 'document',
      headerName: 'Document',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      cellClassName: 'text-tc-primary font-bold',
    },
    {
      field: 'start',
      headerName: 'Start',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      minWidth: 100,
      type: 'date',
      renderCell: renderDate,
    },
    {
      field: 'end',
      headerName: 'End',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      type: 'date',
      minWidth: 100,
      renderCell: renderDate,
    },
    {
      field: 'status',
      headerName: 'Status',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      minWidth: 100,
      type: 'singleSelect',
      valueOptions: toArray(ClaimStatus),
      renderCell: renderStatus,
    },
    {
      field: 'type',
      headerName: 'Type',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      minWidth: 180,
      type: 'singleSelect',
      valueOptions: toArray(FileTypes),
      renderCell: renderDocumentType,
    },
  ];

  const rows = files
    .map(file => {
      return {
        id: file.id,
        document: file.original_name,
        start: file.effective_start_date ? new Date(file.effective_start_date) : new Date(0),
        end: file.effective_end_date ? new Date(file.effective_end_date) : new Date(0),
        status: getDateActiveStatus(file.effective_end_date),
        type: file.type,
        expiration_date: file.effective_end_date,
      };
    })
    .sort((a, b) => {
      return a.id.localeCompare(b.id);
    });

  const tableRows: GridValidRowModel[] = rows;

  const getPageButtons = () => {
    return (
      <div className={'h-auto'}>
        <DocumentUploadButton
          buttonProps={{
            label: 'Add New',
            iconLeft: IconNames.PlusIcon,
          }}
          mutateFunction={filesSWR.mutate}
        />
      </div>
    );
  };

  const deleteDocument = async (documentToDelete: Files) => {
    setDeleteButtonLoading(true);
    const response = await axiosFetcher([`/organizations/${orgId}/files/${documentToDelete.id}`, 'DELETE']);
    await filesSWR.mutate();
    if (isAxiosError(response)) {
      logBrowser('Error deleting file', 'error', { ...response }, response);
      addToastMessage({
        message: 'Error deleting file',
        type: ToastMessage.FAILURE,
      });
    } else {
      addToastMessage({
        message: 'File deleted successfully',
        type: ToastMessage.SUCCESS,
      });
    }
    setDeleteButtonLoading(false);
    setDocumentToDelete(undefined);
  };

  const onDeleteClick = (file: Files) => {
    setSelectedDocument(undefined);
    setDocumentToDelete(file);
  };

  const onDocumentDownload = async (fileURL: string | undefined) => {
    // open signedURL
    if (fileURL) {
      // window.open(fileURL, '_blank');
      // try downloading the image in the same window
      window.location.href = fileURL;
      addToastMessage({
        message: 'Downloaded file',
        type: ToastMessage.SUCCESS,
      });
    }
  };

  return (
    <div className="relative overflow-y-auto h-full w-full">
      <MainContent title="Documents" headerElement={getPageButtons()}>
        <DataGrid
          rows={tableRows}
          columns={columns}
          rowHeight={37}
          getRowClassName={() => {
            return 'text-tc-primary cursor-pointer';
          }}
          className={'text-tc-primary border-[2px] rounded-[2px] border-gray-30 bg-transparent w-full h-auto'}
          sx={{
            '--DataGrid-overlayHeight': '300px',
            '--DataGrid-rowBorderColor': HexColors.gray[30],
            '& .MuiTablePagination-root': {
              color: HexColors.tc.primary,
            },
            '& .MuiDataGrid-withBorderColor': {
              borderColor: HexColors.gray[30],
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-cell:focus-within': {
              outline: 'none',
            },
            '& .MuiDataGrid-columnHeader:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-columnHeader:focus-within': {
              outline: 'none',
            },
          }}
          slotProps={{
            filterPanel: {
              sx: {
                '& .MuiInput-input': {
                  backgroundColor: 'transparent',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  padding: '4px 0px 5px',
                  height: '32px',
                },
                '& .MuiDataGrid-filterFormColumnInput': {
                  backgroundColor: 'transparent',
                },
              },
            },
          }}
          columnHeaderHeight={40}
          onRowClick={onRowClick}
          autoHeight={true}
          slots={{
            noRowsOverlay: MUIDataGridNoRowsOverlay,
          }}
          ref={tableRef}
        />
      </MainContent>
      <DocumentDetailsSidebar
        file={selectedDocument}
        updateFile={setSelectedDocument}
        closeSidebar={onSidebarClose}
        innerRef={ref}
        deleteFile={onDeleteClick}
        isLoading={selectedFileURLSWR.isLoading}
        downloadFile={onDocumentDownload}
        signedUrl={selectedDocumentURL}
      />
      <Modal
        show={documentToDelete !== undefined}
        setShowModal={() => {
          setDocumentToDelete(undefined);
        }}
        header={{
          title: `Are you sure you want to delete ${documentToDelete?.original_name}?`,
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
            disabled: deleteButtonLoading,
            loading: deleteButtonLoading,
            variant: ButtonTypes.warning,
          },
        }}
      />
    </div>
  );
};

export const DocumentsPage = withErrorBoundary(_DocumentsPage, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in DocumentsPage: ', error);
  },
});
