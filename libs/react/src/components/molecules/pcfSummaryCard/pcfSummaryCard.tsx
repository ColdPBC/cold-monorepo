import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { ProductsQuery } from '@coldpbc/interfaces';
import { Card, DetailsItem, PcfGraphByClassificationCategory } from '@coldpbc/components';
import { PcfGraphData } from '@coldpbc/enums';

interface PcfSummaryCardProps {
  data: PcfGraphData[];
}

const _PcfSummaryCard: React.FC<PcfSummaryCardProps> = ({ data }) => {
  const totalEmissions = data.reduce((sum, datum) => datum.emissions + sum, 0);
  const emissionsString = totalEmissions > 0 ? totalEmissions.toFixed(1) : '--';

  return (
    <Card glow={true} data-testid={'pcf-summary-card'}>
      <div className={'h-[194px] w-full flex gap-6'}>
        <div className={'flex flex-col h-fit w-full min-w-[1000px] gap-6 items-start'}>
          <span className={'text-[40px] text-tc-primary font-bold'}>{emissionsString} kg CO2e</span>
          <PcfGraphByClassificationCategory data={data} displayStyle={'pcfTab'} />
        </div>
        <div className={'h-full w-[1px] bg-gray-90'} />
        <div className={'h-full w-[277px] shrink-0 flex flex-col items-start gap-6'}>
          <span className={'text-lg text-tc-white font-semibold leading-[27px]'}>How This Works</span>
          <span className={'text-sm text-tc-white leading-[21px]'}><span role='img' aria-label='Sparkles emoji'>✨</span> Cold AI classifies materials and finds the best emission factor match. Factors and factor values are from the Ecoinvent factor library.  Weight estimates are derived from the material yield and unit of measure.</span>
        </div>
      </div>
    </Card>
  );
};


export const PcfSummaryCard = withErrorBoundary(_PcfSummaryCard, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in PcfSummaryCard: ', error);
  },
});
