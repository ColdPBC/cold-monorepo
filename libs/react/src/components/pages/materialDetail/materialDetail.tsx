import { useAddToastMessage, useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { MaterialsWithCertifications, ToastMessage } from '@coldpbc/interfaces';
import { axiosFetcher } from '@coldpbc/fetchers';
import React, { ReactNode, useEffect, useState } from 'react';
import { ButtonTypes, ClaimStatus, IconNames } from '@coldpbc/enums';
import capitalize from 'lodash/capitalize';
import { getDateActiveStatus } from '@coldpbc/lib';
import { isAxiosError } from 'axios';
import { BaseButton, ErrorFallback, Input, MainContent, MaterialDetailClaimsTable, MaterialDetailSidebar, Modal, MuiDataGrid, Spinner } from '@coldpbc/components';
import opacity from 'hex-color-opacity';
import { HexColors } from '@coldpbc/themes';
import { withErrorBoundary } from 'react-error-boundary';
import { isEqual } from 'lodash';
import { MaterialDetailAddSupplier } from '../../organisms/materialDetailAddSupplier/materialDetailAddSupplier';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';

const _MaterialDetail = () => {
  const { addToastMessage } = useAddToastMessage();
  const navigate = useNavigate();
  const { logBrowser } = useColdContext();
  const { id } = useParams();
  const { orgId } = useAuth0Wrapper();
  const materialSWR = useOrgSWR<MaterialsWithCertifications, any>([`/materials/${id}`, 'GET'], axiosFetcher);
  const [material, setMaterial] = useState<MaterialsWithCertifications | undefined>(undefined);
  const [selectedClaim, setSelectedClaim] = useState<{
    name: string;
    level: string;
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
  const [addSupplierModalOpen, setAddSupplierModalOpen] = useState(false);

  useEffect(() => {
    if (materialSWR.data) {
      setMaterial({
        ...materialSWR.data,
        name: materialSWR.data.name || '',
      });
    }
  }, [materialSWR.data]);

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

  const handleRowClick = (claimObject: { name: string; level: string }) => {
    // get the claim data
    if (
      (selectedClaim &&
        isEqual(
          {
            name: claimObject.name,
            level: claimObject.level,
          },
          {
            name: selectedClaim.name,
            level: selectedClaim.level,
          },
        )) ||
      material === undefined
    ) {
      setSelectedClaim(null);
    } else {
      const claims = material?.organization_claims
        .filter(orgClaim => {
          return orgClaim.claim !== undefined && orgClaim.claim.name === claimObject.name && orgClaim.claim.level === claimObject.level;
        })
        .sort((a, b) => {
          if (a.organization_file.effective_start_date && b.organization_file.effective_start_date) {
            return new Date(b.organization_file.effective_start_date).getTime() - new Date(a.organization_file.effective_start_date).getTime();
          } else {
            return 0;
          }
        });

      const documentsWithNoDates = claims
        .filter(claim => {
          return claim.organization_file.effective_end_date === null;
        })
        .map(claim => {
          return {
            name: claim.organization_file.original_name,
            expirationDate: null,
            status: ClaimStatus.Inactive,
            type: capitalize(claim.organization_file.type),
          };
        });

      setSelectedClaim({
        name: claimObject.name,
        label: claimObject.name,
        level: claimObject.level,
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

  const saveMaterial = async () => {
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
      logBrowser('Material update error', 'error', { response });
      await addToastMessage({ message: 'Error saving material', type: ToastMessage.FAILURE, timeout: 2000 });
    } else {
      logBrowser('Material update saved', 'info', { response });
      await addToastMessage({ message: 'Material saved successfully', type: ToastMessage.SUCCESS, timeout: 2000 });
    }

    await materialSWR.mutate();
    setSaveButtonLoading(false);
  };

  const deleteMaterial = async () => {
    if (material === undefined) return;

    const response = await axiosFetcher([`/organizations/${orgId}/materials/${id}`, 'DELETE']);

    if (isAxiosError(response)) {
      logBrowser('MaterialDetail delete error', 'error', { response });
      await addToastMessage({ message: 'Error deleting material', type: ToastMessage.FAILURE, timeout: 2000 });
      setDeleteModalOpen(false);
    } else {
      await addToastMessage({ message: 'Material deleted successfully', type: ToastMessage.SUCCESS, timeout: 2000 });
      navigate('/materials');
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
        disabled={deleteButtonLoading}
        loading={deleteButtonLoading}
        key={'delete'}
      />,
    );
    buttons.push(<BaseButton label={'Save'} onClick={saveMaterial} disabled={saveButtonDisabled || saveButtonLoading} loading={saveButtonLoading} key={'save'} />);
    return <div className={'flex flex-row gap-[16px] h-[40px]'}>{buttons}</div>;
  };

  if (materialSWR.isLoading) {
    return <Spinner />;
  }

  if (isAxiosError(materialSWR.data)) {
    return null;
  }

  if (!material) return null;

  const supplierRows = material.material_suppliers
    .sort((a, b) => {
      return a.supplier.id.localeCompare(b.supplier.id);
    })
    .map(materialSupplier => {
      return {
        id: materialSupplier.supplier.id,
        name: materialSupplier.supplier.name,
        country: materialSupplier.supplier.country,
      };
    });

  const supplierColumns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      headerClassName: 'bg-gray-30 text-body',
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 1,
      headerClassName: 'bg-gray-30 text-body',
    },
    {
      field: 'actions',
      type: 'actions',
      width: 60,
      headerClassName: 'bg-gray-30 text-body',
      getActions: params => [
        <GridActionsCellItem
          label="View Details"
          onClick={() => {
            navigate(`/suppliers/${params.row.id}`);
          }}
          showInMenu
        />,
      ],
    },
  ];
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
          Materials{' '}
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
            container_classname={'gap-[10px] flex flex-row w-1/2 justify-between'}
          />
        </div>
        <div className={'w-full flex mb-[40px] flex-col gap-[24px]'}>
          <div className={'w-full flex flex-row justify-between'}>
            <div className={'text-h3'}>Associated Suppliers</div>
            <BaseButton label={'Add'} variant={ButtonTypes.secondary} iconLeft={IconNames.PlusIcon} onClick={() => setAddSupplierModalOpen(true)} />
          </div>
          <MuiDataGrid
            rows={supplierRows}
            columns={supplierColumns}
            sx={{
              '--DataGrid-overlayHeight': '50px',
            }}
          />
        </div>
        <div className={'w-full flex mb-[40px] flex-col gap-[24px]'}>
          <div className={'text-h3'}>Compliance Documents</div>
          <MaterialDetailClaimsTable material={material} selectClaim={handleRowClick} />
        </div>
      </MainContent>
      <MaterialDetailSidebar selectedClaim={selectedClaim} closeSidebar={() => setSelectedClaim(null)} />
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
              await deleteMaterial();
              setDeleteButtonLoading(false);
            },
            disabled: deleteButtonLoading,
            loading: deleteButtonLoading,
            variant: ButtonTypes.warning,
          },
        }}
      />
      <MaterialDetailAddSupplier
        showAddSupplierModal={addSupplierModalOpen}
        setShowAddSupplierModal={setAddSupplierModalOpen}
        material={material}
        refreshMaterials={() => {
          materialSWR.mutate();
        }}
      />
    </div>
  );
};

export const MaterialDetail = withErrorBoundary(_MaterialDetail, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
