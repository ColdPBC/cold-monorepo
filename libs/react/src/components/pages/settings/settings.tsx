import { BaseButton } from '../../atoms/button/button';
import { useEffect, useState } from 'react';
import { TeamMembersDataGrid } from '../../organisms/teamMemberDataGrid/teamMembersDataGrid';
import useSWR from 'swr';
import { InvitationModal } from '../../molecules/invitationModal/invitationModal';
import { Spinner } from '../../atoms/spinner/spinner';
import { axiosFetcher } from '../../../fetchers/axiosFetcher';
import { useAuth0 } from '@auth0/auth0-react';
import { Organization } from 'auth0';
import { MainContent } from '../../organisms/mainContent';
import { UserSettings } from '../../molecules/userSettings';
import { Card } from '../../molecules';
import { ButtonTypes, ErrorType } from '@coldpbc/enums';
import { Dropdown } from 'flowbite-react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { CheckIcon } from '@heroicons/react/20/solid';
import { flowbiteThemeOverride } from '@coldpbc/themes';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';
import { useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { TeamMemberSettings } from '../../organisms';

const _Settings = (props: { user?: any }) => {
  const ldFlags = useFlags();

  return (
    <MainContent title="Settings">
      <UserSettings />
      {ldFlags.showTeamMemberTable && <TeamMemberSettings />}
    </MainContent>
  );
};

export const Settings = withErrorBoundary(_Settings, {
  FallbackComponent: (props) => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in Settings: ', error);
  },
});
