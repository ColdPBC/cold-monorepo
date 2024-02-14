import React from 'react';
import { ErrorFallback, MainContent, UserSettings } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';

const _UserSettingsPage = () => {
  return (
    <MainContent title="Users">
      <UserSettings />
    </MainContent>
  );
};

export const UserSettingsPage = withErrorBoundary(_UserSettingsPage, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
