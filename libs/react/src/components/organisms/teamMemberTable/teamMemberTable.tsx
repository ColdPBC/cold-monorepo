import React, { useEffect, useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useAuth0 } from '@auth0/auth0-react';
import { useFlags } from 'launchdarkly-react-client-sdk';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import {
  BaseButton,
  Card,
  InvitationModal,
  MemberStatusType,
  Spinner,
  TeamMembersDataGrid,
} from '@coldpbc/components';
import { ButtonTypes } from '@coldpbc/enums';
import { Dropdown } from 'flowbite-react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { flowbiteThemeOverride } from '@coldpbc/themes';
import { Organization } from 'auth0';
const _TeamMemberTable = (props: any) => {
  const auth0 = useAuth0();

  const [showModal, setShowModal] = useState(false);
  const [selectedMemberStatusType, setSelectedMemberStatusType] =
    useState<MemberStatusType>('Members');

  const organization = useSWR(
    ['/organizations/' + auth0.user?.coldclimate_claims.org_id, 'GET'],
    axiosFetcher,
  );

  const { data: Organization } = organization;

  const { user: dataGridUser } = useAuth0();

  const getOrgURL = () => {
    if (dataGridUser?.coldclimate_claims.org_id) {
      return [
        '/organizations/' + dataGridUser.coldclimate_claims.org_id + '/members',
        'GET',
      ];
    } else {
      return null;
    }
  };

  const { data: memberData }: { data: any; error: any; isLoading: boolean } =
    useSWR(getOrgURL(), axiosFetcher, {
      revalidateOnFocus: false,
    });

  const organizationData = organization.data as Organization;
  const hasPendingInvitations = memberData?.members?.some(
    (user: any) => user.invitee,
  );

  useEffect(() => {
    if (!hasPendingInvitations) {
      setSelectedMemberStatusType('Members');
    }
  }, [hasPendingInvitations]);

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
      <>
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
          {hasPendingInvitations && (
            <div className="absolute top-4 right-40">
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
          )}
          <TeamMembersDataGrid
            selectedMemberStatusType={selectedMemberStatusType}
          />
        </Card>
        {showModal && (
          <InvitationModal
            setShown={setShowModal}
            shown={showModal}
            companyName={organizationData.name}
            user={auth0.user}
          />
        )}
      </>
    );
  } else {
    return <div></div>;
  }
};

export const TeamMemberTable = withErrorBoundary(_TeamMemberTable, {
  fallbackRender: (props) => <></>,
});
