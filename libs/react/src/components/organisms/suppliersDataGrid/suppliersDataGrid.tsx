import { DataGrid, GridColDef, GridRenderCellParams, GridTreeNodeWithRender, GridValidRowModel } from '@mui/x-data-grid';
import { HexColors } from '@coldpbc/themes';
import { differenceInDays } from 'date-fns';
import { ClaimStatus, IconNames } from '@coldpbc/enums';
import { ColdIcon, MUIDataGridNoRowsOverlay, Spinner } from '@coldpbc/components';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { useEffect, useState } from 'react';
import { SuppliersWithCertifications } from '@coldpbc/interfaces';
import { isAxiosError } from 'axios';
import { useAuth0Wrapper } from '@coldpbc/hooks';
import { useNavigate } from 'react-router-dom';
import { isEqual, toArray, uniqWith } from 'lodash';

export const SuppliersDataGrid = () => {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState<SuppliersWithCertifications[]>([]);
  const { orgId } = useAuth0Wrapper();
  const suppliersSWR = useSWR<SuppliersWithCertifications[], any, any>([`/organizations/${orgId}/suppliers`, 'GET'], axiosFetcher);

  useEffect(() => {
    if (suppliersSWR.data) {
      if (isAxiosError(suppliersSWR.data)) {
        // handle no suppliers 404, set state to empty array
        if (isAxiosError(suppliersSWR.data) && suppliersSWR.data?.response?.status === 404) {
          setSuppliers([]);
        }
      } else {
        setSuppliers(suppliersSWR.data);
      }
    }
  }, [suppliersSWR.data]);

  const uniqClaims = uniqWith(
    suppliers
      .map(supplier =>
        supplier.organization_claims.map(claim => {
          return {
            claim_name: claim.claim?.name,
            claim_id: claim.claim?.id,
          };
        }),
      )
      .flat(),
    isEqual,
  );

  if (suppliersSWR.isLoading) {
    return <Spinner />;
  }

  const renderCell = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    // if the value is null return null
    const expirationDate: string | undefined | null = suppliers
      .find(supplier => supplier.id === params.row.id)
      ?.organization_claims.find(certificateClaim => certificateClaim.claim?.name === params.field)?.organization_file.effective_end_date;
    let diff = 0;

    switch (params.value) {
      case ClaimStatus.Expired:
        return (
          <div className={'text-body w-full h-full flex flex-row justify-start items-center gap-[0px]'}>
            <ColdIcon name={IconNames.ColdDangerIcon} color={HexColors.red['100']} />
            <span className={'text-red-100'}>Expired</span>
          </div>
        );
      case ClaimStatus.ExpiringSoon:
        if (expirationDate) {
          diff = differenceInDays(new Date(expirationDate), new Date());
        }
        return (
          <div className={'text-body w-full h-full flex flex-row justify-start items-center gap-[4px] pl-[4px]'}>
            <ColdIcon name={IconNames.ColdExpiringIcon} color={HexColors.yellow['200']} />
            <span className={'text-yellow-200'}>{diff} days</span>
          </div>
        );
      case ClaimStatus.Active:
        return (
          <div className={'text-body w-full h-full flex flex-row justify-start items-center gap-[0px]'}>
            <ColdIcon name={IconNames.ColdCheckIcon} color={HexColors.green['200']} />
            <span className={'text-green-200'}>Active</span>
          </div>
        );
      default:
      case ClaimStatus.Inactive:
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

  uniqClaims.forEach((claim, index) => {
    columns.push({
      field: claim.claim_name,
      headerName: claim.claim_name,
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      renderCell: params => {
        return renderCell(params);
      },
      type: 'singleSelect',
      valueOptions: toArray(ClaimStatus),
    });
  });

  const newRows: GridValidRowModel[] = [];

  suppliers.forEach((supplier, index) => {
    const row = {
      id: supplier.id,
      name: supplier.name,
      country: supplier.country,
    };

    columns.forEach(column => {
      if (column.field !== 'name' && column.field !== 'country') {
        row[column.field] = ClaimStatus.Inactive;
      }
    });

    uniqClaims.forEach(claim => {
      const certificateClaims = supplier.organization_claims
        .filter(certificateClaim => certificateClaim.claim?.name === claim.claim_name)
        .filter(
          // filter out the null expiration dates
          certificateClaim => certificateClaim.organization_file.effective_end_date !== null,
        )
        .sort((a, b) => {
          // check if the expiration date is null
          if (a.organization_file.effective_end_date === null || b.organization_file.effective_end_date === null) {
            return 1;
          } else {
            // sort by descending order
            return new Date(b.organization_file.effective_end_date).getTime() - new Date(a.organization_file.effective_end_date).getTime();
          }
        });
      const expirationDate: string | undefined | null = certificateClaims[0]?.organization_file.effective_end_date;
      // if the expiration date is null, set the value to InActive
      if (expirationDate === null || expirationDate === undefined) {
        row[claim.claim_name] = ClaimStatus.Inactive;
      } else {
        // get the difference between the current date and the date in the cell
        const diff = differenceInDays(new Date(expirationDate), new Date());
        if (diff < 0) {
          row[claim.claim_name] = ClaimStatus.Expired;
        } else if (diff < 60) {
          row[claim.claim_name] = ClaimStatus.ExpiringSoon;
        } else {
          row[claim.claim_name] = ClaimStatus.Active;
        }
      }
    });

    newRows.push(row);
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
      autoHeight={true}
      slots={{
        noRowsOverlay: MUIDataGridNoRowsOverlay,
      }}
      onRowClick={params => {
        navigate(`/suppliers/${params.row.id}`);
      }}
    />
  );
};
