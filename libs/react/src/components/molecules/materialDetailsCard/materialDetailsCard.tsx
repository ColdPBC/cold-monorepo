import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { MaterialGraphQL } from '@coldpbc/interfaces';
import { Card, DetailsItem } from '@coldpbc/components';

interface MaterialDetailsCardProps {
	material: MaterialGraphQL;
}

const _MaterialDetailsCard: React.FC<MaterialDetailsCardProps> = ({ material }) => (
	<Card title={'Details'} className={'w-[406px] min-w-[406px] h-fit'} data-testid={'material-details-card'}>
		<DetailsItem category={'Name'} value={material.name} />
		<DetailsItem category={'Tier 2 Supplier Name'} value={material.materialSuppliers[0]?.organizationFacility.name} />
		<DetailsItem category={'Tier 2 Supplier Country'} value={material.materialSuppliers[0]?.organizationFacility.country} />
		<DetailsItem category={'Category'} value={material.materialCategory} />
		<DetailsItem category={'Sub-Category'} value={material.materialSubcategory} />
	</Card>
);

export const MaterialDetailsCard = withErrorBoundary(_MaterialDetailsCard, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in MaterialDetailsCard: ', error);
	},
});
