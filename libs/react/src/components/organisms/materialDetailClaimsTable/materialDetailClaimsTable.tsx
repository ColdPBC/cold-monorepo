import { MaterialsWithCertifications } from '@coldpbc/interfaces';
import { ColdIcon, ErrorFallback, MuiDataGrid } from '@coldpbc/components';
import React, { ReactNode } from 'react';
import { forEach, get, isEqual, orderBy, toArray, uniq, uniqWith } from 'lodash';
import { CertificationStatus, IconNames } from '@coldpbc/enums';
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender, GridValidRowModel } from '@mui/x-data-grid';
import { HexColors } from '@coldpbc/themes';
import { differenceInDays } from 'date-fns';
import { getDateActiveStatus } from '@coldpbc/lib';
import { withErrorBoundary } from 'react-error-boundary';

const _MaterialDetailClaimsTable = (props: { material: MaterialsWithCertifications; selectClaim: (object: { name: string; level: string }) => void }) => {
  const { material, selectClaim } = props;

  const getAssociatedRecords = (level: string, certificationClaims: MaterialsWithCertifications['certification_claims']): string[] => {
    // get the a list of unique supplier, product, and material names
    switch (level) {
      case 'Supplier':
        return uniq(certificationClaims.map(claim => get(claim, 'facility.name', ''))).filter((name: string) => {
          return name !== '';
        });
      case 'Product':
        return uniq(certificationClaims.map(claim => get(claim, 'product.name', ''))).filter((name: string) => {
          return name !== '';
        });
      default:
        return uniq(certificationClaims.map(claim => get(claim, 'material.name', ''))).filter((name: string) => {
          return name !== '';
        });
    }
  };

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

  const renderAssociatedRecords = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    return (
      <div className={'h-full flex items-center text-body text-tc-disabled font-bold gap-[10px] text-ellipsis'}>
        {params.value.map((supplier: string, index: number) => {
          return (
            <div key={index} className={'rounded-[32px] border-[1px] border-tc-disabled px-[8px] py-[2px] w-auto whitespace-nowrap'}>
              <span className={'text-body'}>{supplier}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const claimsColumns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      headerClassName: 'bg-gray-30 text-body',
      renderCell: params => {
        return <div className={'h-full flex items-center text-body text-tc-primary font-bold text-ellipsis'}>{params.value}</div>;
      },
    },
    {
      field: 'level',
      headerName: 'Level',
      flex: 1,
      minWidth: 100,
      headerClassName: 'bg-gray-30 text-body',
      type: 'singleSelect',
      valueOptions: ['Material', 'Supplier', 'Product'],
    },
    {
      field: 'associated_records',
      headerName: 'Associated Records',
      flex: 1,
      headerClassName: 'bg-gray-30 text-body',
      renderCell: renderAssociatedRecords,
    },
    {
      field: 'documents',
      headerName: 'Documents',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      maxWidth: 100,
      type: 'number',
      renderCell: renderNumber,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 100,
      headerClassName: 'bg-gray-30 text-body',
      type: 'singleSelect',
      valueOptions: toArray(CertificationStatus),
      renderCell: renderStatus,
    },
  ];

  const orderedCertificateClaims = orderBy(material.certification_claims, ['certification.name', 'organization_file.effective_end_date'], ['desc', 'desc']);

  const uniqueClaims = uniqWith(
    orderedCertificateClaims.map(claim => ({
      name: claim.certification?.name,
      level: claim.certification?.level,
    })),
    isEqual,
  );

  const newRows: GridValidRowModel[] = [];

  forEach(uniqueClaims, (value, index) => {
    const claimCertifications = orderedCertificateClaims.filter(claim => {
      return claim.certification?.name === value.name && claim.certification?.level === value.level;
    });
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
        id: value.name,
        name: value.name,
        level: value.level,
        associated_records: getAssociatedRecords(value.level, claimCertifications),
        documents: claimCertifications.length,
        status: getDateActiveStatus((claimCertsWithEndDate.length > 0 ? claimCertsWithEndDate : claimCertifications)[0].organization_file.effective_end_date),
        expiration_date: (claimCertsWithEndDate.length > 0 ? claimCertsWithEndDate : claimCertifications)[0].organization_file.effective_end_date,
      });
    }
  });

  const claimRows: GridValidRowModel[] = newRows;

  return (
    <MuiDataGrid
      rows={claimRows}
      columns={claimsColumns}
      sx={{
        '--DataGrid-overlayHeight': '300px',
      }}
      onRowClick={params => {
        selectClaim({
          name: params.row.name,
          level: params.row.level,
        });
      }}
    />
  );
};

export const MaterialDetailClaimsTable = withErrorBoundary(_MaterialDetailClaimsTable, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
