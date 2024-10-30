import React from 'react';
import { ErrorFallback } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';

const _MaterialDetail: React.FC = () => {
  return null;
};

export const MaterialDetail = withErrorBoundary(_MaterialDetail, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
