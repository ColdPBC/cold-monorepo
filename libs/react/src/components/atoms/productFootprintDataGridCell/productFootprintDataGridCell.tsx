import { getProductCarbonFootprint, ProductFootprintCache } from '@coldpbc/hooks';
import { ColdIcon, Popover } from '@coldpbc/components';
import { IconNames } from '@coldpbc/enums';
import { HexColors } from '@coldpbc/themes';
import React from 'react';

interface ProductFootprintDataGridCellProps {
  cache: ProductFootprintCache;
  id: string;
  productCategory: string | null;
}

export const ProductFootprintDataGridCell: React.FC<ProductFootprintDataGridCellProps> = ({cache, id, productCategory}) => {
  const { totalFootprint, categoryAverage, percentageFromAverage } = getProductCarbonFootprint(cache, {
    id,
    productCategory,
  });
  const showComparison = productCategory && categoryAverage > 0;

  if (totalFootprint === 0) return 'No data available';

  return (
    <div className="flex w-full items-center justify-start gap-[10px]">
      <span className="text-tc-primary">{totalFootprint.toFixed(1)}</span>
      {showComparison && (
        <Popover
          contentClassName="max-w-[260px]"
          content={`${percentageFromAverage > 0 ? '+' : ''}${percentageFromAverage.toFixed(1)}% compared to average footprint of ${categoryAverage.toFixed(
            1,
          )} kgCO2e for products in the category ${productCategory}`}>
          <div className={'flex items-center justify-center gap-1'}>
            {/* HIGH */}
            {percentageFromAverage > 25 && (
              <>
                <ColdIcon name={IconNames.ColdDangerIcon} color={HexColors.red['100']} />
                <div className={'text-red-100'}>High</div>
              </>
            )}
            {/* MEDIUM */}
            {percentageFromAverage <= 25 && percentageFromAverage >= -25 && (
              <ColdIcon name={IconNames.ColdInfoIcon} />
            )}
            {/* LOW */}
            {percentageFromAverage < -25 && (
              <>
                <ColdIcon name={IconNames.ColdFootprintIconThree} color={HexColors.green['200']} />
                <div className={'text-green-200'}>Low</div>
              </>
            )}
          </div>
        </Popover>
      )}
    </div>
  );
}
