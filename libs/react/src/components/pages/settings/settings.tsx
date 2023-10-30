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

export type MemberStatusType = 'Members' | 'Invitations';

const _Settings = (props: { user?: any }) => {
  const auth0 = useAuth0Wrapper();
  const ldFlags = useFlags();
  const { logError } = useColdContext();
  const [showModal, setShowModal] = useState(false);
  const [selectedMemberStatusType, setSelectedMemberStatusType] =
    useState<MemberStatusType>('Members');

  const organization = useSWR(
    ['/organizations/' + auth0.orgId, 'GET'],
    axiosFetcher,
  );

  const organizationData = organization.data as Organization;

  if (auth0.isLoading && organization.isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (auth0.error || organization.error) {
    if (auth0.error) {
      logError(auth0.error, ErrorType.Auth0Error);
    }
    if (organization.error) {
      logError(organization.error, ErrorType.SWRError);
    }
    return <div></div>;
  }

  if (auth0.user && organization.data) {
    return (
      <MainContent title="Settings">
        <UserSettings />
        {ldFlags.showTeamMemberTable && (
          <Card
            title="Team Members"
            glow
            ctas={[
              {
                text: 'Invite Member',
                variant: ButtonTypes.primary,
                action: () => {
                  setShowModal(true);
                },
              },
            ]}
          >
            <div className="absolute top-[18px] right-40">
              <Dropdown
                inline={true}
                label={
                  <BaseButton
                    variant={ButtonTypes.secondary}
                    onClick={() => {}}
                  >
                    <span className="flex items-center">
                      {selectedMemberStatusType}{' '}
                      <ChevronDownIcon className="w-[18px] ml-2" />
                    </span>
                  </BaseButton>
                }
                arrowIcon={false}
                theme={flowbiteThemeOverride.dropdown}
              >
                <Dropdown.Item
                  onClick={() => setSelectedMemberStatusType('Members')}
                  theme={flowbiteThemeOverride.dropdown.floating.item}
                >
                  <span className="w-[130px] flex justify-between">
                    Members{' '}
                    {selectedMemberStatusType === 'Members' && (
                      <CheckIcon className="w-[14px]" />
                    )}
                  </span>
                </Dropdown.Item>
                <div className="bg-bgc-accent h-[1px] w-full" />
                <Dropdown.Item
                  onClick={() => setSelectedMemberStatusType('Invitations')}
                  theme={flowbiteThemeOverride.dropdown.floating.item}
                >
                  <span className="w-[130px] flex justify-between">
                    Invitations{' '}
                    {selectedMemberStatusType === 'Invitations' && (
                      <CheckIcon className="w-[14px]" />
                    )}
                  </span>
                </Dropdown.Item>
              </Dropdown>
            </div>
            <TeamMembersDataGrid
              selectedMemberStatusType={selectedMemberStatusType}
            />
          </Card>
        )}
        {showModal && (
          <InvitationModal
            setShown={setShowModal}
            shown={showModal}
            companyName={organizationData.name}
            user={auth0.user}
          />
        )}
      </MainContent>
    );
  } else {
    return <div></div>;
  }
};

export const Settings = withErrorBoundary(_Settings, {
  FallbackComponent: (props) => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in Settings: ', error);
  },
});
