import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback, MainContent, SuppliersDataGrid } from '@coldpbc/components';
import React from 'react';

const _SuppliersPage = () => {
  return (
    <MainContent title="Suppliers">
      <SuppliersDataGrid />
    </MainContent>
  );
};

export const SuppliersPage = withErrorBoundary(_SuppliersPage, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in Suppliers: ', error);
  },
});
