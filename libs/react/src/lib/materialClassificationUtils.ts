import { MaterialClassificationCategory } from '@coldpbc/enums';
import { HexColors } from '@coldpbc/themes';

export const MATERIAL_CLASSIFICATIONS_CATEGORY_COLORS = {
  [MaterialClassificationCategory.COATINGS_AND_LAMINATIONS]: HexColors.teal['200'],
  [MaterialClassificationCategory.FOAM]: '#668CFF',
  [MaterialClassificationCategory.INSULATION_MATERIAL]: '#D4FF66',
  [MaterialClassificationCategory.LEATHER]: HexColors.green['200'],
  [MaterialClassificationCategory.LEATHER_ALTERNATIVES]: '#FF66D9',
  [MaterialClassificationCategory.METALS]: '#FFBA66',
  [MaterialClassificationCategory.PLASTICS]: '#FF7A66',
  [MaterialClassificationCategory.RUBBERS_ELASTOMERS]: '#E866FF',
  [MaterialClassificationCategory.SYNTHETIC_LEATHER]: HexColors.purple['200'],
  [MaterialClassificationCategory.TEXTILES]: HexColors.lightblue['200'],
  [MaterialClassificationCategory.WOOD_BASED_MATERIALS]: HexColors.yellow['200'],
};
