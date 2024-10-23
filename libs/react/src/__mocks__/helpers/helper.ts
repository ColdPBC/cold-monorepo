import { mutate } from 'swr';
import { cloneDeep, includes, isEqual } from 'lodash';
import { formatISO } from 'date-fns';

export const changeUserRoles = (orgId: string, userId: string, roleName: string) => {
	return mutate(
		[`/organizations/${orgId}/members`, 'GET'],
		memberData => ({
			...memberData,
			members: cloneDeep(memberData.members).map((member: any) => {
				if (roleName == 'company:owner') {
					if (member.roles === 'company:owner' && !includes(member.identities, userId)) {
						member.roles = 'company:admin';
					}
				}
				if (includes(member.identities, userId)) {
					member.roles = roleName;
				}
				return member;
			}),
		}),
		{
			revalidate: false,
		},
	);
};

export const removeUserFromOrganization = (members: string[], orgId: string) => {
	return mutate(
		[`/organizations/${orgId}/members`, 'GET'],
		memberData => ({
			...memberData,
			members: cloneDeep(memberData.members).filter((member: any) => {
				return !isEqual(members, member.identities);
			}),
		}),
		{
			revalidate: false,
		},
	);
};

export const deleteUserInvitation = (org_id: string, user_email: string) => {
	mutate(
		[`/organizations/${org_id}/members`, 'GET'],
		memberData => ({
			...memberData,
			members: cloneDeep(memberData.members).filter((member: any) => {
				return !isEqual(user_email, member.email);
			}),
		}),
		{
			revalidate: false,
		},
	);
};

export const resendInvitation = async (org_id: string, user_email: string) => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	return mutate(
		[`/organizations/${org_id}/members`, 'GET'],
		memberData => ({
			...memberData,
			members: cloneDeep(memberData.members).map((member: any) => {
				if (member.email === user_email) {
					member.invited_at = formatISO(today);
				}
				return member;
			}),
		}),
		{
			revalidate: false,
		},
	);
};

export const sendInvitation = async (org_id: string, user_email: string, inviter_name: string, roleId: string) => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const newMember = {
		email: user_email,
		invited_at: formatISO(today),
		inviter_name: inviter_name,
		status: 'invited',
		roles: roleId,
		identities: ['google-oauth2|4'],
		name: 'John Smith',
		given_name: 'John',
		family_name: 'Smith',
	};
	return mutate(
		[`/organizations/${org_id}/members`, 'GET'],
		memberData => ({
			...memberData,
			// @ts-ignore
			members: () => {
				if (memberData.members) {
					cloneDeep(memberData.members).concat(newMember);
				} else {
					return [newMember];
				}
			},
		}),
		{
			revalidate: false,
		},
	);
};
