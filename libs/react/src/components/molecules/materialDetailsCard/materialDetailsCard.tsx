import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { MaterialGraphQL } from '@coldpbc/interfaces';
import { Card, ColdIcon, DetailsItem, Popover } from '@coldpbc/components';
import { IconNames } from '@coldpbc/enums';
import { HexColors } from '@coldpbc/themes';

interface MaterialDetailsCardProps {
	material: MaterialGraphQL;
  openEditClassificationModal: () => void;
}

const _MaterialDetailsCard: React.FC<MaterialDetailsCardProps> = ({ material, openEditClassificationModal }) => {
  const tier2Supplier = material.materialSuppliers[0]?.organizationFacility;

  const classificationCategory = (
		<div className={'flex items-center justify-start gap-1'}>
			<span>Classification</span>
			<Popover content={'This classification is used for carbon accounting and sustainability attribute reporting.'} contentClassName="w-[275px]">
				<ColdIcon name={IconNames.ColdInfoIcon} color={HexColors.tc['disabled']} />
			</Popover>
		</div>
	);

	return (
		<Card title={'Details'} className={'w-[406px] min-w-[406px] h-fit'} data-testid={'material-details-card'}>
			<DetailsItem category={'Name'} value={material.name} />
			<DetailsItem category={'Description'} value={material.description} />
			<DetailsItem category={'Tier 2 Supplier'} value={tier2Supplier?.name} href={tier2Supplier ? `/suppliers/${tier2Supplier.id}` : undefined} />
			<DetailsItem category={'Tier 2 Supplier Country'} value={tier2Supplier?.country} />
			<DetailsItem
				category={classificationCategory}
				value={material.materialClassification?.name}
				cta={() => openEditClassificationModal()}
				ctaIconName={IconNames.ColdEditPencilIcon}
			/>
			<DetailsItem category={'Category'} value={material.materialCategory} />
			<DetailsItem category={'Sub-Category'} value={material.materialSubcategory} />
			<DetailsItem category={'Brand Material ID'} value={material.brandMaterialId} />
			<DetailsItem category={'Supplier Material ID'} value={material.supplierMaterialId} />
		</Card>
	);
};

export const MaterialDetailsCard = withErrorBoundary(_MaterialDetailsCard, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in MaterialDetailsCard: ', error);
	},
});
