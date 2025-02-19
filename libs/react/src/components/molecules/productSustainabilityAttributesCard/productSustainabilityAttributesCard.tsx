import React, { useMemo } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { PcfGraphData, ProductsQuery } from '@coldpbc/interfaces';
import {
  BaseButton,
  Card, handleTabChange,
  PcfGraphByClassificationCategory,
  SustainabilityAttributeCard,
  SustainabilityAttributeCardStyle,
} from '@coldpbc/components';
import {
  filterAttributes,
  getAggregateEmissionFactors,
  getCalculatedWeight,
  processEntityLevelAssurances,
} from '@coldpbc/lib';
import { ButtonTypes, EntityLevel } from '@coldpbc/enums';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { get, snakeCase } from 'lodash';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface ProductSustainabilityAttributesCardProps {
	product: ProductsQuery;
  setShowUpdateAttributesModal: (show: boolean) => void;
}

const _ProductSustainabilityAttributesCard: React.FC<ProductSustainabilityAttributesCardProps> = ({ product, setShowUpdateAttributesModal }) => {
  const ldFlags = useFlags();
  const [_searchParams, setSearchParams] = useSearchParams();

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
  ];

  const categoryEmissions = useMemo(() => {
    return product.productMaterials.reduce<PcfGraphData[]>((acc, productMaterial) => {
      const weightResult = getCalculatedWeight(productMaterial);
      const calculatedWeight = get(weightResult, 'weightInKg');
      const emissionFactor = getAggregateEmissionFactors(productMaterial.material.materialEmissionFactors);
      const totalEmissions = (emissionFactor && calculatedWeight) ? emissionFactor.value * calculatedWeight : 0

      if (totalEmissions === 0) return acc;

      const category = productMaterial.material.materialClassification?.category || 'No Category';

      const existingCategory = acc.find(item => item.classificationCategory === category);

      if (existingCategory) {
        existingCategory.emissions += totalEmissions;
      } else {
        acc.push({
          classificationCategory: category,
          emissions: totalEmissions
        });
      }

      return acc;
    }, []);
  }, [product.productMaterials]);

  const totalProductEmissions = categoryEmissions.length > 0 ? categoryEmissions.reduce((sum, pcfGraphData) => sum + pcfGraphData.emissions, 0).toFixed(1) : '--';

	return (
		<Card title={'Sustainability Attributes'} className={'w-full h-fit'} data-testid={'product-sustainability-attributes-card'} ctas={ctas}>
			{!ldFlags.showNewPcfUiCold1450 && productSustainabilityAttributes.length + materialSustainabilityAttributes.length + supplierSustainabilityAttributes.length === 0 && (
				<span className="text-body text-tc-secondary">Add a new attribute manually or upload documents to track sustainability attributes on this product.</span>
			)}
			{/* Always show the Products section if we're showing the new PCF UI */}
			{(ldFlags.showNewPcfUiCold1450 || productSustainabilityAttributes.length > 0) && (
				<div className="w-full h-fit flex flex-col gap-2 justify-start items-start">
					<span className="text-body font-bold text-white">Product-level</span>
					{ldFlags.showNewPcfUiCold1450 && (
						<div className={'w-full h-auto p-4 rounded-2xl border border-gray-90 flex flex-col gap-6'}>
							<div className={'h-fit w-full flex justify-between gap-6'}>
								<span className={'text-[32px] text-tc-primary font-bold'}>{totalProductEmissions} kg CO2e</span>
                <BaseButton
                  key={'button_see_details_pcf'}
                  label={'See Details'}
                  onClick={() => handleTabChange('Carbon Accounting', setSearchParams)}
                  variant={ButtonTypes.secondary}
                />
              </div>
              <PcfGraphByClassificationCategory data={categoryEmissions} displayStyle={'productDetails'} />
						</div>
					)}
					{productSustainabilityAttributes.map(sustainabilityAttribute => (
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
							<SustainabilityAttributeCard sustainabilityAttribute={sustainabilityAttribute} cardStyle={SustainabilityAttributeCardStyle.ENTITY_DETAIL} />
						</div>
					))}
				</div>
			)}
			{supplierSustainabilityAttributes.length > 0 && (
				<div className="w-full h-fit flex flex-col gap-2 justify-start items-start">
					<span className="text-body font-bold text-white">Supplier-level</span>
					{supplierSustainabilityAttributes.map(sustainabilityAttribute => (
						<div className="w-full" key={sustainabilityAttribute.id}>
							<SustainabilityAttributeCard sustainabilityAttribute={sustainabilityAttribute} cardStyle={SustainabilityAttributeCardStyle.ENTITY_DETAIL} />
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
