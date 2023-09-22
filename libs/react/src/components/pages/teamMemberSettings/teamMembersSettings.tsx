import { BaseButton } from '../../atoms/button/button';
import { ColorNames } from '../../../enums/colors';
import React, { useState } from 'react';
import { TeamMembersDataGrid } from '../../organisms/teamMemberDataGrid/teamMembersDataGrid';
import useSWR from 'swr';
import { InvitationModal } from '../../molecules/invitationModal/invitationModal';
import { Spinner } from '../../atoms/spinner/spinner';
import { axiosFetcher } from '../../../fetchers/axiosFetcher';
import { useAuth0 } from '@auth0/auth0-react';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { Organization } from 'auth0';
import { Header } from '../../organisms/header/header';
import { MainContent } from '../../organisms/mainContent';
import { UserSettings } from '../../molecules/userSettings';
import { Card } from '../../molecules';
import { ButtonTypes } from '@coldpbc/enums';

export const TeamMembersSettings = (props: { user?: any }) => {
  const auth0 = useAuth0();

  const flags = useFlags();

  const { showTeamMemberTable } = flags;

  const [showModal, setShowModal] = useState(false);

  const organization = useSWR(
    ['/organizations/' + auth0.user?.coldclimate_claims.org_id, 'GET'],
    axiosFetcher,
  );

  const { data: Organization } = organization;

  const organizationData = organization.data as Organization;

  if (auth0.isLoading && organization.isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (auth0.error && organization.error) {
    return <div></div>;
  }

  if (auth0.user && organization.data) {
    return (
      <MainContent title='Settings'>
        <UserSettings user={auth0.user} />

        {showTeamMemberTable &&
          <Card
            title='Team Members' 
            glow
            ctas={[
              {
                text: 'Invite Member',
                variant: ButtonTypes.primary,
                action: () => {
                  setShowModal(true);
                }
              }
            ]}
          >
            <TeamMembersDataGrid />
          </Card>
        }

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
