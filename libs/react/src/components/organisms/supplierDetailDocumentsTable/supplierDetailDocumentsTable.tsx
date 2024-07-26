import { DataGrid, GridColDef, GridRenderCellParams, GridTreeNodeWithRender, GridValidRowModel } from '@mui/x-data-grid';
import { HexColors } from '@coldpbc/themes';
import { ColdIcon, MUIDataGridNoRowsOverlay } from '@coldpbc/components';
import { CertificationStatus, IconNames } from '@coldpbc/enums';
import { differenceInDays, format } from 'date-fns';
import { forEach, toArray } from 'lodash';
import { getDateActiveStatus } from '@coldpbc/lib';

export const SupplierDetailDocumentsTable = (props: {
  documents: {
    name: string;
    expirationDate: string | null;
    status: string;
    type: string;
  }[];
}) => {
  const { documents } = props;

  const renderStatus = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    // if the value is null return null
    const expirationDate: string | null = params.row.expiration_date;
    let diff = 0;

    switch (params.value) {
      case CertificationStatus.Expired:
        return (
          <div className={'text-body w-full h-full flex flex-row justify-start items-center gap-[0px]'}>
            <ColdIcon name={IconNames.ColdDangerIcon} color={HexColors.tc.disabled} />
            <span className={'text-tc-disabled'}>Expired</span>
          </div>
        );
      case CertificationStatus.ExpiringSoon:
        if (expirationDate) {
          diff = differenceInDays(new Date(expirationDate), new Date());
        }
        return (
          <div className={'text-body w-full h-full flex flex-row justify-start items-center gap-[4px] pl-[4px]'}>
            <ColdIcon name={IconNames.ColdExpiringIcon} color={HexColors.yellow['200']} />
            <span className={'text-yellow-200'}>{diff} days</span>
          </div>
        );
      case CertificationStatus.Active:
        return (
          <div className={'text-body w-full h-full flex flex-row justify-start items-center gap-[0px]'}>
            <ColdIcon name={IconNames.ColdCheckIcon} color={HexColors.green['200']} />
            <span className={'text-green-200'}>Active</span>
          </div>
        );
      default:
      case CertificationStatus.Inactive:
        return (
          <div className={'w-full h-full flex flex-row justify-start items-center'}>
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
        <div className={'px-[8px] py-[2px] border-[1px] border-primary rounded-[30px] text-body'}>{params.value}</div>
      </div>
    );
  };

  const renderDate = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    let dateString = '--';
    if (params.value.getTime() !== new Date(0).getTime()) {
      dateString = format(new Date(params.value), 'MM/d/yy');
    }
    return <div className={'w-full h-full flex flex-row justify-start items-center'}>{dateString}</div>;
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
    },
    {
      field: 'expiration_date',
      headerName: 'Expiration',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      type: 'date',
      renderCell: renderDate,
    },
    {
      field: 'status',
      headerName: 'Status',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      type: 'singleSelect',
      valueOptions: toArray(CertificationStatus),
      renderCell: renderStatus,
    },
    {
      field: 'document_type',
      headerName: 'Type',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      type: 'singleSelect',
      valueOptions: ['Certificate', 'Test', 'Policy', 'Other'],
      renderCell: renderDocumentType,
    },
  ];

  let newRows: GridValidRowModel[] = [];

  forEach(documents, (document, index) => {
    newRows.push({
      id: index,
      name: document.name,
      expiration_date: document.expirationDate !== null ? new Date(document.expirationDate) : new Date(0),
      status: getDateActiveStatus(document.expirationDate),
      document_type: document.type,
    });
  });

  const rows: GridValidRowModel[] = newRows;

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      rowHeight={37}
      getRowClassName={() => {
        return 'text-tc-primary cursor-pointer';
      }}
      className={'text-tc-primary border-[2px] rounded-[2px] border-gray-50 bg-transparent w-full h-auto'}
      sx={{
        '--DataGrid-overlayHeight': '300px',
        '--DataGrid-rowBorderColor': HexColors.gray[50],
        '& .MuiTablePagination-root': {
          color: HexColors.tc.primary,
        },
        '& .MuiDataGrid-withBorderColor': {
          borderColor: HexColors.gray[50],
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
      autoHeight={true}
      slots={{
        noRowsOverlay: MUIDataGridNoRowsOverlay,
      }}
      disableColumnMenu={true}
    />
  );
};
