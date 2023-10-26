import { Datagrid } from '../../molecules/dataGrid/datagrid';
import { GlobalSizes } from '../../../enums/sizes';
import { Spinner } from '../../atoms/spinner/spinner';
import { ColorNames } from '../../../enums/colors';
import { orderBy } from 'lodash';
import { Avatar } from '../../atoms/avatar/avatar';
import { axiosFetcher } from '../../../fetchers/axiosFetcher';
import { User } from '@auth0/auth0-react';
import { ButtonTypes } from '@coldpbc/enums';
import { MemberStatusType } from '../../pages';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';
import { TableActionType } from '@coldpbc/interfaces';
import { useEffect, useMemo } from 'react';
import { useAuth0Wrapper } from '@coldpbc/hooks';
import { useOrgSWR } from '../../../hooks';
import { getOrganizationMembersMock } from '@coldpbc/mocks';

export interface TeamMembersDataGridProps {
  selectedMemberStatusType: MemberStatusType;
}

export const _TeamMembersDataGrid = ({
  selectedMemberStatusType,
}: TeamMembersDataGridProps) => {
  const { user: dataGridUser, getOrgSpecificUrl } = useAuth0Wrapper();

  const {
    data,
    error,
    isLoading,
    mutate,
  }: { data: any; error: any; isLoading: boolean } = useOrgSWR(
    ['/members', 'GET'],
    axiosFetcher,
    {
      revalidateOnFocus: false,
    },
  );

  const getActions = (user: User): TableActionType[] => {
    if (user.invitee) {
      return [
        {
          name: 'resend invite',
          label: 'Resend Invite',
          type: 'button',
          toastMessage: {
            success: 'Invite resent',
            fail: 'Invite resend failed',
          },
          apiRequests: [
            {
              url: `/organizations/${dataGridUser?.coldclimate_claims.org_id}/invitations/${user.id}`,
              method: 'DELETE',
            },
            {
              url: `/organizations/${dataGridUser?.coldclimate_claims.org_id}/invitation`,
              method: 'POST',
              data: {
                user_email: user.email,
                inviter_name: dataGridUser?.name,
                roleId: ['company:admin'],
              },
            }
          ]
        },
        {
          name: 'cancel invite',
          label: 'Cancel Invite',
          type: 'button',
          toastMessage: {
            success: 'Invite cancelled',
            fail: 'Invite cancellation failed',
          },
          apiRequests: [
            {
              url: getOrgSpecificUrl(`/invitations/${user.id}`),
              method: 'DELETE',
            },
          ]
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
          type: 'modal',
          toastMessage: {
            success: 'Member deleted',
            fail: 'Member deletion failed',
          },
          apiRequests: [
            {
              url: getOrgSpecificUrl(`/members`),
              method: 'DELETE',
              data: {
                members: [user.user_id]
              },
            }
          ]
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
          type: 'modal',
          toastMessage: {
            success: 'Owner changed',
            fail: 'Owner change failed',
          },
          apiRequests: [
            {
              url: getOrgSpecificUrl(`/roles/company:admin/members/${dataGridUser?.user_id}`),
              method: 'PUT'
            },
            {
              url: getOrgSpecificUrl(`/roles/company:owner/members/${user.user_id}`),
              method: 'PUT'
            }
          ]
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

  const transformedData = useMemo(() => {
    return orderBy(data?.members, ['email'], ['asc'])
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
  }, [data, dataGridUser, selectedMemberStatusType]);

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

  const transformedData = getTransformedData(data?.members ?? []);

  if (selectedMemberStatusType === 'Invitations' && transformedData.length === 0) {
    return (<div className='flex items-center justify-center p-4 pb-8 w-full'>No outstanding invitations</div>);
  }

  if (data && dataGridUser) {
    return (
      <Datagrid
        items={transformedData}
        definitionURL={'/components/team_member_table'}
      />
    );
  } else {
    return <></>;
  }
};

export const TeamMembersDataGrid = withErrorBoundary(_TeamMembersDataGrid, {
  FallbackComponent: (props) => <ErrorFallback />,
  onError: (error, info) => {
    console.error('Error occurred in TeamMembersDataGrid: ', error);
  },
});
