import React from 'react';
import { ErrorFallback, MainContent, TeamMemberSettings } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';

const _UserSettingsPage = () => {
  return <MainContent title="Account"><TeamMemberSettings /></MainContent>;
};

export const UserSettingsPage = withErrorBoundary(_UserSettingsPage, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
