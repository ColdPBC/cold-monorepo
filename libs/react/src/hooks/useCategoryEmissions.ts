import { useMemo } from 'react';
import { PcfGraphData } from '@coldpbc/interfaces';
import { MaterialClassificationCategory } from '@coldpbc/enums';

interface CategoryEmissionsInput {
  materialClassification: {
    category: MaterialClassificationCategory;
  } | null;
  totalEmissions: number;
}

export const useCategoryEmissions = (data: CategoryEmissionsInput[]) => {
  return useMemo(() => {
    return data.reduce<PcfGraphData[]>((acc, productMaterial) => {
      if (productMaterial.totalEmissions === 0) return acc;

      const category = productMaterial.materialClassification?.category || 'No Category';

      const existingCategory = acc.find(item => item.classificationCategory === category);

      if (existingCategory) {
        existingCategory.emissions += productMaterial.totalEmissions;
      } else {
        acc.push({
          classificationCategory: category,
          emissions: productMaterial.totalEmissions
        });
      }

      return acc;
    }, []);
  }, [data]);
}
