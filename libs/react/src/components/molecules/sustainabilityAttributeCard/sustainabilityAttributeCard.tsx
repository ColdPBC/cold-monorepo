import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';

interface SustainabilityAttributeCardProps {
  attributeName: string;
  iconUrl: string;
  materialsCount: number;
}

const _SustainabilityAttributeCard: React.FC<SustainabilityAttributeCardProps> = ({ attributeName, iconUrl, materialsCount }) => {
  return (
    <div className="w-[582px] h-[136px] p-4 rounded-2xl border border-[#656b99] justify-start items-start gap-4 inline-flex">
      <div className="w-[104px] h-[104px] rounded-lg justify-start items-center gap-2.5 flex">
        <div className="h-[104px] p-[10.40px] bg-white justify-start items-center gap-[5.20px] flex">
          <img className="w-[83.20px] h-[83.20px]" src={iconUrl} />
        </div>
      </div>
      <div className="grow shrink basis-0 self-stretch flex-col justify-between items-start inline-flex">
        <div className="self-stretch text-white text-xl font-bold font-['Inter'] leading-[30px]">{attributeName}</div>
        <div className="self-stretch justify-start items-end gap-2 inline-flex">
          <div className="text-[#a3a6c2] text-sm font-bold font-['Inter'] leading-[21px]">{`${materialsCount} Materials`}</div>
        </div>
      </div>
    </div>
	);
};

export const SustainabilityAttributeCard = withErrorBoundary(_SustainabilityAttributeCard, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in TemperatureCheckCard: ', error);
  },
});
