import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { OrgRolesService } from '../roles/roles.service';

describe('MembersController', () => {
  let controller: MembersController;

  const members = {
    getOrganizationMembers: jest.fn(),
    addUserToOrganization: jest.fn(),
    removeUserFromOrganization: jest.fn(),
  };

  const roles = {
    getOrgUserRoles: jest.fn(),
  };

  const req = { user: { id: 'u1' }, organization: { id: 'o1' } } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new MembersController(members as unknown as MembersService, roles as unknown as OrgRolesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getOrgMembers throws when orgId missing', () => {
    expect(() => controller.getOrgMembers('', req, false)).toThrow('orgId is required');
  });

  it('getOrgMembers delegates to members service', () => {
    members.getOrganizationMembers.mockReturnValue('ok');

    expect(controller.getOrgMembers('org1', req, true)).toBe('ok');
    expect(members.getOrganizationMembers).toHaveBeenCalledWith('org1', req, true);
  });

  it('getOrgUsersRoles delegates to roles service', () => {
    roles.getOrgUserRoles.mockReturnValue('ok');

    expect(controller.getOrgUsersRoles(req, 'org1', 'user1', true)).toBe('ok');
    expect(roles.getOrgUserRoles).toHaveBeenCalledWith('org1', 'user1', req, true);
  });

  it('addMemberToOrganizationAndRole delegates to members service', async () => {
    members.addUserToOrganization.mockResolvedValue('ok');

    await expect(controller.addMemberToOrganizationAndRole('org1', 'Admin', 'user1', req, false)).resolves.toBe('ok');
    expect(members.addUserToOrganization).toHaveBeenCalledWith('org1', 'user1', req, 'Admin', false);
  });

  it('removeMembers delegates to members service', async () => {
    members.removeUserFromOrganization.mockResolvedValue('ok');
    const body = { members: ['user1'] };

    await expect(controller.removeMembers('org1', body, req)).resolves.toBe('ok');
    expect(members.removeUserFromOrganization).toHaveBeenCalledWith('org1', body, req);
  });
});
