import React from 'react';
import { EmissionsCarbonFootprintBase, ErrorFallback } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';
import { ColdEmissionsProvider } from '@coldpbc/providers';

const _CarbonFootprint = () => {
  // todo: update bar chart tooltip to custom one
  return (
    <ColdEmissionsProvider>
      <EmissionsCarbonFootprintBase />
    </ColdEmissionsProvider>
  );
};

export const CarbonFootprint = withErrorBoundary(_CarbonFootprint, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
