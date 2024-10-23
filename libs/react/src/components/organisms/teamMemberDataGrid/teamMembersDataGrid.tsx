import { Datagrid } from '../../molecules/dataGrid/datagrid';
import { GlobalSizes } from '../../../enums/sizes';
import { Spinner } from '../../atoms/spinner/spinner';
import { ColorNames } from '../../../enums/colors';
import { orderBy } from 'lodash';
import { Avatar } from '../../atoms/avatar/avatar';
import { axiosFetcher } from '../../../fetchers/axiosFetcher';
import { User } from '@auth0/auth0-react';
import { ButtonTypes, ErrorType, InputTypes } from '@coldpbc/enums';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';
import { MemberStatusType, TableActionType } from '@coldpbc/interfaces';
import { useMemo } from 'react';
import { useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { getFormattedUserName } from '@coldpbc/lib';

export interface TeamMembersDataGridProps {
	selectedMemberStatusType: MemberStatusType;
}

export const _TeamMembersDataGrid = ({ selectedMemberStatusType }: TeamMembersDataGridProps) => {
	const { logError } = useColdContext();
	const auth0 = useAuth0Wrapper();

	const { data, error, isLoading, mutate } = useOrgSWR(['/members', 'GET'], axiosFetcher);

	const filterActions = (action: TableActionType) => {
		if (auth0.user?.coldclimate_claims.roles[0] === 'company:member') {
			return false;
		}
		return true;
	};

	const getActions = (user: User): TableActionType[] => {
		let actions: TableActionType[] = [];
		if (user.invitee) {
			actions = [
				{
					name: 'resend invite',
					label: 'Resend Invite',
					type: 'button',
					toastMessage: {
						success: 'Invite resending successfully',
						fail: 'Invite resending failed',
					},
					apiRequests: [
						{
							url: `/organizations/${auth0.user?.coldclimate_claims.org_id}/invitations/${user.id}`,
							method: 'DELETE',
						},
						{
							url: `/organizations/${auth0.user?.coldclimate_claims.org_id}/invitation`,
							method: 'POST',
							data: {
								user_email: user.email,
								inviter_name: getFormattedUserName(auth0.user),
								roleId: ['company:admin'],
							},
						},
					],
					mutate,
					actionObject: user,
				},
				{
					name: 'cancel invite',
					label: 'Cancel Invite',
					type: 'button',
					toastMessage: {
						success: 'Invite cancelled successfully',
						fail: 'Invite cancellation failed',
					},
					apiRequests: [
						{
							url: auth0.getOrgSpecificUrl(`/invitations/${user.id}`),
							method: 'DELETE',
						},
					],
					mutate,
					actionObject: user,
				},
			];
		} else if (user.role === 'company:admin') {
			actions = [
				{
					label: 'Remove User',
					name: 'remove user',
					modalProps: {
						header: {
							title: 'Remove User',
						},
						body: (
							<span>
								Are you sure you want to remove <span className="font-bold">{user.name}</span> from your company?
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
					},
					type: 'modal',
					toastMessage: {
						success: 'Member deleted',
						fail: 'Member deletion failed',
					},
					apiRequests: [
						{
							url: auth0.getOrgSpecificUrl(`/members`),
							method: 'DELETE',
							data: {
								members: [user.user_id],
							},
						},
					],
					mutate,
					actionObject: user,
				},
				{
					label: 'Update Role',
					name: 'update role',
					modalProps: {
						header: {
							title: 'Update Role',
						},
						body: <></>,
						footer: {
							resolveButton: {
								label: 'Update Role',
							},
							rejectButton: {
								label: 'Cancel',
								variant: ButtonTypes.secondary,
							},
						},
					},
					type: 'modal',
					toastMessage: {
						success: 'Role updated successfully',
						fail: 'Role update failed',
					},
					apiRequests: [
						{
							url: auth0.getOrgSpecificUrl(`/roles/:roleName/members/${user.user_id}`),
							method: 'PUT',
						},
					],
					mutate,
					actionObject: user,
				},
			];
		} else if (user.role === 'company:member') {
			actions = [
				{
					label: 'Remove User',
					name: 'remove user',
					modalProps: {
						header: {
							title: 'Remove User',
						},
						body: (
							<span>
								Are you sure you want to remove <span className="font-bold">{user.name}</span> from your company?
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
					},
					type: 'modal',
					toastMessage: {
						success: 'User removed successfully',
						fail: 'User removing failed',
					},
					apiRequests: [
						{
							url: auth0.getOrgSpecificUrl(`/members`),
							method: 'DELETE',
							data: {
								members: [user.user_id],
							},
						},
					],
					mutate,
					actionObject: user,
				},
				{
					label: 'Update Role',
					name: 'update role',
					modalProps: {
						header: {
							title: 'Update Role',
						},
						body: <></>,
						footer: {
							resolveButton: {
								label: 'Update Role',
							},
							rejectButton: {
								label: 'Cancel',
								variant: ButtonTypes.secondary,
							},
						},
					},
					type: 'modal',
					toastMessage: {
						success: 'Role updated successfully',
						fail: 'Role update failed',
					},
					apiRequests: [
						{
							url: auth0.getOrgSpecificUrl(`/roles/:roleName/members/${user.user_id}`),
							method: 'PUT',
						},
					],
					mutate,
					actionObject: user,
				},
			];
		}
		return actions;
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
			.filter(user => (user.invitee && selectedMemberStatusType === 'Invitations') || (selectedMemberStatusType === 'Members' && !user.invitee))
			.map(user => {
				return {
					name: (
						<div className="flex items-center">
							<span className="mr-4">
								<Avatar size={GlobalSizes.medium} user={user} />
							</span>
							<span className="text-white font-bold text-sm leading-normal">{user.name}</span>
						</div>
					),
					email: <span className="text-white font-medium text-sm leading-normal">{user.email}</span>,
					role: <span className="text-white font-medium text-sm leading-normal">{getRole(user)}</span>,
					actions: getActions(user).filter(filterActions),
				};
			});
	}, [data, selectedMemberStatusType]);

	if (error || auth0.error) {
		if (error) {
			logError(error, ErrorType.SWRError);
		}
		if (auth0.error) {
			logError(auth0.error, ErrorType.Auth0Error);
		}
		return null;
	}

	if (isLoading || auth0.isLoading) {
		return (
			<div className="w-full h-full grid content-center">
				<Spinner size={GlobalSizes.medium} color={ColorNames.primary} />
			</div>
		);
	}

	if (selectedMemberStatusType === 'Invitations' && transformedData.length === 0) {
		return <div className="flex items-center justify-center p-4 pb-8 w-full">No outstanding invitations</div>;
	}

	if (data && auth0.user) {
		return <Datagrid items={transformedData} definitionURL={'/components/team_member_table'} data-testid={'team-members-datagrid'} />;
	} else {
		return <></>;
	}
};

export const TeamMembersDataGrid = withErrorBoundary(_TeamMembersDataGrid, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in TeamMembersDataGrid: ', error);
	},
});
