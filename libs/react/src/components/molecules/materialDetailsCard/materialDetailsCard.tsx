import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { MaterialGraphQL } from '@coldpbc/interfaces';
import { Card, ColdIcon, DetailsItem, Popover } from '@coldpbc/components';
import { IconNames, WeightFactorUnits } from '@coldpbc/enums';
import { HexColors } from '@coldpbc/themes';

interface MaterialDetailsCardProps {
	material: MaterialGraphQL;
  editMaterial: () => void;
}

const getWeightFactorValue = material => {
	if (material.weightFactor && material.weightFactorUnitOfMeasure) {
		return `${material.weightFactor.toFixed(2)} ${material.weightFactorUnitOfMeasure}`;
	} else if (material.materialClassification?.weightFactor) {
		return (
			<div className={'flex items-center justify-start gap-1'}>
				<Popover content={`Based on a material classification of ${material.materialClassification.name}`} contentClassName="w-[275px]">
					<span role="img" aria-label={'Sparkles emoji'}>
						✨
					</span>
				</Popover>
				<span>
					{material.materialClassification.weightFactor.toFixed(2)} {WeightFactorUnits.KG_PER_M2}
				</span>
			</div>
		);
	} else {
		return undefined;
	}
};

const _MaterialDetailsCard: React.FC<MaterialDetailsCardProps> = ({ material, editMaterial }) => {
	const tier2Supplier = material.organizationFacility;

	const classificationCategory = (
		<div className={'flex items-center justify-start gap-1'}>
			<span>Classification</span>
			<Popover content={'This classification is used for carbon accounting and sustainability attribute reporting.'} contentClassName="w-[275px]">
				<ColdIcon name={IconNames.ColdInfoIcon} color={HexColors.tc['disabled']} />
			</Popover>
		</div>
	);

	return (
		<Card title={'Details'} ctas={[{ text: 'Edit', action: editMaterial }]} className={'w-[406px] min-w-[406px] h-fit'} data-testid={'material-details-card'}>
			<DetailsItem category={'Name'} value={material.name} />
			<DetailsItem category={'Description'} value={material.description} />
			<DetailsItem category={'Tier 2 Supplier'} value={tier2Supplier?.name} href={tier2Supplier ? `/suppliers/${tier2Supplier.id}` : undefined} />
			<DetailsItem category={'Tier 2 Supplier Country'} value={tier2Supplier?.country} />
			<DetailsItem category={classificationCategory} value={material.materialClassification?.name} />
			<DetailsItem category={'Category'} value={material.materialCategory} />
			<DetailsItem category={'Sub-Category'} value={material.materialSubcategory} />
			<DetailsItem category={'Brand Material ID'} value={material.brandMaterialId} />
			<DetailsItem category={'Supplier Material ID'} value={material.supplierMaterialId} />
			<DetailsItem category={'Weight Factor'} value={getWeightFactorValue(material)} />
			<DetailsItem category={'Width'} value={material.width && material.widthUnitOfMeasure ? `${material.width.toFixed(2)} ${material.widthUnitOfMeasure}` : undefined} />
		</Card>
	);
};

export const MaterialDetailsCard = withErrorBoundary(_MaterialDetailsCard, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in MaterialDetailsCard: ', error);
	},
});
