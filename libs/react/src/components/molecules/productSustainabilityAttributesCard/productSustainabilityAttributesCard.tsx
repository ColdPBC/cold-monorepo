import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { ProductsQuery } from '@coldpbc/interfaces';
import { Card, SustainabilityAttributeCard } from '@coldpbc/components';
import { mapAttributeAssurancesToSustainabilityAttributes } from '@coldpbc/lib';
import { EntityLevel } from '@coldpbc/enums';

interface ProductSustainabilityAttributesCardProps {
	product: ProductsQuery;
}

const _ProductSustainabilityAttributesCard: React.FC<ProductSustainabilityAttributesCardProps> = ({ product }) => {
	// Grab the attribute assurances for each entity level, and append the entity ID
	const productAttributeAssurances = product.attributeAssurances.map(attributeAssurance => ({
		...attributeAssurance,
		product: { id: product.id },
	}));
	const materialAttributeAssurances =
		product.productMaterials.flatMap(productMaterial => {
			const material = productMaterial.material;
			if (material) {
				return material.attributeAssurances.map(attributeAssurance => ({ ...attributeAssurance, material: { id: material.id } }));
			} else {
				return [];
			}
		}) || [];
	const tier1supplierAttributeAssurances =
		product.organizationFacility?.attributeAssurances.map(attributeAssurance => ({
			...attributeAssurance,
			organizationFacility: { id: product.organizationFacility!.id },
		})) || [];
	const tier2supplierAttributeAssurances = product.productMaterials.flatMap(productMaterial => {
		// Note: In practice each material can only have one tier 2 supplier.
		const tier2Supplier = productMaterial.material?.materialSuppliers[0]?.organizationFacility;
		if (tier2Supplier) {
			return tier2Supplier.attributeAssurances.map(attributeAssurance => ({ ...attributeAssurance, organizationFacility: { id: tier2Supplier.id } }));
		} else {
			return [];
		}
	});

	// These filters reflect the current state of our data, but be unnecessary if we had better data validations
	const productSustainabilityAttributes = mapAttributeAssurancesToSustainabilityAttributes(productAttributeAssurances)
		.filter(sustainabilityAttribute => sustainabilityAttribute.level === EntityLevel.PRODUCT)
		.sort((a, b) => a.name.localeCompare(b.name));
	const materialSustainabilityAttributes = mapAttributeAssurancesToSustainabilityAttributes(materialAttributeAssurances)
		.filter(sustainabilityAttribute => sustainabilityAttribute.level === EntityLevel.MATERIAL)
		.sort((a, b) => a.name.localeCompare(b.name));
	const supplierSustainabilityAttributes = mapAttributeAssurancesToSustainabilityAttributes([...tier1supplierAttributeAssurances, ...tier2supplierAttributeAssurances])
		.filter(sustainabilityAttribute => sustainabilityAttribute.level === EntityLevel.SUPPLIER)
		.sort((a, b) => a.name.localeCompare(b.name));

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
							<SustainabilityAttributeCard sustainabilityAttribute={sustainabilityAttribute} />
						</div>
					))}
				</div>
			)}
			{materialSustainabilityAttributes.length > 0 && (
				<div className="w-full h-fit flex flex-col gap-2 justify-start items-start">
					<span className="text-body font-bold text-white">Material-level</span>
					{materialSustainabilityAttributes.map(sustainabilityAttribute => (
						<div className="w-full" key={sustainabilityAttribute.id}>
							<SustainabilityAttributeCard sustainabilityAttribute={sustainabilityAttribute} />
						</div>
					))}
				</div>
			)}
			{supplierSustainabilityAttributes.length > 0 && (
				<div className="w-full h-fit flex flex-col gap-2 justify-start items-start">
					<span className="text-body font-bold text-white">Supplier-level</span>
					{supplierSustainabilityAttributes.map(sustainabilityAttribute => (
						<div className="w-full" key={sustainabilityAttribute.id}>
							<SustainabilityAttributeCard sustainabilityAttribute={sustainabilityAttribute} />
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
