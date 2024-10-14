import React from 'react';
import { ErrorFallback } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';
import { Popover } from '@coldpbc/components';

interface SustainabilityAttributeLogoOverflowProps {
  overflowItemCount: number;
}

const _SustainabilityAttributeLogoOverflow: React.FC<SustainabilityAttributeLogoOverflowProps> = ({ overflowItemCount }) => {
  return (
    <Popover content={"Open Product detail to see all"}>
      <div className="w-[82px] h-[82px] bg-gray-50 rounded-lg flex items-center justify-center">
        <span className="text-white">{`+${overflowItemCount} more`}</span>
      </div>
    </Popover>
  );
};

export const SustainabilityAttributeLogoOverflow = withErrorBoundary(_SustainabilityAttributeLogoOverflow, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, _info) => {
    console.error('Error occurred in SustainabilityAttributeLogoOverflow: ', error);
  },
});
