import {
  DataGrid,
  GridColDef,
  GridColumnMenuContainer,
  GridColumnMenuFilterItem,
  GridColumnMenuProps,
  GridColumnMenuSortItem,
  GridRenderCellParams,
  GridTreeNodeWithRender,
  GridValidRowModel,
} from '@mui/x-data-grid';
import { HexColors } from '@coldpbc/themes';
import { addDays, differenceInDays, subDays } from 'date-fns';
import { IconNames } from '@coldpbc/enums';
import { ColdIcon } from '@coldpbc/components';
import { createTheme, ThemeProvider } from '@mui/material';
import { get } from 'lodash';
import { OwnerState } from '@mui/x-data-grid/components/containers/GridRootStyles';

export const SuppliersDataGrid = () => {
  const certificationStatuses = ['InActive', 'Active', 'Expired', 'Expiring Soon'];

  const supplierData = [
    {
      id: 1,
      name: 'VietWear Garments Co., Ltd.',
      country: 'Vietnam',
      certificate_claims: {
        pfas: {
          expiration_date: addDays(new Date(), 5).toISOString(),
        },
        lead: {
          expiration_date: null,
        },
        phthalate: {
          expiration_date: null,
        },
        bluesign: {
          expiration_date: addDays(new Date(), 5).toISOString(),
        },
      },
    },
    {
      id: 2,
      name: 'Pritt, Inc.',
      country: 'China',
      certificate_claims: {
        pfas: {
          expiration_date: addDays(new Date(), 5).toISOString(),
        },
        lead: {},
        phthalate: {
          expiration_date: addDays(new Date(), 5).toISOString(),
        },
        bluesign: {},
      },
    },
    {
      id: 3,
      name: 'Smotherman, Inc.',
      country: 'Vietnam',
      certificate_claims: {
        pfas: {
          expiration_date: addDays(new Date(), 10).toISOString(),
        },
        lead: {
          expiration_date: addDays(new Date(), 70).toISOString(),
        },
      },
    },
    {
      id: 4,
      name: 'Menzie, Inc.',
      country: 'Vietnam',
      certificate_claims: {
        pfas: {
          expiration_date: addDays(new Date(), 30).toISOString(),
        },
        bluesign: {
          expiration_date: addDays(new Date(), 70).toISOString(),
        },
      },
    },
    {
      id: 5,
      name: 'Want, Inc.',
      country: 'Vietnam',
      certificate_claims: {
        pfas: {
          expiration_date: addDays(new Date(), 70).toISOString(),
        },
        // lead: {
        //   expiration_date: addDays(new Date(), 5).toISOString(),
        // },
        // phthalate: {
        //   expiration_date: addDays(new Date(), 70).toISOString(),
        // },
        bluesign: {
          expiration_date: subDays(new Date(), 3).toISOString(),
        },
      },
    },
    {
      id: 6,
      name: 'Tattershall, Inc.',
      country: 'Vietnam',
      certificate_claims: {
        // pfas: {
        //   expiration_date: addDays(new Date(), 5).toISOString(),
        // },
        lead: {
          expiration_date: subDays(new Date(), 30).toISOString(),
        },
        phthalate: {
          expiration_date: subDays(new Date(), 3).toISOString(),
        },
        // bluesign: {
        //   expiration_date: addDays(new Date(), 22).toISOString(),
        // },
      },
    },
    {
      id: 7,
      name: 'Panek, Inc.',
      country: 'Vietnam',
      certificate_claims: {
        pfas: {
          expiration_date: addDays(new Date(), 60).toISOString(),
        },
        lead: {
          expiration_date: addDays(new Date(), 30).toISOString(),
        },
        // phthalate: {
        //   expiration_date: addDays(new Date(), 5).toISOString(),
        // },
        bluesign: {
          expiration_date: addDays(new Date(), 70).toISOString(),
        },
      },
    },
    {
      id: 8,
      name: 'Faul, Inc.',
      country: 'Vietnam',
      certificate_claims: {
        pfas: {
          expiration_date: addDays(new Date(), 5).toISOString(),
        },
        lead: {
          expiration_date: addDays(new Date(), 5).toISOString(),
        },
        phthalate: {
          // expiration_date: addDays(new Date(), 5).toISOString(),
        },
        bluesign: {
          expiration_date: addDays(new Date(), 70).toISOString(),
        },
      },
    },
    {
      id: 9,
      name: 'Hushon, Inc.',
      country: 'Vietnam',
      certificate_claims: {
        pfas: {
          expiration_date: addDays(new Date(), 70).toISOString(),
        },
        lead: {
          expiration_date: addDays(new Date(), 5).toISOString(),
        },
        phthalate: {
          expiration_date: addDays(new Date(), 5).toISOString(),
        },
        bluesign: {
          expiration_date: addDays(new Date(), 70).toISOString(),
        },
      },
    },
  ];

  const certificateClaims = [
    {
      name: 'pfas',
      label: 'PFAS-Test',
    },
    {
      name: 'lead',
      label: 'Lead-Test',
    },
    {
      name: 'phthalate',
      label: 'Phthalate-Test',
    },
    {
      name: 'bluesign',
      label: 'Bluesign',
    },
  ];

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

  const CustomColumnMenuComponent = (props: GridColumnMenuProps & OwnerState) => {
    const { hideMenu, colDef, color, ...other } = props;
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} colDef={colDef} {...other}>
        <GridColumnMenuSortItem onClick={hideMenu} colDef={colDef!} />
        <GridColumnMenuFilterItem onClick={hideMenu} colDef={colDef!} />
      </GridColumnMenuContainer>
    );
    // }
    // if (colDef.field === 'stars') {
    //   return (
    //     <StyledGridColumnMenuContainer
    //       hideMenu={hideMenu}
    //       colDef={colDef}
    //       ownerState={{ color }}
    //       {...other}
    //     >
    //       <Box
    //         sx={{
    //           width: 127,
    //           height: 160,
    //           display: 'flex',
    //           justifyContent: 'center',
    //           flexDirection: 'column',
    //           alignItems: 'center',
    //         }}
    //       >
    //         <StarOutlineIcon sx={{ fontSize: 80 }} />
    //       </Box>
    //     </StyledGridColumnMenuContainer>
    //   );
    // }
    // return (
    //   <StyledGridColumnMenu
    //     hideMenu={hideMenu}
    //     colDef={colDef}
    //     ownerState={{ color }}
    //     {...other}
    //   />
    // );
  };

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
