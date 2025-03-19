import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { SupplierGraphQL } from '@coldpbc/interfaces';
import { Card, SustainabilityAttributeCard, SustainabilityAttributeCardStyle } from '@coldpbc/components';
import { filterAttributes, processEntityLevelAssurances } from '@coldpbc/lib';
import { ButtonTypes, EntityLevel } from '@coldpbc/enums';

interface SupplierSustainabilityAttributesCardProps {
	supplier: SupplierGraphQL;
  showUpdateAttributesModal: () => void;
}

const _SupplierSustainabilityAttributesCard: React.FC<SupplierSustainabilityAttributesCardProps> = ({ supplier, showUpdateAttributesModal }) => {
	// These filters reflect the current state of our data, but be unnecessary if we had better data validations
	const supplierSustainabilityAttributes = filterAttributes(processEntityLevelAssurances([supplier]), EntityLevel.SUPPLIER);
	const materialSustainabilityAttributes = filterAttributes(processEntityLevelAssurances(supplier.materials), EntityLevel.MATERIAL);

  const ctas = [
    {
      text: 'Edit Attributes',
      action: () => showUpdateAttributesModal(),
      variant: ButtonTypes.secondary,
    },
  ]

	return (
		<Card title={'Sustainability Attributes'} ctas={ctas} className={'w-full h-fit'} data-testid={'supplier-sustainability-attributes-card'}>
			{supplierSustainabilityAttributes.length + materialSustainabilityAttributes.length === 0 && (
        <span className="text-body text-tc-secondary">Add a new attribute manually or upload documents to track sustainability attributes on this supplier.</span>
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
