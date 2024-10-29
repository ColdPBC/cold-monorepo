import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { EntityWithAttributeAssurances, ProductsQuery, SustainabilityAttribute } from '@coldpbc/interfaces';
import { Card, SustainabilityAttributeCard, SustainabilityAttributeCardStyle } from '@coldpbc/components';
import { processEntityLevelAssurances } from '@coldpbc/lib';
import { EntityLevel } from '@coldpbc/enums';

interface ProductSustainabilityAttributesCardProps {
	product: ProductsQuery;
}

const filterAttributes = (attributes: SustainabilityAttribute[], level: EntityLevel) => {
  return attributes.filter(sustainabilityAttribute => sustainabilityAttribute.level === level)
}

const _ProductSustainabilityAttributesCard: React.FC<ProductSustainabilityAttributesCardProps> = ({ product }) => {
  const materials = product.productMaterials.map(productMaterial => productMaterial.material);
  const suppliers = new Set<EntityWithAttributeAssurances>;
  // Tier 1 Supplier
  if (product.organizationFacility) {
    suppliers.add(product.organizationFacility);
  }
  // Tier 2 Supplier
  product.productMaterials.forEach(productMaterial => {
    if (productMaterial.material.materialSuppliers.length > 0) {
      // each material can only have 1 Tier 2 supplier, so we pick the first
      suppliers.add(productMaterial.material.materialSuppliers[0].organizationFacility)
    }
  });

  // These filters reflect the current state of our data, but be unnecessary if we had better data validations
  const productSustainabilityAttributes = filterAttributes(
    processEntityLevelAssurances([product]),
    EntityLevel.PRODUCT
  );

  const materialSustainabilityAttributes = filterAttributes(
    processEntityLevelAssurances(materials),
    EntityLevel.MATERIAL
  );

  const supplierSustainabilityAttributes = filterAttributes(
    processEntityLevelAssurances(Array.from(suppliers)),
    EntityLevel.SUPPLIER
  );

	return (
		<Card title={'Sustainability Attributes'} className={'w-full h-fit'} data-testid={'product-sustainability-attributes-card'}>
			{productSustainabilityAttributes.length + materialSustainabilityAttributes.length + supplierSustainabilityAttributes.length === 0 && (
				// TODO: Update this copy once we can add a new attribute manually
				<span className="text-body text-cold-secondary">Upload documents to track sustainability attributes on this product.</span>
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
	onError: (error, info) => {
		console.error('Error occurred in ProductSustainabilityAttributesCard: ', error);
	},
});
