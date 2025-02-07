import React from 'react';
import { MaterialClassificationCategory } from '@coldpbc/enums';
import { MATERIAL_CLASSIFICATIONS_CATEGORY_COLORS } from '@coldpbc/lib';
import {
  CoatingsAndLaminationsIcon,
  FoamIcon,
  InsulationMaterialIcon,
  LeatherIcon,
  LeatherAlternativesIcon,
  MetalsIcon,
  PlasticsIcon,
  RubbersElastomersIcon,
  SyntheticLeatherIcon,
  TextilesIcon,
  WoodBasedMaterialsIcon,
} from '@coldpbc/components';

export interface MaterialClassificationIconProps extends React.SVGProps<SVGSVGElement> {
	materialClassificationCategory: MaterialClassificationCategory;
}

export const getIconForMaterialClassification = (materialClassificationCategory: MaterialClassificationCategory) => {
  const MATERIAL_CLASSIFICATION_CATEGORY_ICON = {
    [MaterialClassificationCategory.COATINGS_AND_LAMINATIONS]: CoatingsAndLaminationsIcon,
    [MaterialClassificationCategory.FOAM]: FoamIcon,
    [MaterialClassificationCategory.INSULATION_MATERIAL]: InsulationMaterialIcon,
    [MaterialClassificationCategory.LEATHER]: LeatherIcon,
    [MaterialClassificationCategory.LEATHER_ALTERNATIVES]: LeatherAlternativesIcon,
    [MaterialClassificationCategory.METALS]: MetalsIcon,
    [MaterialClassificationCategory.PLASTICS]: PlasticsIcon,
    [MaterialClassificationCategory.RUBBERS_ELASTOMERS]: RubbersElastomersIcon,
    [MaterialClassificationCategory.SYNTHETIC_LEATHER]: SyntheticLeatherIcon,
    [MaterialClassificationCategory.TEXTILES]: TextilesIcon,
    [MaterialClassificationCategory.WOOD_BASED_MATERIALS]: WoodBasedMaterialsIcon,
  };

  return MATERIAL_CLASSIFICATION_CATEGORY_ICON[materialClassificationCategory];
}

export const MaterialClassificationIcon: React.FC<MaterialClassificationIconProps> = ({ materialClassificationCategory, ...props }) => {
  const Icon = getIconForMaterialClassification(materialClassificationCategory);
  const backgroundColor = MATERIAL_CLASSIFICATIONS_CATEGORY_COLORS[materialClassificationCategory];

	if (!Icon || !backgroundColor) {
		return null;
	}

	return (
		<div className={'w-6 h-6 rounded-sm flex items-center justify-center'} style={{ backgroundColor }} role="img" aria-label={materialClassificationCategory}>
			<Icon {...props} aria-hidden="true" />
		</div>
	);
};
