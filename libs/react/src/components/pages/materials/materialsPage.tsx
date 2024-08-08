import { ErrorFallback, MainContent, MaterialsDataGrid } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';
import React from 'react';

// todo: handle storybook material page
// todo: add materials to sidebar mock
// todo: add ld flag to storybook

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
