import { EmissionsAllScopesCard, EmissionsDonutChartVariants, ErrorFallback } from '@coldpbc/components';
import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ColdEmissionsProvider } from '@coldpbc/providers';

const _EmissionsOverviewCard = () => {
  return (
    <ColdEmissionsProvider>
      <EmissionsAllScopesCard variant={EmissionsDonutChartVariants.horizontal} title={'Emissions Overview'} />
    </ColdEmissionsProvider>
  );
};

export const EmissionsOverviewCard = withErrorBoundary(_EmissionsOverviewCard, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
