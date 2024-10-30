import { ErrorFallback } from '@coldpbc/components';
import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';

export const _SupplierDetail = () => {
  return null;
};

export const SupplierDetail = withErrorBoundary(_SupplierDetail, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in SupplierDetail: ', error);
  },
});
