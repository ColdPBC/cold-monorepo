import React from 'react';
import {Datagrid} from '../../molecules/dataGrid/datagrid';
import useSWR from 'swr';
import {TeamMemberName} from '../../molecules/teamMemberName/teamMemberName';
import {GlobalSizes} from '../../../enums/sizes';
import {Spinner} from '../../atoms/spinner/spinner';
import {ColorNames} from '../../../enums/colors';
import {orderBy, startCase} from 'lodash';
import {Avatar} from '../../atoms/avatar/avatar';
import {axiosFetcher} from '../../../fetchers/axiosFetcher';
import {useAuth0} from '@auth0/auth0-react';
import {format} from 'date-fns';

//TODO:Why the empty interface?
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TeamMembersDataGridProps {}

export const TeamMembersDataGrid = (props: TeamMembersDataGridProps) => {
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

  const {
    data,
    error,
    isLoading,
  }: { data: any; error: any; isLoading: boolean } = useSWR(
    getOrgURL(),
    axiosFetcher,
    {
      revalidateOnFocus: false,
    },
  );

  const getActions = (user: any) => {
    if (user.status === 'invited') {
      return [
        {
          name: 'resend invite',
          label: 'Resend Invite',
          url: '/organizations/invitation',
          method: 'PATCH',
          data: {
            org_id: data.org_id,
            user_email: user.email,
            inviter_name: dataGridUser?.name,
            roleId: ['company:admin'],
          },
          type: 'button',
          toastMessage: {
            success: 'Invite resent',
            fail: 'Invite resend failed',
          },
        },
        {
          name: 'cancel invite',
          label: 'Cancel Invite',
          url: '/organizations/invitation',
          method: 'DELETE',
          data: {
            org_id: data.org_id,
            user_email: user.email,
          },
          type: 'button',
          toastMessage: {
            success: 'Invite cancelled',
            fail: 'Invite cancellation failed',
          },
        },
      ];
    } else if (user.roles === 'company:owner') {
      return [];
    } else if (user.roles === 'company:admin') {
      return [
        {
          label: 'Delete Member',
          name: 'delete member',
          title: 'Delete Member',
          body: `Are you sure you want to delete ${user.name}?\n\nOnce confirmed, this action cannot be undone.`,
          footer: {
            resolveButton: {
              label: 'Delete',
              color: ColorNames.red,
              size: GlobalSizes.small,
              rounded: true,
            },
            rejectButton: {
              label: 'Cancel',
              color: ColorNames.jetBlack,
              size: GlobalSizes.small,
              rounded: true,
            },
          },
          url: `/organizations/${data.org_id}/member`,
          method: 'DELETE',
          data: {
            members: user.identities,
          },
          type: 'modal',
          toastMessage: {
            success: 'Member deleted',
            fail: 'Member deletion failed',
          },
        },
        {
          label: 'Make Owner',
          name: 'make owner',
          title: `Change Owner of ${data.name}`,
          body: `There can only be one owner for ${data.name}.\n\nBy making this member the owner you will give up your permission as owner. Are you sure you want to make ${user.name} the owner?`,
          footer: {
            resolveButton: {
              label: 'Confirm',
              color: ColorNames.primary,
              size: GlobalSizes.small,
              rounded: true,
            },
            rejectButton: {
              label: 'Cancel',
              color: ColorNames.jetBlack,
              size: GlobalSizes.small,
              rounded: true,
            },
          },
          urls: user.identities.map((identity: string) => {
            return `/organizations/${data?.org_id}/members/${identity}/role/company:owner`;
          }),
          method: 'POST',
          type: 'modal',
          toastMessage: {
            success: 'Owner changed',
            fail: 'Owner change failed',
          },
        },
      ];
    } else {
      return [];
    }
  };

  const getRole = (user: any) => {
    if (user.roles === 'company:owner') {
      return 'Owner';
    } else if (user.roles === 'company:admin') {
      return 'Admin';
    } else if (user.roles === 'company:member') {
      return 'Member';
    } else if (user.roles === 'cold:admin') {
      return 'Cold Admin';
    } else {
      return '';
    }
  };

  const getUserStatus = (user: any) => {
    if (user.status === 'invited') {
      return 'Invited: ' + format(new Date(user.invited_at), 'MMM. dd');
    } else {
      return startCase(user.status);
    }
  };

  const getTransformedData = (data: any[]) => {
    return orderBy(data, ['email'], ['asc']).map((user) => {
      return {
        picture: <Avatar size={GlobalSizes.medium} user={user} circle={true} />,
        name: <TeamMemberName user={user} />,
        role: getRole(user),
        status: getUserStatus(user),
        actions: getActions(user),
      };
    });
  };

  if (error) {
    return <div>Failed to load</div>;
  }

  if (isLoading) {
    return (
      <div className="w-full h-full grid content-center">
        <Spinner size={GlobalSizes.medium} color={ColorNames.primary} />
      </div>
    );
  }

  if (data && data.members && dataGridUser) {
    return (
      <Datagrid
        items={getTransformedData(data.members)}
        definitionURL={'/form-definitions/team_member_table'}
      />
    );
  } else {
    return <></>;
  }
};
