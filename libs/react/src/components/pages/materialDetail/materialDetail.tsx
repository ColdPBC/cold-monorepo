import { useAddToastMessage, useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { Certifications, MaterialsWithCertifications, SuppliersWithCertifications, ToastMessage } from '@coldpbc/interfaces';
import { axiosFetcher } from '@coldpbc/fetchers';
import React, { ReactNode, useEffect, useState } from 'react';
import { ButtonTypes, CertificationStatus } from '@coldpbc/enums';
import capitalize from 'lodash/capitalize';
import { getDateActiveStatus } from '@coldpbc/lib';
import { isAxiosError } from 'axios';
import { BaseButton, Input, MainContent, Modal, Spinner, SupplierClaimsTable, SupplierDetailSidebar } from '@coldpbc/components';
import opacity from 'hex-color-opacity';
import { HexColors } from '@coldpbc/themes';

export const MaterialDetail = () => {
  const { addToastMessage } = useAddToastMessage();
  const navigate = useNavigate();
  const { logBrowser } = useColdContext();
  const { id } = useParams();
  const { orgId } = useAuth0Wrapper();
  const materialSWR = useOrgSWR<MaterialsWithCertifications, any>([`/suppliers/${id}`, 'GET'], axiosFetcher);
  const ref = React.useRef<HTMLDivElement>(null);
  const tableRef = React.useRef<HTMLDivElement>(null);
  const [material, setMaterial] = useState<MaterialsWithCertifications | undefined>(undefined);
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
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteButtonLoading, setDeleteButtonLoading] = useState(false);

  useEffect(() => {
    if (materialSWR.data) {
      setMaterial({
        ...materialSWR.data,
        name: materialSWR.data.name || '',
      });
    }
  }, [materialSWR.data]);

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     // close the sidebar if the click is outside the sidebar but not on the table
  //     if (ref.current && !ref.current.contains(event.target) && tableRef.current && !tableRef.current.contains(event.target) && selectedClaim !== null) {
  //       setSelectedClaim(null);
  //     }
  //   }
  //
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [ref, tableRef, selectedClaim]);

  useEffect(() => {
    // check if the supplier has been modified
    if (materialSWR.data && material) {
      if (materialSWR.data.name === material.name) {
        setSaveButtonDisabled(true);
      } else {
        setSaveButtonDisabled(false);
      }
    }
  }, [material]);

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
            status: CertificationStatus.Inactive,
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

  const saveSupplier = async () => {
    if (material === undefined) return;

    setSaveButtonLoading(true);

    const response = await axiosFetcher([
      `/organizations/${orgId}/materials/${id}`,
      'PATCH',
      {
        name: material.name,
      },
    ]);

    if (isAxiosError(response)) {
      logBrowser('SupplierDetail update error', 'error', { response });
      await addToastMessage({ message: 'Error saving supplier', type: ToastMessage.FAILURE, timeout: 2000 });
    } else {
      await materialSWR.mutate();
      logBrowser('SupplierDetail update saved', 'info', { response });
      await addToastMessage({ message: 'Supplier saved successfully', type: ToastMessage.SUCCESS, timeout: 2000 });
    }

    setSaveButtonLoading(false);
  };

  const deleteSupplier = async () => {
    if (material === undefined) return;

    const response = await axiosFetcher([`/organizations/${orgId}/material/${id}`, 'DELETE']);

    if (isAxiosError(response)) {
      logBrowser('SupplierDetail delete error', 'error', { response });
      await addToastMessage({ message: 'Error deleting supplier', type: ToastMessage.FAILURE, timeout: 2000 });
    } else {
      await addToastMessage({ message: 'Supplier deleted successfully', type: ToastMessage.SUCCESS, timeout: 2000 });
      navigate('/suppliers');
    }
  };

  const getPageButtons = () => {
    const buttons: ReactNode[] = [];
    buttons.push(
      <BaseButton
        label={'Delete'}
        onClick={() => {
          setDeleteModalOpen(true);
        }}
        variant={ButtonTypes.warning}
      />,
    );
    buttons.push(<BaseButton label={'Save'} onClick={saveSupplier} disabled={saveButtonDisabled || saveButtonLoading} loading={saveButtonLoading} />);
    return <div className={'flex flex-row gap-[16px] h-[40px]'}>{buttons}</div>;
  };

  if (materialSWR.isLoading) {
    return <Spinner />;
  }

  if (isAxiosError(materialSWR.data)) {
    return null;
  }

  if (!material) return null;

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
            navigate('/materials');
          }}>
          Suppliers{' '}
        </div>
        <span className={'w-[24px] h-[24px] flex items-center justify-center'}>{'>'}</span>
        <span>{materialSWR.data?.name}</span>
      </div>
      <MainContent className={'flex flex-col gap-[40px] px-[64px]'} title={materialSWR.data?.name} headerElement={getPageButtons()}>
        <div className={'w-full mb-[40px] flex flex-col gap-[12px]'}>
          <Input
            input_label={'Name'}
            input_props={{
              name: 'name',
              value: material.name,
              onChange: e => setMaterial({ ...material, name: e.target.value }),
              onValueChange: e => setMaterial({ ...material, name: e.value }),
              className: 'py-2 rounded-[8px]',
            }}
            input_label_props={{ className: 'w-[77px] flex items-center' }}
            container_classname={'gap-[10px] flex flex-row w-full justify-between'}
          />
        </div>
      </MainContent>
      <SupplierDetailSidebar selectedClaim={selectedClaim} closeSidebar={() => setSelectedClaim(null)} innerRef={ref} />
      <Modal
        show={deleteModalOpen}
        setShowModal={setDeleteModalOpen}
        header={{
          title: `Are you sure you want to delete ${material.name}?`,
          cardProps: {
            glow: false,
          },
        }}
        body={<div>This cannot be undone.</div>}
        footer={{
          rejectButton: {
            label: 'Cancel',
            onClick: () => setDeleteModalOpen(false),
            variant: ButtonTypes.secondary,
          },
          resolveButton: {
            label: 'Yes, Delete',
            onClick: async () => {
              setDeleteButtonLoading(true);
              await deleteSupplier();
              setDeleteButtonLoading(false);
            },
            disabled: deleteButtonLoading,
            loading: deleteButtonLoading,
            variant: ButtonTypes.warning,
          },
        }}
      />
    </div>
  );
};
