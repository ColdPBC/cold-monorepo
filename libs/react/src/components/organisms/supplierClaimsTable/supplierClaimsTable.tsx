import { BaseButton, ColdIcon, MUIDataGridNoRowsOverlay } from '@coldpbc/components';
import { ButtonTypes, CertificationStatus, IconNames } from '@coldpbc/enums';
import { DataGrid, GridColDef, GridRenderCellParams, GridTreeNodeWithRender, GridValidRowModel } from '@mui/x-data-grid';
import { HexColors } from '@coldpbc/themes';
import { forEach, orderBy, toArray, uniq } from 'lodash';
import { differenceInDays } from 'date-fns';
import { getDateActiveStatus } from '@coldpbc/lib';
import React, { ReactNode } from 'react';
import { Suppliers, SuppliersWithCertifications } from '@coldpbc/interfaces';

export const SupplierClaimsTable = (props: {
  supplier: SuppliersWithCertifications;
  showSupplierCertificateDetails: (id: string) => void;
  innerRef: React.RefObject<HTMLDivElement>;
}) => {
  const { supplier, showSupplierCertificateDetails, innerRef } = props;

  const orderedCertificateClaims = orderBy(supplier.certification_claims, ['certification.name', 'organization_file.effective_end_date'], ['desc', 'desc']);
  // get list of unique claim names from the supplier. filter out undefined values
  const uniqueClaimNames = uniq(orderedCertificateClaims.map(claim => claim.certification?.name));

  const renderStatus = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    // if the value is null return null
    const expirationDate: string | null = params.row.expiration_date;
    let diff = 0;
    let statusElement: ReactNode | null = null;
    switch (params.value) {
      case CertificationStatus.Expired:
        statusElement = (
          <div className={'text-body h-full flex flex-row justify-start items-center gap-[0px]'}>
            <ColdIcon name={IconNames.ColdDangerIcon} color={HexColors.red['100']} />
            <span className={'text-red-100'}>Expired</span>
          </div>
        );
        break;
      case CertificationStatus.ExpiringSoon:
        if (expirationDate) {
          diff = differenceInDays(new Date(expirationDate), new Date());
        }
        statusElement = (
          <div className={'text-body h-full flex flex-row justify-start items-center gap-[4px] pl-[4px]'}>
            <ColdIcon name={IconNames.ColdExpiringIcon} color={HexColors.yellow['200']} />
            <span className={'text-yellow-200'}>{diff} days</span>
          </div>
        );
        break;
      case CertificationStatus.Active:
        statusElement = (
          <div className={'text-body h-full flex flex-row justify-start items-center gap-[0px]'}>
            <ColdIcon name={IconNames.ColdCheckIcon} color={HexColors.green['200']} />
            <span className={'text-green-200'}>Active</span>
          </div>
        );
        break;
      default:
      case CertificationStatus.Inactive:
        statusElement = (
          <div className={'h-full flex flex-row justify-start items-center'}>
            <div className={'w-[24px] h-[24px] flex flex-row justify-center items-center'}>
              <div className={'w-[13px] h-[13px] bg-gray-70 rounded-full'}></div>
            </div>
          </div>
        );
    }

    return <div className={'h-full w-full flex flex-row items-center justify-between'}>{statusElement}</div>;
  };

  const renderNumber = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    return <div className={'w-full h-full flex flex-row justify-start items-center'}>{params.value}</div>;
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      renderCell: params => {
        return <div className={'h-full flex items-center text-body text-tc-primary font-bold text-ellipsis'}>{params.value}</div>;
      },
    },
    {
      field: 'documents',
      headerName: 'Documents',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      minWidth: 100,
      maxWidth: 100,
      type: 'number',
      renderCell: renderNumber,
    },
    {
      field: 'status',
      headerName: 'Status',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      minWidth: 100,
      maxWidth: 100,
      flex: 1,
      type: 'singleSelect',
      valueOptions: toArray(CertificationStatus),
      renderCell: renderStatus,
    },
  ];

  const newRows: GridValidRowModel[] = [];

  forEach(uniqueClaimNames, (value, index) => {
    const claimCertifications = orderedCertificateClaims.filter(claim => claim.certification?.name === value);
    if (claimCertifications.length > 0) {
      // get the first claim certification without effective end date being null
      const claimCertsWithEndDate = claimCertifications
        .filter(claim => claim.organization_file.effective_end_date !== null)
        .sort((a, b) => {
          if (a.organization_file.effective_end_date === null || b.organization_file.effective_end_date === null) {
            return 0;
          } else {
            return new Date(b.organization_file.effective_end_date).getTime() - new Date(a.organization_file.effective_end_date).getTime();
          }
        });
      newRows.push({
        id: value,
        name: value,
        documents: claimCertifications.length,
        status: getDateActiveStatus((claimCertsWithEndDate.length > 0 ? claimCertsWithEndDate : claimCertifications)[0].organization_file.effective_end_date),
        expiration_date: (claimCertsWithEndDate.length > 0 ? claimCertsWithEndDate : claimCertifications)[0].organization_file.effective_end_date,
      });
    }
  });

  const rows: GridValidRowModel[] = newRows;

  return (
    <div className={'w-full flex flex-col gap-[24px] text-tc-primary'}>
      <div className={'w-full flex flex-row justify-between'}>
        <div className={'text-h3'}>Compliance Documents</div>
      </div>
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
        onRowClick={params => {
          showSupplierCertificateDetails(params.row.id);
        }}
        autoHeight={true}
        slots={{
          noRowsOverlay: MUIDataGridNoRowsOverlay,
        }}
        ref={innerRef}
      />
    </div>
  );
};
