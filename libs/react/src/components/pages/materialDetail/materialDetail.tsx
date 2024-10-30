import React from 'react';
import {
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

const _MaterialDetail: React.FC = () => {
	const { id: materialId } = useParams();
	const { logBrowser } = useColdContext();
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

	const subTitle = [material.materialCategory, material.materialSubcategory].filter(val => !!val).join(' | ');

	return (
		<MainContent title={material.name} subTitle={subTitle} breadcrumbs={[{ label: 'Material', href: '/materials' }, { label: material.name }]} className={'w-[calc(100%)]'}>
			<div className="w-full h-full flex gap-6 items-start mt-4 mb-20">
				<MaterialDetailsCard material={material} />
        <MaterialSustainabilityAttributesCard material={material} />
			</div>
		</MainContent>
	);
};

export const MaterialDetail = withErrorBoundary(_MaterialDetail, {
	FallbackComponent: props => <ErrorFallback {...props} />,
});
