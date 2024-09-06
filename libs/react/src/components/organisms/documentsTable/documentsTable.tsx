import { DataGrid, GridCallbackDetails, GridColDef, GridRenderCellParams, GridRowParams, GridTreeNodeWithRender, GridValidRowModel, MuiEvent } from '@mui/x-data-grid';
import { ClaimStatus, FileTypes, IconNames } from '@coldpbc/enums';
import { ColdIcon, MUIDataGridNoRowsOverlay } from '@coldpbc/components';
import { HexColors } from '@coldpbc/themes';
import { differenceInDays, format } from 'date-fns';
import capitalize from 'lodash/capitalize';
import React from 'react';
import { toArray } from 'lodash';
import { getDateActiveStatus } from '@coldpbc/lib';
import { Files } from '@coldpbc/interfaces';

export const DocumentsTable = (props: {
  files: Files[];
  selectedDocument: Files | undefined;
  setSelectedDocument: (document: Files | undefined) => void;
  selectDocument: (id: string) => void;
  checkIfFileChanged: (fileState: Files | undefined) => boolean;
  updateFile: (file: Files) => void;
}) => {
  const { files, selectedDocument, setSelectedDocument, selectDocument, checkIfFileChanged, updateFile } = props;

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

  return (
    <DataGrid
      rows={tableRows}
      columns={columns}
      rowHeight={37}
      // getRowClassName={() => {
      //   return 'text-tc-primary cursor-pointer';
      // }}
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
    />
  );
};
