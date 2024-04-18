import React from 'react';
import { EmissionsCarbonFootprintBase, ErrorFallback } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';
import { ColdEmissionsProvider } from '@coldpbc/providers';

const _CarbonFootprint = () => {
  // todo: add hover effect capability to donut chart and table
  // todo: add hover effect to table rows
  // todo: update bar chart tooltip to custom one
  // todo: regression line for bar chart
  return (
    <ColdEmissionsProvider>
      <EmissionsCarbonFootprintBase />
    </ColdEmissionsProvider>
  );
};

export const CarbonFootprint = withErrorBoundary(_CarbonFootprint, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
