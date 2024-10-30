import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { SupplierGraphQL } from '@coldpbc/interfaces';
import { Card, SustainabilityAttributeCard, SustainabilityAttributeCardStyle } from '@coldpbc/components';
import { filterAttributes, processEntityLevelAssurances } from '@coldpbc/lib';
import { EntityLevel } from '@coldpbc/enums';

interface SupplierSustainabilityAttributesCardProps {
	supplier: SupplierGraphQL;
}

const _SupplierSustainabilityAttributesCard: React.FC<SupplierSustainabilityAttributesCardProps> = ({ supplier }) => {
	const materials = supplier.materialSuppliers.map(materialSupplier => materialSupplier.material);

	// These filters reflect the current state of our data, but be unnecessary if we had better data validations
	const supplierSustainabilityAttributes = filterAttributes(processEntityLevelAssurances([supplier]), EntityLevel.SUPPLIER);

	const materialSustainabilityAttributes = filterAttributes(processEntityLevelAssurances(materials), EntityLevel.MATERIAL);

	return (
		<Card title={'Sustainability Attributes'} className={'w-full h-fit'} data-testid={'supplier-sustainability-attributes-card'}>
			{supplierSustainabilityAttributes.length + materialSustainabilityAttributes.length === 0 && (
				// TODO: Update this copy once we can add a new attribute manually
				<span className="text-body text-cold-secondary">Upload documents to track sustainability attributes on this supplier.</span>
			)}
			{supplierSustainabilityAttributes.length > 0 && (
				<div className="w-full h-fit flex flex-col gap-2 justify-start items-start">
					<span className="text-body font-bold text-white">Supplier-level</span>
					{supplierSustainabilityAttributes.map(sustainabilityAttribute => (
						<div className="w-full" key={sustainabilityAttribute.id}>
							<SustainabilityAttributeCard sustainabilityAttribute={sustainabilityAttribute} cardStyle={SustainabilityAttributeCardStyle.SINGLE_STATUS} />
						</div>
					))}
				</div>
			)}
			{materialSustainabilityAttributes.length > 0 && (
				<div className="w-full h-fit flex flex-col gap-2 justify-start items-start">
					<span className="text-body font-bold text-white">Material-level</span>
					{materialSustainabilityAttributes.map(sustainabilityAttribute => (
						<div className="w-full" key={sustainabilityAttribute.id}>
							<SustainabilityAttributeCard
                sustainabilityAttribute={sustainabilityAttribute}
                cardStyle={SustainabilityAttributeCardStyle.ENTITY_DETAIL}
                displayedOnEntityLevel={EntityLevel.SUPPLIER}
              />
						</div>
					))}
				</div>
			)}
		</Card>
	);
};

export const SupplierSustainabilityAttributesCard = withErrorBoundary(_SupplierSustainabilityAttributesCard, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in SupplierSustainabilityAttributesCard: ', error);
	},
});
