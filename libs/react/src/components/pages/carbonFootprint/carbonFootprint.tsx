import React from 'react';
import { EmissionsCarbonFootprintBase, ErrorFallback } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';
import { ColdEmissionsProvider } from '@coldpbc/providers';

const _CarbonFootprint = () => {
  // todo: add hover effect capability to donut chart and table
  // todo: add hover effect to table rows
  // todo: update bar chart tooltip to custom one
  // todo: update table to have a dropdown for 'Other Activities'
  // todo: remove linear regression when data is for 2 years only
  // todo: push other activities to 5th instead of 4th row
  // todo: add category name
  return (
    <ColdEmissionsProvider>
      <EmissionsCarbonFootprintBase />
    </ColdEmissionsProvider>
  );
};

export const CarbonFootprint = withErrorBoundary(_CarbonFootprint, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
