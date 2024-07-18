import { DataGrid, GridColDef, GridRenderCellParams, GridTreeNodeWithRender, GridValidRowModel } from '@mui/x-data-grid';
import { HexColors } from '@coldpbc/themes';
import { differenceInDays } from 'date-fns';
import { IconNames } from '@coldpbc/enums';
import { ColdIcon } from '@coldpbc/components';
import { createTheme, ThemeProvider } from '@mui/material';
import { get } from 'lodash';
import { getClaimsMock, getSupplierMock } from '@coldpbc/mocks';

export const SuppliersDataGrid = () => {
  const certificationStatuses = ['InActive', 'Active', 'Expired', 'Expiring Soon'];

  const supplierData = getSupplierMock();

  const certificateClaims = getClaimsMock();

  const renderCell = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    // if the value is null return null
    const expirationDate: string | null = get(supplierData[params.row.id - 1], `certificate_claims.${params.field}.expiration_date`, null);
    let diff = 0;

    switch (params.value) {
      case 'Expired':
        return (
          <div className={'text-body w-full h-full flex flex-row justify-start items-center gap-[0px]'}>
            <ColdIcon name={IconNames.ColdDangerIcon} color={HexColors.red['100']} />
            <span className={'text-red-100'}>Expired</span>
          </div>
        );
      case 'Expiring Soon':
        if (expirationDate) {
          diff = differenceInDays(new Date(expirationDate), new Date());
        }
        return (
          <div className={'text-body w-full h-full flex flex-row justify-start items-center gap-[4px] pl-[4px]'}>
            <ColdIcon name={IconNames.ColdExpiringIcon} color={HexColors.yellow['200']} />
            <span className={'text-yellow-200'}>{diff} days</span>
          </div>
        );
      case 'Active':
        return (
          <div className={'text-body w-full h-full flex flex-row justify-start items-center gap-[0px]'}>
            <ColdIcon name={IconNames.ColdCheckIcon} color={HexColors.green['200']} />
            <span className={'text-green-200'}>Active</span>
          </div>
        );
      default:
      case 'InActive':
        return (
          <div className={'w-full h-full flex flex-row justify-start items-center'}>
            <div className={'w-[24px] h-[24px] flex flex-row justify-center items-center'}>
              <div className={'w-[13px] h-[13px] bg-gray-70 rounded-full'}></div>
            </div>
          </div>
        );
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      minWidth: 230,
      renderCell: params => {
        return <div className={'h-full flex items-center text-body text-tc-primary font-bold truncate'}>{params.value}</div>;
      },
    },
    {
      field: 'country',
      headerName: 'Country',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      minWidth: 180,
    },
  ];

  certificateClaims.forEach((claim, index) => {
    columns.push({
      field: claim.name,
      headerName: claim.label,
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      renderCell: params => {
        return renderCell(params);
      },
      type: 'singleSelect',
      valueOptions: certificationStatuses,
    });
  });

  let newRows: GridValidRowModel[] = [];
  supplierData.forEach((supplier, index) => {
    const row = {
      id: index + 1,
      name: supplier.name,
      country: supplier.country,
    };

    columns.forEach(column => {
      if (column.field !== 'name' && column.field !== 'country') {
        row[column.field] = 'InActive';
      }
    });

    certificateClaims.forEach(claim => {
      const expirationDate: string | null = get(supplier, `certificate_claims.${claim.name}.expiration_date`, null);
      // if the expiration date is null, set the value to InActive
      if (expirationDate === null || expirationDate === undefined) {
        row[claim.name] = 'InActive';
      } else {
        // get the difference between the current date and the date in the cell
        const diff = differenceInDays(new Date(expirationDate), new Date());
        if (diff < 0) {
          row[claim.name] = 'Expired';
        } else if (diff < 60) {
          row[claim.name] = 'Expiring Soon';
        } else {
          row[claim.name] = 'Active';
        }
      }
    });

    newRows.push(row);
  });

  const rows: GridValidRowModel[] = newRows;

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    typography: {
      fontFamily: ['Inter'].join(','),
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={37}
        getRowClassName={() => {
          return 'text-tc-primary';
        }}
        className={'text-tc-primary border-[2px] rounded-[2px] border-gray-30 bg-transparent w-full h-auto'}
        sx={{
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
      />
    </ThemeProvider>
  );
};
