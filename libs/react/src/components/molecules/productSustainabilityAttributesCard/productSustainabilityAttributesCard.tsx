import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { ProductsQuery } from '@coldpbc/interfaces';
import { Card, SustainabilityAttributeCard, SustainabilityAttributeCardStyle } from '@coldpbc/components';
import { filterAttributes, processEntityLevelAssurances } from '@coldpbc/lib';
import { ButtonTypes, EntityLevel } from '@coldpbc/enums';

interface ProductSustainabilityAttributesCardProps {
	product: ProductsQuery;
  setShowUpdateAttributesModal: (show: boolean) => void;
}

const _ProductSustainabilityAttributesCard: React.FC<ProductSustainabilityAttributesCardProps> = ({ product, setShowUpdateAttributesModal }) => {
  const materials = product.productMaterials.map(productMaterial => productMaterial.material);

  // These filters reflect the current state of our data, but be unnecessary if we had better data validations
  const productSustainabilityAttributes = filterAttributes(
    processEntityLevelAssurances([product]),
    EntityLevel.PRODUCT
  );

  const materialSustainabilityAttributes = filterAttributes(
    processEntityLevelAssurances(materials),
    EntityLevel.MATERIAL
  );

  const supplierSustainabilityAttributes = product.organizationFacility ?
    filterAttributes(
      processEntityLevelAssurances([product.organizationFacility]),
      EntityLevel.SUPPLIER
    ) : [];

  const ctas = [
    {
      text: 'Edit Attributes',
      action: () => setShowUpdateAttributesModal(true),
      variant: ButtonTypes.secondary,
    },
  ]

	return (
		<Card
      title={'Sustainability Attributes'}
      className={'w-full h-fit'}
      data-testid={'product-sustainability-attributes-card'}
      ctas={ctas}
    >
			{productSustainabilityAttributes.length + materialSustainabilityAttributes.length + supplierSustainabilityAttributes.length === 0 && (
				<span className="text-body text-tc-secondary">Add a new attribute manually or upload documents to track sustainability attributes on this product.</span>
			)}
			{productSustainabilityAttributes.length > 0 && (
				<div className="w-full h-fit flex flex-col gap-2 justify-start items-start">
					<span className="text-body font-bold text-white">Product-level</span>
					{productSustainabilityAttributes.map(sustainabilityAttribute => (
						<div className="w-full" key={sustainabilityAttribute.id}>
							<SustainabilityAttributeCard
                sustainabilityAttribute={sustainabilityAttribute}
                cardStyle={SustainabilityAttributeCardStyle.SINGLE_STATUS}
              />
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
              />
						</div>
					))}
				</div>
			)}
			{supplierSustainabilityAttributes.length > 0 && (
				<div className="w-full h-fit flex flex-col gap-2 justify-start items-start">
					<span className="text-body font-bold text-white">Supplier-level</span>
					{supplierSustainabilityAttributes.map(sustainabilityAttribute => (
						<div className="w-full" key={sustainabilityAttribute.id}>
              <SustainabilityAttributeCard
                sustainabilityAttribute={sustainabilityAttribute}
                cardStyle={SustainabilityAttributeCardStyle.ENTITY_DETAIL}
              />
						</div>
					))}
				</div>
			)}
		</Card>
	);
};

export const ProductSustainabilityAttributesCard = withErrorBoundary(_ProductSustainabilityAttributesCard, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, _info) => {
		console.error('Error occurred in ProductSustainabilityAttributesCard: ', error);
	},
});
