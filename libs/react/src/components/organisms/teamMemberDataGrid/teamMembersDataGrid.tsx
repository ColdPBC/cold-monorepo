import { Datagrid } from '../../molecules/dataGrid/datagrid';
import useSWR from 'swr';
import { GlobalSizes } from '../../../enums/sizes';
import { Spinner } from '../../atoms/spinner/spinner';
import { ColorNames } from '../../../enums/colors';
import { orderBy } from 'lodash';
import { Avatar } from '../../atoms/avatar/avatar';
import { axiosFetcher } from '../../../fetchers/axiosFetcher';
import { useAuth0 } from '@auth0/auth0-react';
import { ButtonTypes } from '@coldpbc/enums';
import { MemberStatusType } from '../../pages';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';

export interface TeamMembersDataGridProps {
  selectedMemberStatusType: MemberStatusType;
}

export const _TeamMembersDataGrid = ({
  selectedMemberStatusType,
}: TeamMembersDataGridProps) => {
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
    // TODO: remove empty array after actions are refactored for new data structure
    return [];
    if (user.invitee) {
      return [
        {
          name: 'resend invite',
          label: 'Resend Invite',
          url: `/organizations/${data.org_id}/invitation`,
          method: 'PATCH',
          data: {
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
          url: `/organizations/${data.org_id}/invitation`,
          method: 'DELETE',
          data: {
            user_email: user.email,
          },
          type: 'button',
          toastMessage: {
            success: 'Invite cancelled',
            fail: 'Invite cancellation failed',
          },
        },
      ];
    } else if (user.role === 'company:owner') {
      return [];
    } else if (user.role === 'company:admin') {
      return [
        {
          label: 'Remove User',
          name: 'delete member',
          title: 'Remove User',
          body: (
            <span>
              Are you sure you want to remove{' '}
              <span className="font-bold">{user.name}</span> from your company?
            </span>
          ),
          footer: {
            resolveButton: {
              label: 'Remove User',
              variant: ButtonTypes.warning,
            },
            rejectButton: {
              label: 'Cancel',
              variant: ButtonTypes.secondary,
            },
          },
          url: `/organizations/${data.org_id}/member`,
          method: 'DELETE',
          data,
          type: 'modal',
          toastMessage: {
            success: 'Member deleted',
            fail: 'Member deletion failed',
          },
        },
        {
          label: 'Transfer Ownership',
          name: 'make owner',
          title: 'Transfer Ownership',
          body: (
            <span>
              There can only be one owner for {data.name}
              <br />
              <br />
              By making this member the owner you will give up your permission
              as owner. Are you sure you want to make{' '}
              <span className="font-bold">{user.name}</span> the owner?
            </span>
          ),
          footer: {
            resolveButton: {
              label: 'Transfer Ownership',
            },
            rejectButton: {
              label: 'Cancel',
              variant: ButtonTypes.secondary,
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
    if (user.role === 'company:owner') {
      return 'Owner';
    } else if (user.role === 'company:admin') {
      return 'Admin';
    } else if (user.role === 'company:member') {
      return 'Member';
    } else if (user.role === 'cold:admin') {
      return 'Cold Admin';
    } else {
      return '';
    }
  };

  const getTransformedData = (data: any[]) => {
    return orderBy(data, ['email'], ['asc'])
      .filter(
        (user) =>
          (user.invitee && selectedMemberStatusType === 'Invitations') ||
          (selectedMemberStatusType === 'Members' && !user.invitee),
      )
      .map((user) => {
        return {
          name: (
            <div className="flex items-center">
              <span className="mr-4">
                <Avatar size={GlobalSizes.medium} user={user} />
              </span>
              <span className="text-white font-bold text-sm leading-normal">
                {user.name}
              </span>
            </div>
          ),
          email: (
            <span className="text-white font-medium text-sm leading-normal">
              {user.email}
            </span>
          ),
          role: (
            <span className="text-white font-medium text-sm leading-normal">
              {getRole(user)}
            </span>
          ),
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

  if (data && dataGridUser) {
    return (
      <Datagrid
        items={getTransformedData(data?.members ?? [])}
        definitionURL={'/components/team_member_table'}
      />
    );
  } else {
    return <></>;
  }
};

export const TeamMembersDataGrid = withErrorBoundary(_TeamMembersDataGrid, {
  FallbackComponent: (props) => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in TeamMembersDataGrid: ', error);
  },
});
