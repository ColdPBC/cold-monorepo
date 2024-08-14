import React, { useEffect, useState } from 'react';
import { MaterialsWithCertifications } from '@coldpbc/interfaces';
import { useOrgSWR } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { isAxiosError } from 'axios';
import { ColdIcon, ErrorFallback, MUIDataGridNoRowsOverlay, Spinner } from '@coldpbc/components';
import { DataGrid, GridColDef, GridRenderCellParams, GridTreeNodeWithRender, GridValidRowModel } from '@mui/x-data-grid';
import { ClaimStatus, IconNames } from '@coldpbc/enums';
import { HexColors } from '@coldpbc/themes';
import { differenceInDays } from 'date-fns';
import { forEach, isEqual, toArray, uniq, uniqWith } from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';
import { listFilterOperators, listSortComparator } from '@coldpbc/lib';
import { useNavigate } from 'react-router-dom';

const _MaterialsDataGrid = () => {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState<MaterialsWithCertifications[]>([]);
  const materialsSWR = useOrgSWR<MaterialsWithCertifications[], any>([`/materials`, 'GET'], axiosFetcher);

  useEffect(() => {
    if (materialsSWR.data) {
      if (isAxiosError(materialsSWR.data)) {
        // handle no suppliers 404, set state to empty array
        if (isAxiosError(materialsSWR.data) && materialsSWR.data?.response?.status === 404) {
          setMaterials([]);
        }
      } else {
        setMaterials(materialsSWR.data.sort((a, b) => a.id.localeCompare(b.id)));
      }
    }
  }, [materialsSWR.data]);

  const uniqSuppliers = uniq(materials.map(material => material.material_suppliers.map(supplier => supplier.supplier.name)).flat());
  const uniqClaims = uniqWith(
    materials
      .map(material =>
        material.organization_claims.map(claim => {
          return {
            claim_name: claim.claim?.name,
            claim_id: claim.claim?.id,
          };
        }),
      )
      .flat(),
    isEqual,
  );

  if (materialsSWR.isLoading) {
    return <Spinner />;
  }

  const renderCell = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    // get the expiration date using the params.row.id
    const expirationDate: string | undefined | null = materials
      .find(material => material.id === params.row.id)
      ?.organization_claims.filter(certificateClaim => certificateClaim.organization_file.effective_end_date !== null)
      .find(certificateClaim => certificateClaim.claim?.name === params.field)?.organization_file.effective_end_date;
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

  const renderSupplierCell = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    // loop through the array of suppliers and return the suppliers
    return (
      <div className={'h-full flex items-center text-body text-tc-primary font-bold gap-[10px] truncate'}>
        {params.value.map((supplier: string, index: number) => {
          return (
            <div key={index} className={'rounded-[32px] border-[1px] border-primary px-[12px] w-auto whitespace-nowrap'}>
              <span className={'text-body'}>{supplier}</span>
            </div>
          );
        })}
      </div>
    );
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
      field: 'supplier',
      headerName: 'Supplier',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      minWidth: 300,
      type: 'singleSelect',
      valueOptions: uniqSuppliers,
      renderCell: renderSupplierCell,
      sortComparator: listSortComparator,
      filterOperators: listFilterOperators,
    },
  ];

  uniqClaims.forEach((claim, index) => {
    columns.push({
      field: claim.claim_name,
      headerName: claim.claim_name,
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      width: 170,
      renderCell: params => {
        return renderCell(params);
      },
      type: 'singleSelect',
      valueOptions: toArray(ClaimStatus),
    });
  });

  const newRows: GridValidRowModel[] = [];

  forEach(materials, material => {
    const row = {
      id: material.id,
      name: material.name,
      supplier: material.material_suppliers.map(supplier => supplier.supplier.name),
    };

    columns.forEach(column => {
      if (column.field !== 'name' && column.field !== 'supplier') {
        row[column.field] = ClaimStatus.Inactive;
      }
    });

    uniqClaims.forEach(claim => {
      const certificateClaims = material.organization_claims
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
        navigate(`/materials/${params.id}`);
      }}
    />
  );
};

export const MaterialsDataGrid = withErrorBoundary(_MaterialsDataGrid, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
