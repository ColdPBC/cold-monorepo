import React from 'react';
import { EmptyState } from '@coldpbc/components';
import type { EmptyStateProps } from '@coldpbc/components';

interface SustainabilityAttributeTabProps {
  emptyStateProps: EmptyStateProps;
}

export const SustainabilityAttributeTab: React.FC<SustainabilityAttributeTabProps> = ({ emptyStateProps }) => {
  return (
    <EmptyState
      {...emptyStateProps}
    />
  );
};
