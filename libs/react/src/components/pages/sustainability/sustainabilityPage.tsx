import { ErrorFallback, MainContent } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';
import React from 'react';

const _SustainabilityPage = () => {
  return (
    <MainContent title="Sustainability Attributes" className={'w-[calc(100%-100px)]'} />
  );
};

export const SustainabilityPage = withErrorBoundary(_SustainabilityPage, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in Sustainability: ', error);
  },
});
