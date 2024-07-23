import { BaseButton, ColdIcon } from '@coldpbc/components';
import { ButtonTypes, IconNames } from '@coldpbc/enums';
import { DataGrid, GridColDef, GridRenderCellParams, GridTreeNodeWithRender, GridValidRowModel } from '@mui/x-data-grid';
import { HexColors } from '@coldpbc/themes';
import { createTheme, ThemeProvider } from '@mui/material';
import { getClaimsMock, getSupplierMock } from '@coldpbc/mocks';
import { find, forOwn, get } from 'lodash';
import { differenceInDays } from 'date-fns';
import { isDefined } from 'class-validator';
import { getDateActiveStatus } from '@coldpbc/lib';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import { ReactNode } from 'react';

export const SupplierCertificates = (props: { id: string; showSupplierCertificateDetails: (id: string) => void }) => {
  const { showSupplierCertificateDetails } = props;

  const uploadDocument = () => {
    // TODO: Implement upload document
  };

  const certificationStatuses = ['InActive', 'Active', 'Expired', 'Expiring Soon'];

  const supplierData = getSupplierMock();

  const specificSupplier = supplierData.find(supplier => supplier.id === props.id);
  const supplierClaims = specificSupplier?.certificate_claims;

  const certificateClaims = getClaimsMock();

  if (!isDefined(supplierClaims)) {
    return null;
  }

  const renderStatus = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    // if the value is null return null
    const expirationDate: string | null = params.row.expiration_date;
    let diff = 0;
    let statusElement: ReactNode | null = null;
    switch (params.value) {
      case 'Expired':
        statusElement = (
          <div className={'text-body h-full flex flex-row justify-start items-center gap-[0px]'}>
            <ColdIcon name={IconNames.ColdDangerIcon} color={HexColors.red['100']} />
            <span className={'text-red-100'}>Expired</span>
          </div>
        );
        break;
      case 'Expiring Soon':
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
      case 'Active':
        statusElement = (
          <div className={'text-body h-full flex flex-row justify-start items-center gap-[0px]'}>
            <ColdIcon name={IconNames.ColdCheckIcon} color={HexColors.green['200']} />
            <span className={'text-green-200'}>Active</span>
          </div>
        );
        break;
      default:
      case 'InActive':
        statusElement = (
          <div className={'h-full flex flex-row justify-start items-center'}>
            <div className={'w-[24px] h-[24px] flex flex-row justify-center items-center'}>
              <div className={'w-[13px] h-[13px] bg-gray-70 rounded-full'}></div>
            </div>
          </div>
        );
    }

    return (
      <div className={'h-full w-full flex flex-row items-center justify-between'}>
        {statusElement}
        <div className={'w-[24px] h-[24px] flex flex-row justify-center items-center'}>
          <ChevronRightIcon color={'white'} />
        </div>
      </div>
    );
  };

  const renderDocumentType = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    return (
      <div className={'h-full w-full flex flex-row items-center justify-between'}>
        <div className={'px-[8px] py-[2px] border-[1px] border-primary rounded-[30px] text-body'}>{params.value}</div>
        <div className={'w-[24px] h-[24px] flex flex-row justify-center items-center'}>
          <ChevronRightIcon color={'white'} />
        </div>
      </div>
    );
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
      minWidth: 380,
      renderCell: params => {
        return <div className={'h-full flex items-center text-body text-tc-primary font-bold truncate'}>{params.value}</div>;
      },
    },
    {
      field: 'documents',
      headerName: 'Documents',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      minWidth: 95,
      maxWidth: 100,
      type: 'number',
      renderCell: renderNumber,
    },
    {
      field: 'status',
      headerName: 'Status',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      minWidth: 400,
      flex: 1,
      type: 'singleSelect',
      valueOptions: certificationStatuses,
      renderCell: renderStatus,
    },
  ];

  let newRows: GridValidRowModel[] = [];

  forOwn(supplierClaims, (value, key) => {
    if (isDefined(value.expiration_date)) {
      newRows.push({
        id: key,
        name: find(certificateClaims, claim => {
          return claim.name === key;
        })?.label,
        documents: value.documents ? value.documents.length : 0,
        status: getDateActiveStatus(value.expiration_date),
        expiration_date: value.expiration_date,
        document_type: value.type,
      });
    }
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
    <div className={'w-full flex flex-col gap-[24px] text-tc-primary'}>
      <div className={'w-full flex flex-row justify-between'}>
        <div className={'text-h3'}>Compliance Documents</div>
        <div className={'flex flex-row gap-[8px]'}>
          <BaseButton label={'Add'} iconLeft={IconNames.PlusIcon} variant={ButtonTypes.secondary} onClick={uploadDocument} />
        </div>
      </div>
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
          onRowClick={params => {
            showSupplierCertificateDetails(params.row.id);
          }}
        />
      </ThemeProvider>
    </div>
  );
};
