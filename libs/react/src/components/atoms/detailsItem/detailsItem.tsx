import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';

interface DetailsItemProps {
  category: string;
  value: string | null | undefined;
}

const _DetailsItem: React.FC<DetailsItemProps> = ({ category, value }) => (
  <div className="w-full h-fit flex flex-col gap-2 items-start">
    <span className='text-eyebrow text-tc-disabled'>{category}</span>
    <span className='text-body text-white text-wrap'>{value || 'None'}</span>
  </div>
);


export const DetailsItem = withErrorBoundary(_DetailsItem, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in DetailsItem: ', error);
  },
});
