import React from 'react';
import { MainContent } from '../../organisms/mainContent';
import { UserSettings } from '../../molecules/userSettings';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';
import { TeamMemberTable } from '../../organisms/teamMemberTable/teamMemberTable';
import { useFlags } from 'launchdarkly-react-client-sdk';

export type MemberStatusType = 'Members' | 'Invitations';

const _Settings = (props: { user?: any }) => {
  const ldFlags = useFlags();

  return (
    <MainContent title="Settings">
      <UserSettings />
      {ldFlags.showTeamMemberTable && <TeamMemberTable />}
    </MainContent>
  );
};

export const Settings = withErrorBoundary(_Settings, {
  FallbackComponent: (props) => <ErrorFallback />,
  onError: (error, info) => {
    console.error('Error occurred in Settings: ', error);
  },
});
