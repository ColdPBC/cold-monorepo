import React from 'react';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { ErrorFallback, MainContent, TeamMemberSettings } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';

const _AccountSettingsPage = () => {
  const ldFlags = useFlags();
  return <MainContent title="Account Management">{ldFlags.showTeamMemberTable && <TeamMemberSettings />}</MainContent>;
};

export const AccountSettingsPage = withErrorBoundary(_AccountSettingsPage, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
