import React from 'react';
import {
  EditSustainabilityAttributesForEntity,
  ErrorFallback,
  ErrorPage,
  MainContent,
  MaterialDetailsCard,
  MaterialSustainabilityAttributesCard,
  Spinner,
} from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';
import { useColdContext, useGraphQLSWR } from '@coldpbc/hooks';
import { useParams } from 'react-router-dom';
import { MaterialGraphQL } from '@coldpbc/interfaces';
import { get, isError } from 'lodash';
import { EntityLevel } from '@coldpbc/enums';
import { EditMaterialClassification } from '../../molecules/editMaterialClassification/editMaterialClassification';

const _MaterialDetail: React.FC = () => {
	const { id: materialId } = useParams();
	const { logBrowser } = useColdContext();
  const [showUpdateAttributesModal, setShowUpdateAttributesModal] = React.useState<boolean>(false);
  const [showEditClassificationModal, setShowEditClassificationModal] = React.useState<boolean>(false);
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
      <MainContent title={material.name} subTitle={subTitle} breadcrumbs={[{ label: 'Material', href: '/materials' }, { label: material.name }]} className={'w-[calc(100%)]'}>
        {material && (
          <>
            <EditMaterialClassification
              material={material}
              isOpen={showEditClassificationModal}
              onClose={() => setShowEditClassificationModal(false)}
              refreshMaterial={materialQuery.mutate}
            />
            <EditSustainabilityAttributesForEntity
              key={material.id}
              isOpen={showUpdateAttributesModal}
              onClose={() => setShowUpdateAttributesModal(false)}
              entityLevel={EntityLevel.MATERIAL}
              entity={material}
            />
          </>
        )}
        <div className="w-full h-full flex gap-6 items-start mt-4 mb-20">
          <MaterialDetailsCard material={material} openEditClassificationModal={() => setShowEditClassificationModal(true)} />
          <MaterialSustainabilityAttributesCard material={material} setShowUpdateAttributesModal={setShowUpdateAttributesModal} />
        </div>
      </MainContent>
    </div>
	);
};

export const MaterialDetail = withErrorBoundary(_MaterialDetail, {
	FallbackComponent: props => <ErrorFallback {...props} />,
});
