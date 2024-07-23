import { DataGrid, GridColDef, GridRenderCellParams, GridTreeNodeWithRender, GridValidRowModel } from '@mui/x-data-grid';
import { HexColors } from '@coldpbc/themes';
import { differenceInDays } from 'date-fns';
import { IconNames } from '@coldpbc/enums';
import { ColdIcon, Spinner } from '@coldpbc/components';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { useEffect, useState } from 'react';
import { Certifications, Suppliers } from '@coldpbc/interfaces';
import { isAxiosError } from 'axios';
import { useAuth0Wrapper } from '@coldpbc/hooks';

export const SuppliersDataGrid = () => {
  const [certifications, setCertifications] = useState<Certifications[]>([]);
  const [suppliers, setSuppliers] = useState<Suppliers[]>([]);
  const { orgId } = useAuth0Wrapper();
  const certificateSWR = useSWR<Certifications[], any, any>(['/certifications', 'GET'], axiosFetcher);
  const suppliersSWR = useSWR<Suppliers[], any, any>([`/organizations/${orgId}/suppliers`, 'GET'], axiosFetcher);

  useEffect(() => {
    if (certificateSWR.data && !isAxiosError(certificateSWR.data)) {
      setCertifications(
        certificateSWR.data.filter((certification: Certifications) => {
          return certification.level === 'Supplier';
        }),
      );
    }
  }, [certificateSWR.data]);

  useEffect(() => {
    if (suppliersSWR.data && !isAxiosError(suppliersSWR.data)) {
      setSuppliers(suppliersSWR.data);
    }
  }, [suppliersSWR.data]);

  if (certificateSWR.isLoading) {
    return <Spinner />;
  }

  const certificationStatuses = ['InActive', 'Active', 'Expired', 'Expiring Soon'];

  const renderCell = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    // if the value is null return null
    const expirationDate: string | undefined = suppliers
      .find(supplier => supplier.id === params.row.id)
      ?.certificate_claims.find(certificateClaim => certificateClaim.certification?.name === params.field)?.expiration_date;
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

  certifications.forEach((claim, index) => {
    columns.push({
      field: claim.name,
      headerName: claim.name,
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

  suppliers.forEach((supplier, index) => {
    const row = {
      id: supplier.id,
      name: supplier.name,
      country: supplier.country,
    };

    columns.forEach(column => {
      if (column.field !== 'name' && column.field !== 'country') {
        row[column.field] = 'InActive';
      }
    });

    certifications.forEach(claim => {
      const certificateClaims = supplier.certificate_claims
        .filter(certificateClaim => certificateClaim.certification?.name === claim.name)
        .filter(
          // filter out the null expiration dates
          certificateClaim => certificateClaim.expiration_date !== null,
        )
        .sort((a, b) => new Date(a.expiration_date).getTime() - new Date(b.expiration_date).getTime());
      const expirationDate: string | undefined | null = certificateClaims[0]?.expiration_date;
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
  );
};
