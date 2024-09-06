import { getOrganizationMembersMock } from './datagridMock';

export function getMembersNoInvitations() {
  const membersMock = { ...getOrganizationMembersMock() };
  return {
    ...membersMock,
    members: membersMock?.members.filter(member => !member.invitee),
  };
}
