import React from 'react';
import {
  EllipsisMenu,
  EditSustainabilityAttributesForEntity,
  ErrorFallback,
  ErrorPage,
  MainContent,
  MaterialDetailsCard,
  MaterialSustainabilityAttributesCard,
  Spinner,
  EditMaterialDetails,
  DeleteEntityModal,
} from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';
import { useColdContext, useGraphQLSWR } from '@coldpbc/hooks';
import { useParams } from 'react-router-dom';
import { MaterialGraphQL } from '@coldpbc/interfaces';
import { get, isError } from 'lodash';
import { EntityLevel } from '@coldpbc/enums';

const _MaterialDetail: React.FC = () => {
	const { id: materialId } = useParams();
	const { logBrowser } = useColdContext();
  const [showUpdateAttributesModal, setShowUpdateAttributesModal] = React.useState<boolean>(false);
  const [editMaterial, setEditMaterial] = React.useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);
	const materialQuery = useGraphQLSWR<{
		material: MaterialGraphQL | null;
	}>('GET_MATERIAL', {
		id: materialId,
	});

	if (materialQuery.isLoading) {
		return <Spinner />;
	}

	if (isError(materialQuery.data)) {
		const materialError = get(materialQuery.data, 'error', null);
		if (materialError) {
			logBrowser('Error fetching Material', 'error', { materialError }, materialError);
		}

		return <ErrorPage error={'An error occurred'} showLogout={false} />;
	}

	const material = get(materialQuery.data, 'data.material');

	if (material === null || material === undefined) {
		return null;
	}

  const tier2SupplierName = material.materialSuppliers[0]?.organizationFacility.name
	const subTitle = [material.materialCategory, material.materialSubcategory, tier2SupplierName].filter(val => !!val).join(' | ');

  return (
    <div key={material.id}>
      <MainContent
        title={material.name}
        subTitle={subTitle}
        breadcrumbs={[{ label: 'Material', href: '/materials' }, { label: material.name }]}
        className={'w-[calc(100%)]'}
        headerElement={
          <EllipsisMenu
            data-testid={'material-details-menu'}
            items={[
              {
                label: 'Delete Material',
                onClick: () => {
                  setDeleteModalOpen(true);
                },
                color: 'warning',
              },
            ]} />
        }
      >
        {material && (
          <EditSustainabilityAttributesForEntity
            key={material.id}
            isOpen={showUpdateAttributesModal}
            onClose={() => setShowUpdateAttributesModal(false)}
            entityLevel={EntityLevel.MATERIAL}
            entity={material}
          />
        )}
        <div className="w-full h-full flex gap-6 items-start mt-4 mb-20">
          {editMaterial ? (
            <EditMaterialDetails
              material={material}
              onClose={() => setEditMaterial(false)}
              refreshMaterial={materialQuery.mutate}
            />
          ) : (
            <MaterialDetailsCard material={material} editMaterial={() => setEditMaterial(true)} />
          )}
          <MaterialSustainabilityAttributesCard material={material} setShowUpdateAttributesModal={setShowUpdateAttributesModal} />
        </div>
        {
          materialId && (
            <DeleteEntityModal
              isOpen={deleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
              entityId={materialId}
              entityLevel={EntityLevel.MATERIAL}
            />
          )
        }
      </MainContent>
    </div>
	);
};

export const MaterialDetail = withErrorBoundary(_MaterialDetail, {
	FallbackComponent: props => <ErrorFallback {...props} />,
});
