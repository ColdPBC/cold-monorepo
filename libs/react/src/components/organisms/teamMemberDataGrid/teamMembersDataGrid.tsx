import {Datagrid} from '../../molecules/dataGrid/datagrid';
import useSWR from 'swr';
import {GlobalSizes} from '../../../enums/sizes';
import {Spinner} from '../../atoms/spinner/spinner';
import {ColorNames} from '../../../enums/colors';
import {orderBy, startCase} from 'lodash';
import {Avatar} from '../../atoms/avatar/avatar';
import {axiosFetcher} from '../../../fetchers/axiosFetcher';
import {useAuth0} from '@auth0/auth0-react';
import {format} from 'date-fns';
import { ButtonTypes } from '@coldpbc/enums';
import { MemberStatusType } from '../../pages';

export interface TeamMembersDataGridProps {
  selectedMemberStatusType: MemberStatusType;
}

export const TeamMembersDataGrid = ({ selectedMemberStatusType }: TeamMembersDataGridProps) => {
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
          label: 'Remove User',
          name: 'delete member',
          title: 'Remove User',
          body: (
            <span>
              Are you sure you want to remove <span className='font-bold'>{user.name}</span> from your company?
            </span>
          ),
          footer: {
            resolveButton: {
              label: 'Remove User',
              variant: ButtonTypes.warning
            },
            rejectButton: {
              label: 'Cancel',
              variant: ButtonTypes.secondary
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
          label: 'Transfer Ownership',
          name: 'make owner',
          title:'Transfer Ownership',
          body: (
            <span>
              There can only be one owner for {data.name}
              <br /><br />
              By making this member the owner you will give up your permission as owner.
              Are you sure you want to make <span className='font-bold'>{user.name}</span> the owner?
            </span>
          ),
          footer: {
            resolveButton: {
              label: 'Transfer Ownership',
            },
            rejectButton: {
              label: 'Cancel',
              variant: ButtonTypes.secondary
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

  const getTransformedData = (data: any[]) => {
    return orderBy(data, ['email'], ['asc'])
      .filter(user => (user.status === 'invited' && selectedMemberStatusType === 'Invitations')
        || (selectedMemberStatusType === 'Members' && user.status !== 'invited'))
      .map((user) => {
        return {
          name: (
            <div className='flex items-center'>
              <span className='mr-4'>
                <Avatar size={GlobalSizes.medium} user={user} />
              </span>
              <span className='text-white font-bold text-sm leading-normal'>{user.name}</span>
            </div>
          ),
          email: <span className='text-white font-medium text-sm leading-normal'>{user.email}</span>,
          role: <span className='text-white font-medium text-sm leading-normal'>{getRole(user)}</span>,
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
