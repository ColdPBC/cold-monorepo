import { useAddToastMessage, useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { ColdIcon, DocumentDetailsSidebar, ErrorFallback, MainContent, MUIDataGridNoRowsOverlay, Spinner } from '@coldpbc/components';
import { HexColors } from '@coldpbc/themes';
import { DataGrid, GridActionsCellItem, GridCallbackDetails, GridColDef, GridRenderCellParams, GridRowParams, GridTreeNodeWithRender, MuiEvent } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { axiosFetcher } from '@coldpbc/fetchers';
import { Files, ToastMessage } from '@coldpbc/interfaces';
import { toArray } from 'lodash';
import { CertificationStatus, FileTypes, IconNames } from '@coldpbc/enums';
import { differenceInDays, format } from 'date-fns';
import { isAxiosError } from 'axios';
import { getDateActiveStatus } from '@coldpbc/lib';
import capitalize from 'lodash/capitalize';
import { withErrorBoundary } from 'react-error-boundary';

const _DocumentsPage = () => {
  const [selectedDocument, setSelectedDocument] = React.useState<Files | undefined>(undefined);
  const [files, setFiles] = React.useState<Files[]>([]);
  const { orgId } = useAuth0Wrapper();
  const { logBrowser } = useColdContext();
  const { addToastMessage } = useAddToastMessage();
  const filesSWR = useOrgSWR<Files[], any>([`/files`, 'GET'], axiosFetcher);
  const ref = React.useRef<HTMLDivElement>(null);
  const tableRef = React.useRef<HTMLDivElement>(null);

  const renderStatus = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    // if the value is null return null
    const expirationDate: string | null = params.row.expiration_date;
    let diff = 0;

    switch (params.value) {
      case CertificationStatus.Expired:
        return (
          <div className={'text-body w-full h-full flex flex-row justify-start items-center gap-[0px] text-tc-secondary'}>
            <ColdIcon name={IconNames.ColdDangerIcon} color={HexColors.tc.disabled} />
            <span className={'text-tc-disabled'}>Expired</span>
          </div>
        );
      case CertificationStatus.ExpiringSoon:
        if (expirationDate) {
          diff = differenceInDays(new Date(expirationDate), new Date());
        }
        return (
          <div className={'text-body w-full h-full flex flex-row justify-start items-center gap-[4px] pl-[4px] text-tc-secondary'}>
            <ColdIcon name={IconNames.ColdExpiringIcon} color={HexColors.yellow['200']} />
            <span className={'text-yellow-200'}>{diff} days</span>
          </div>
        );
      case CertificationStatus.Active:
        return (
          <div className={'text-body w-full h-full flex flex-row justify-start items-center gap-[0px] text-tc-secondary'}>
            <ColdIcon name={IconNames.ColdCheckIcon} color={HexColors.green['200']} />
            <span className={'text-green-200'}>Active</span>
          </div>
        );
      default:
      case CertificationStatus.Inactive:
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
    return <div className={'w-full h-full flex flex-row justify-start items-center text-tc-secondary'}>{dateString}</div>;
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
      valueOptions: toArray(CertificationStatus),
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

  const rows = files.map(file => {
    return {
      id: file.id,
      document: file.original_name,
      start: file.effective_start_date ? new Date(file.effective_start_date) : new Date(0),
      end: file.effective_end_date ? new Date(file.effective_end_date) : new Date(0),
      status: getDateActiveStatus(file.effective_end_date),
      type: file.type,
      expiration_date: file.effective_end_date,
    };
  });

  return (
    <div className="relative overflow-y-hidden h-full w-full">
      <MainContent title="Documents">
        <DataGrid
          rows={rows}
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
        refreshFiles={() => {
          filesSWR.mutate();
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
