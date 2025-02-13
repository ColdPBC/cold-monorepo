// import { getProductCarbonFootprint, ProductFootprintCache } from '@coldpbc/hooks';
// import { ColdIcon, Popover } from '@coldpbc/components';
// import { IconNames } from '@coldpbc/enums';
// import { HexColors } from '@coldpbc/themes';
import React from 'react';
import { PaginatedProductsQuery } from '@coldpbc/interfaces';
import { getCalculatedWeight } from '@coldpbc/lib';

interface ProductFootprintDataGridCellProps {
  product: PaginatedProductsQuery;
  // cache: ProductFootprintCache;
  // id: string;
  // productCategory: string | null;
}

// const PERCENTAGE_RANGES = [
//   {
//     condition: (percent) => percent > 50,
//     icon: IconNames.ColdDangerIcon,
//     color: HexColors.red['300'],
//     label: 'Very High',
//     textColor: 'text-red-300'
//   },
//   {
//     condition: (percent) => percent <= 50 && percent > 25,
//     icon: IconNames.ColdDangerIcon,
//     color: HexColors.red['100'],
//     label: 'High',
//     textColor: 'text-red-100'
//   },
//   {
//     condition: (percent) => percent <= 25 && percent >= -25,
//     icon: IconNames.ColdInfoIcon,
//     label: null // No label for medium
//   },
//   {
//     condition: (percent) => percent < -25 && percent >= -50,
//     icon: IconNames.ColdFootprintIconThree,
//     color: HexColors.green['500'],
//     label: 'Low',
//     textColor: 'text-green-500'
//   },
//   {
//     condition: (percent) => percent < -50,
//     icon: IconNames.ColdFootprintIconThree,
//     color: HexColors.green['200'],
//     label: 'Very Low',
//     textColor: 'text-green-200'
//   }
// ];

export const ProductFootprintDataGridCell: React.FC<ProductFootprintDataGridCellProps> = ({ product }) => {
  // NOTE: This component used to leverage useProductCarbonFootprint data but that dependency has been temporarily removed due to performance considerations

  // const { totalFootprint, categoryAverage, percentageFromAverage } = getProductCarbonFootprint(cache, {
  //   id,
  //   productCategory,
  // });
  // const showComparison = productCategory && categoryAverage > 0;

  // the following section was copied over from useProductCarbonFootprint
  let totalFootprint = 0;

  product.productMaterials.forEach(productMaterial => {
    const weightResult = getCalculatedWeight(productMaterial);

    if (!('weightInKg' in weightResult) || !productMaterial.material.emissionsFactor) {
      return;
    }

    const materialFootprint = weightResult.weightInKg * productMaterial.material.emissionsFactor.emissionsFactor;
    totalFootprint += materialFootprint;
  });

  if (totalFootprint === 0) return 'No data available';

  // const range = PERCENTAGE_RANGES.find(range =>
  //   range.condition(percentageFromAverage)
  // ) ?? PERCENTAGE_RANGES[2]; // type safety, fall back to Medium

  return (
    <div className="flex w-full items-center justify-start gap-[10px]">
      <span className="text-tc-primary">{totalFootprint.toFixed(1)}</span>
      {/*{showComparison && (*/}
      {/*  <Popover*/}
      {/*    contentClassName="max-w-[260px]"*/}
      {/*    content={`${percentageFromAverage > 0 ? '+' : ''}${percentageFromAverage.toFixed(1)}% compared to average footprint of ${categoryAverage.toFixed(*/}
      {/*      1,*/}
      {/*    )} kgCO2e for products in the category ${productCategory}`}>*/}
      {/*    <div className={'flex items-center justify-center gap-1'}>*/}
      {/*      <ColdIcon*/}
      {/*        name={range.icon}*/}
      {/*        color={range.color}*/}
      {/*      />*/}
      {/*      {range.label && (*/}
      {/*        <div className={range.textColor}>{range.label}</div>*/}
      {/*      )}*/}
      {/*    </div>*/}
      {/*  </Popover>*/}
      {/*)}*/}
    </div>
  );
}
