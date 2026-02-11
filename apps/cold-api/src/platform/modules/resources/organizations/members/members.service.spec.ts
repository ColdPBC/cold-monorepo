import { HttpException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Auth0TokenService, CacheService, MqttService } from '@coldpbc/nest';
import { HttpService } from '@nestjs/axios';
import { MembersService } from './members.service';
import { OrganizationHelper } from '../helpers/organization.helper';
import { RoleService } from '../../auth0/roles/role.service';
import { MemberService } from '../../auth0/members/member.service';
import { OrgRolesService } from '../roles/roles.service';
import { InvitationsService } from '../invitations/invitations.service';

const makeReq = () => ({
  user: {
    isColdAdmin: false,
    coldclimate_claims: {
      org_id: 'org_1',
      email: 'tester@example.com',
    },
  },
  url: '/members',
} as any);

describe('MembersService', () => {
  let service: MembersService;

  const cache = {
    get: jest.fn(),
    set: jest.fn(),
  };

  const utilService = {
    init: jest.fn(),
  };

  const httpService = {
    axiosRef: {
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
    },
  };

  const helper = {
    getOrganizationById: jest.fn(),
  };

  const mqtt = {
    publishMQTT: jest.fn(),
  };

  const roleService = {
    resolveRoleNameById: jest.fn(),
  };

  const memberService = {
    getMemberByEmail: jest.fn(),
  };

  const orgRoles = {
    getOrgUserRoles: jest.fn(),
  };

  const invitations = {
    getOrgInvites: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    cache.get.mockResolvedValue(null);
    cache.set.mockResolvedValue(undefined);
    utilService.init.mockResolvedValue({ headers: { authorization: 'Bearer token' } });
    helper.getOrganizationById.mockResolvedValue({ id: 'org_1', name: 'Org One' });
    invitations.getOrgInvites.mockResolvedValue({ data: [] });
    httpService.axiosRef.get.mockResolvedValue({ data: [] });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembersService,
        { provide: CacheService, useValue: cache },
        { provide: Auth0TokenService, useValue: utilService },
        { provide: HttpService, useValue: httpService },
        { provide: OrganizationHelper, useValue: helper },
        { provide: MqttService, useValue: mqtt },
        { provide: RoleService, useValue: roleService },
        { provide: MemberService, useValue: memberService },
        { provide: OrgRolesService, useValue: orgRoles },
        { provide: InvitationsService, useValue: invitations },
      ],
    }).compile();

    service = module.get<MembersService>(MembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('OnModuleInit stores auth options', async () => {
    await service.OnModuleInit();

    expect(utilService.init).toHaveBeenCalled();
    expect(service.options).toEqual({ headers: { authorization: 'Bearer token' } });
  });

  it('transformInvitee resolves array role IDs and copies invitee metadata', async () => {
    roleService.resolveRoleNameById.mockResolvedValue('company:member');
    const invite = {
      invitee: { email: 'invitee@x.com' },
      created_at: '2025-01-01',
      roles: ['rol_abc', 'company:admin'],
    } as any;

    const result = await service.transformInvitee(invite);

    expect(result.email).toBe('invitee@x.com');
    expect(result.invited_at).toBe('2025-01-01');
    expect(result.roles).toEqual(['company:member', 'company:admin']);
  });

  it('transformInvitee resolves scalar role IDs', async () => {
    roleService.resolveRoleNameById.mockResolvedValue('company:admin');

    const result = await service.transformInvitee({ invitee: { email: 'a' }, created_at: 'x', roles: 'rol_xyz' } as any);

    expect(result.roles).toBe('company:admin');
  });

  it('getOrganizationMembers returns cached value when available', async () => {
    const cached = { id: 'org_1', members: [{ id: 'cached' }] };
    cache.get.mockResolvedValue(cached);

    const out = await service.getOrganizationMembers('org_1', makeReq());

    expect(out).toBe(cached);
    expect(httpService.axiosRef.get).not.toHaveBeenCalled();
  });

  it('getOrganizationMembers hydrates members and invitees and caches result', async () => {
    httpService.axiosRef.get.mockResolvedValue({
      data: [{ user_id: 'auth0|u1', email: 'u1@example.com' }],
    });
    memberService.getMemberByEmail.mockResolvedValue({ picture: 'p.png', name: 'U1' });
    orgRoles.getOrgUserRoles.mockResolvedValue([{ name: 'company:admin' }, { name: 'company:member' }]);
    invitations.getOrgInvites.mockResolvedValue({
      data: {
        invitee: { email: 'pending@example.com' },
        created_at: '2024-01-01',
        roles: 'rol_pending',
      },
    });
    roleService.resolveRoleNameById.mockResolvedValue('company:member');

    const out: any = await service.getOrganizationMembers('org_1', makeReq(), true);

    expect(memberService.getMemberByEmail).toHaveBeenCalledWith('u1@example.com', expect.any(Object), true, true);
    expect(orgRoles.getOrgUserRoles).toHaveBeenCalledWith('org_1', 'auth0|u1', expect.any(Object), true);
    expect(out.members).toHaveLength(2);
    expect(out.members[0].role).toBe('company:admin');
    expect(out.members[1].email).toBe('pending@example.com');
    expect(cache.set).toHaveBeenCalledWith('organizations:org_1:members', expect.any(Object), expect.objectContaining({ update: true }));
  });

  it('getOrganizationMembers handles auth0 404 on members endpoint by continuing', async () => {
    const err = { response: { status: 404 }, message: 'missing members' };
    httpService.axiosRef.get.mockRejectedValue(err);

    const out: any = await service.getOrganizationMembers('org_1', makeReq(), true);

    expect(out.members).toEqual([]);
    expect(invitations.getOrgInvites).toHaveBeenCalled();
  });

  it('getOrganizationMembers throws NotFoundException on non-404 members endpoint error', async () => {
    const err = { response: { status: 500 }, message: 'boom' };
    httpService.axiosRef.get.mockRejectedValue(err);

    await expect(service.getOrganizationMembers('org_1', makeReq(), true)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('getOrganizationMembers rethrows axios error response from outer catch', async () => {
    const axiosErr = {
      isAxiosError: true,
      response: { data: { message: 'bad gateway' }, status: 502 },
      message: 'gateway',
      toJSON: () => ({}),
    } as any;
    helper.getOrganizationById.mockRejectedValue(axiosErr);

    await expect(service.getOrganizationMembers('org_1', makeReq(), true)).rejects.toEqual(axiosErr.response);
  });

  it('getOrganizationMembers converts unknown errors to UnprocessableEntityException', async () => {
    helper.getOrganizationById.mockRejectedValue(new Error('unexpected'));

    await expect(service.getOrganizationMembers('org_1', makeReq(), true)).rejects.toBeInstanceOf(UnprocessableEntityException);
  });

  it('addUserToOrganization posts member and refreshes members list', async () => {
    httpService.axiosRef.post.mockResolvedValue({});
    const refreshed = { id: 'org_1', members: [] };
    const spy = jest.spyOn(service, 'getOrganizationMembers').mockResolvedValue(refreshed as any);

    const out = await service.addUserToOrganization('org_1', 'auth0|u2', makeReq(), 'company:member', true);

    expect(httpService.axiosRef.post).toHaveBeenCalledWith('/organizations/org_1/members', { members: ['auth0|u2'] }, expect.any(Object));
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('ui', expect.objectContaining({ action: 'create', status: 'complete' }));
    expect(spy).toHaveBeenCalledWith('org_1', expect.any(Object), true);
    expect(out).toBe(refreshed);
  });

  it('addUserToOrganization maps axios errors to UnprocessableEntityException', async () => {
    const err = {
      isAxiosError: true,
      response: { data: { message: 'cannot add' } },
      message: 'cannot add',
      toJSON: () => ({}),
    } as any;
    httpService.axiosRef.post.mockRejectedValue(err);

    await expect(service.addUserToOrganization('org_1', 'auth0|u2', makeReq(), 'company:member', true)).rejects.toBeInstanceOf(
      UnprocessableEntityException,
    );

    expect(mqtt.publishMQTT).toHaveBeenCalledWith('ui', expect.objectContaining({ action: 'create', status: 'failed' }));
  });

  it('addUserToOrganization maps non-axios errors to UnprocessableEntityException', async () => {
    httpService.axiosRef.post.mockRejectedValue(new Error('offline'));

    await expect(service.addUserToOrganization('org_1', 'auth0|u2', makeReq(), 'company:member', true)).rejects.toBeInstanceOf(
      UnprocessableEntityException,
    );
  });

  it('removeUserFromOrganization rejects unauthorized callers', async () => {
    const req = makeReq();

    await expect(service.removeUserFromOrganization('org_other', { members: ['auth0|u1'] }, req)).rejects.toBeInstanceOf(HttpException);
  });

  it('removeUserFromOrganization deletes users and throws 204 completion exception', async () => {
    const req = makeReq();
    jest.spyOn(service, 'getOrganizationMembers').mockResolvedValue({ id: 'org_1', members: [] } as any);
    httpService.axiosRef.delete
      .mockResolvedValueOnce({})
      .mockResolvedValueOnce({ config: { data: JSON.stringify({ members: ['auth0|u1'] }) } });

    await expect(service.removeUserFromOrganization('org_1', { members: ['auth0|u1'] }, req)).rejects.toMatchObject({ status: 204 });

    expect(mqtt.publishMQTT).toHaveBeenCalledWith('ui', expect.objectContaining({ action: 'delete', status: 'complete' }));
  });

  it('removeUserFromOrganization rethrows status-204 errors from catch', async () => {
    const req = makeReq();
    const completed = new HttpException('done', 204);
    httpService.axiosRef.delete.mockRejectedValue(completed);

    await expect(service.removeUserFromOrganization('org_1', { members: ['auth0|u1'] }, req)).rejects.toBe(completed);
  });

  it('removeUserFromOrganization maps axios 404 to NotFoundException', async () => {
    const req = makeReq();
    httpService.axiosRef.delete.mockRejectedValue({
      isAxiosError: true,
      response: { data: { statusCode: 404, message: 'not found' } },
      message: 'not found',
      toJSON: () => ({}),
    });

    await expect(service.removeUserFromOrganization('org_1', { members: ['auth0|u1'] }, req)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('removeUserFromOrganization maps axios non-404 to UnprocessableEntityException', async () => {
    const req = makeReq();
    httpService.axiosRef.delete.mockRejectedValue({
      isAxiosError: true,
      response: { data: { statusCode: 400, message: 'bad request' } },
      message: 'bad request',
      toJSON: () => ({}),
    });

    await expect(service.removeUserFromOrganization('org_1', { members: ['auth0|u1'] }, req)).rejects.toBeInstanceOf(
      UnprocessableEntityException,
    );
  });

  it('removeUserFromOrganization maps non-axios errors to UnprocessableEntityException', async () => {
    const req = makeReq();
    httpService.axiosRef.delete.mockRejectedValue(new Error('db down'));

    await expect(service.removeUserFromOrganization('org_1', { members: ['auth0|u1'] }, req)).rejects.toBeInstanceOf(
      UnprocessableEntityException,
    );

    expect(mqtt.publishMQTT).toHaveBeenCalledWith('ui', expect.objectContaining({ action: 'delete', status: 'failed' }));
  });
});
