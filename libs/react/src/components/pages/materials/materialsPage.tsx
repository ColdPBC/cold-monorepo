import { ErrorFallback, MainContent, MaterialsDataGrid } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';
import React from 'react';

const _MaterialsPage = () => {
  return (
    <MainContent title="Materials">
      <MaterialsDataGrid />
    </MainContent>
  );
};

export const MaterialsPage = withErrorBoundary(_MaterialsPage, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
