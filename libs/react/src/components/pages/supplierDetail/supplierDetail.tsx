import { useNavigate, useParams } from 'react-router-dom';
import { ErrorFallback, Input, Spinner, SupplierClaimsTable, SupplierDetailSidebar } from '@coldpbc/components';
import { CertificationStatus } from '@coldpbc/enums';
import React, { useEffect, useState } from 'react';
import opacity from 'hex-color-opacity';
import { HexColors } from '@coldpbc/themes';
import { getDateActiveStatus } from '@coldpbc/lib';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { useAuth0Wrapper } from '@coldpbc/hooks';
import { Certifications, Suppliers } from '@coldpbc/interfaces';
import { isAxiosError } from 'axios';
import capitalize from 'lodash/capitalize';
import { withErrorBoundary } from 'react-error-boundary';

export const _SupplierDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { orgId } = useAuth0Wrapper();
  const supplierSWR = useSWR<Suppliers, any, any>([`/organizations/${orgId}/suppliers/${id}`, 'GET'], axiosFetcher);
  const ref = React.useRef<HTMLDivElement>(null);
  const tableRef = React.useRef<HTMLDivElement>(null);
  const [supplier, setSupplier] = useState<Suppliers | undefined>(undefined);
  const [selectedClaim, setSelectedClaim] = useState<{
    name: string;
    label: string;
    activeDocuments: {
      name: string;
      expirationDate: string | null;
      status: string;
      type: string;
    }[];
    expiredDocuments: {
      name: string;
      expirationDate: string | null;
      status: string;
      type: string;
    }[];
  } | null>(null);

  useEffect(() => {
    if (supplierSWR.data) {
      setSupplier({
        ...supplierSWR.data,
        name: supplierSWR.data.name || '',
        address_line_1: supplierSWR.data.address_line_1 || '',
        address_line_2: supplierSWR.data.address_line_2 || '',
        city: supplierSWR.data.city || '',
        country: supplierSWR.data.country || '',
      });
    }
  }, [supplierSWR.data]);

  useEffect(() => {
    function handleClickOutside(event) {
      // close the sidebar if the click is outside the sidebar but not on the table
      if (ref.current && !ref.current.contains(event.target) && tableRef.current && !tableRef.current.contains(event.target) && selectedClaim !== null) {
        setSelectedClaim(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, tableRef, selectedClaim]);

  const handleRowClick = (claimName: string) => {
    // get the claim data
    if ((selectedClaim && selectedClaim.name === claimName) || supplier === undefined) {
      setSelectedClaim(null);
    } else {
      const claims: {
        id: string;
        certification: Certifications | undefined;
        organization_file: {
          original_name: string;
          effective_start_date: string | null;
          effective_end_date: string | null;
          type: string;
        };
      }[] = supplier?.certification_claims
        .filter(
          (claim: {
            id: string;
            certification: Certifications | undefined;
            organization_file: {
              original_name: string;
              effective_start_date: string | null;
              effective_end_date: string | null;
              type: string;
            };
          }) => {
            return claim.certification !== undefined && claim.certification.name === claimName;
          },
        )
        .sort((a, b) => {
          if (a.organization_file.effective_start_date && b.organization_file.effective_start_date) {
            return new Date(b.organization_file.effective_start_date).getTime() - new Date(a.organization_file.effective_start_date).getTime();
          } else {
            return 0;
          }
        });

      const documentsWithNoDates = claims
        .filter(
          (claim: {
            id: string;
            certification: Certifications | undefined;
            organization_file: {
              original_name: string;
              effective_start_date: string | null;
              effective_end_date: string | null;
              type: string;
            };
          }) => {
            return claim.organization_file.effective_end_date === null;
          },
        )
        .map(claim => {
          return {
            name: claim.organization_file.original_name,
            expirationDate: null,
            status: CertificationStatus.InActive,
            type: capitalize(claim.organization_file.type),
          };
        });

      setSelectedClaim({
        name: claimName,
        label: claimName,
        activeDocuments: claims
          .filter(claim => claim.organization_file.effective_end_date !== null)
          .filter(claim => getDateActiveStatus(claim.organization_file.effective_end_date) !== 'Expired')
          .map(claim => ({
            name: claim.organization_file.original_name,
            expirationDate: claim.organization_file.effective_end_date,
            status: getDateActiveStatus(claim.organization_file.effective_end_date),
            type: capitalize(claim.organization_file.type),
          }))
          .sort((a, b) => {
            if (a.expirationDate && b.expirationDate) {
              return new Date(b.expirationDate).getTime() - new Date(a.expirationDate).getTime();
            } else {
              return 0;
            }
          }),
        expiredDocuments: claims
          .filter(claim => claim.organization_file.effective_end_date !== null)
          .filter(claim => getDateActiveStatus(claim.organization_file.effective_end_date) === 'Expired')
          .map(claim => ({
            name: claim.organization_file.original_name,
            expirationDate: claim.organization_file.effective_end_date,
            status: getDateActiveStatus(claim.organization_file.effective_end_date),
            type: capitalize(claim.organization_file.type),
          }))
          .sort((a, b) => {
            if (a.expirationDate && b.expirationDate) {
              return new Date(b.expirationDate).getTime() - new Date(a.expirationDate).getTime();
            } else {
              return 0;
            }
          })
          .concat(...documentsWithNoDates),
      });
    }
  };

  if (supplierSWR.isLoading) {
    return <Spinner />;
  }

  if (isAxiosError(supplierSWR.data)) {
    return null;
  }

  if (!supplier) return null;

  return (
    <div className={'w-full h-full flex flex-col items-center gap-[24px] text-tc-primary relative'}>
      <div
        className={'w-full px-[16px] flex flex-row py-[8px]'}
        style={{
          backgroundColor: opacity(HexColors.gray['30'], 0.5),
        }}>
        <div
          className={'cursor-pointer hover:underline'}
          onClick={() => {
            navigate('/suppliers');
          }}>
          Suppliers{' '}
        </div>
        <span className={'w-[24px] h-[24px] flex items-center justify-center'}>{'>'}</span>
        <span>{supplier.name}</span>
      </div>
      <div className={'w-[1199px] flex flex-col gap-[40px] px-[64px]'}>
        <div className={'w-full flex flex-row justify-between items-center'}>
          <div className={'text-h2 w-full'}>{supplier.name}</div>
        </div>
        <div className={'w-full mb-[40px] flex flex-col gap-[12px]'}>
          <Input
            input_label={'Name'}
            input_props={{
              name: 'name',
              value: supplier.name,
              onChange: e => setSupplier({ ...supplier, name: e.target.value }),
              onValueChange: e => setSupplier({ ...supplier, name: e.value }),
              className: 'py-2 rounded-[8px] text-tc-disabled',
              disabled: true,
            }}
            input_label_props={{ className: 'w-[77px] flex items-center' }}
            container_classname={'gap-[10px] flex flex-row w-full justify-between'}
          />
          <Input
            input_label={'Address 1'}
            input_props={{
              name: 'address_1',
              value: supplier.address_line_1 || '',
              onChange: e => setSupplier({ ...supplier, address_line_1: e.target.value }),
              onValueChange: e => setSupplier({ ...supplier, address_line_1: e.value }),
              className: 'py-2 rounded-[8px] text-tc-disabled',
              disabled: true,
            }}
            input_label_props={{ className: 'w-[77px] flex items-center' }}
            container_classname={'gap-[10px] flex flex-row w-full justify-between'}
          />
          <Input
            input_label={'Address 2'}
            input_props={{
              name: 'address_2',
              value: supplier.address_line_2,
              onChange: e => setSupplier({ ...supplier, address_line_2: e.target.value }),
              onValueChange: e => setSupplier({ ...supplier, address_line_2: e.value }),
              className: 'py-2 rounded-[8px] text-tc-disabled',
              disabled: true,
            }}
            input_label_props={{ className: 'w-[77px] flex items-center' }}
            container_classname={'gap-[10px] flex flex-row w-full justify-between'}
          />
          <Input
            input_label={'City'}
            input_props={{
              name: 'city',
              value: supplier.city,
              onChange: e => setSupplier({ ...supplier, city: e.target.value }),
              onValueChange: e => setSupplier({ ...supplier, city: e.value }),
              className: 'py-2 rounded-[8px] text-tc-disabled',
              disabled: true,
            }}
            input_label_props={{ className: 'w-[77px] flex items-center' }}
            container_classname={'gap-[10px] flex flex-row w-full justify-between'}
          />
          <Input
            input_label={'Country'}
            input_props={{
              name: 'country',
              value: supplier.country,
              onChange: e => setSupplier({ ...supplier, country: e.target.value }),
              onValueChange: e => setSupplier({ ...supplier, country: e.value }),
              className: 'py-2 rounded-[8px] text-tc-disabled',
              disabled: true,
            }}
            input_label_props={{ className: 'w-[77px] flex items-center' }}
            container_classname={'gap-[10px] flex flex-row w-full justify-between'}
          />
        </div>
        <div>
          <SupplierClaimsTable
            supplier={supplier}
            showSupplierCertificateDetails={claim => {
              handleRowClick(claim);
            }}
            innerRef={tableRef}
          />
        </div>
      </div>
      <SupplierDetailSidebar selectedClaim={selectedClaim} closeSidebar={() => setSelectedClaim(null)} innerRef={ref} />
    </div>
  );
};

export const SupplierDetail = withErrorBoundary(_SupplierDetail, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in SupplierDetail: ', error);
  },
});
