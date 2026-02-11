import { NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { MemberService } from './member.service';
import { Auth0TokenService, CacheService, MqttService } from '@coldpbc/nest';

describe('Auth0MemberService', () => {
  let memberService: MemberService;

  const utilService = {
    init: jest.fn(),
    options: { headers: { authorization: 'Bearer token' } },
  } as unknown as Auth0TokenService;

  const cacheService = {
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  } as unknown as CacheService;

  const mqtt = {
    publishMQTT: jest.fn(),
  } as unknown as MqttService;

  const axiosRef = {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  };

  const req = {
    url: '/members',
    organization: { id: 'org_1' },
    user: {
      sub: 'auth0|123',
      isColdAdmin: false,
      coldclimate_claims: {
        email: 'user@example.com',
        org_id: 'org_1',
      },
    },
  } as any;

  const newUser = {
    email: 'test@user.com',
    given_name: 'test',
    family_name: 'user',
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    axiosRef.get.mockReset();
    axiosRef.post.mockReset();
    axiosRef.patch.mockReset();
    axiosRef.delete.mockReset();
    memberService = new MemberService(utilService, cacheService, mqtt);
    memberService['httpService'] = { axiosRef } as any;
    utilService['options'] = { headers: { authorization: 'Bearer token' } } as any;
    utilService.init = jest.fn().mockResolvedValue(utilService['options']);
    cacheService.get = jest.fn().mockResolvedValue(undefined);
    cacheService.set = jest.fn().mockResolvedValue(undefined);
    cacheService.delete = jest.fn().mockResolvedValue(undefined);
  });

  it('should be defined', () => {
    expect(memberService).toBeDefined();
  });

  it('getMemberByEmail throws unauthorized when non-admin requests different email', async () => {
    await expect(memberService.getMemberByEmail('other@example.com', req, false)).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('getMemberByEmail returns cached member when present and not bpc', async () => {
    cacheService.get = jest.fn().mockResolvedValue({ user_id: 'auth0|cached' });

    await expect(memberService.getMemberByEmail('user@example.com', req, false)).resolves.toEqual({ user_id: 'auth0|cached' });
    expect(axiosRef.get).not.toHaveBeenCalled();
  });

  it('getMemberByEmail fetches from auth0 and caches result', async () => {
    const plusReq = {
      ...req,
      user: {
        ...req.user,
        coldclimate_claims: { ...req.user.coldclimate_claims, email: 'user+foo@example.com' },
      },
    } as any;
    axiosRef.get.mockResolvedValue({ data: [{ user_id: 'auth0|123', email: 'user+foo@example.com' }] });

    const result = await memberService.getMemberByEmail('user+foo@example.com', plusReq, false);

    expect(result).toEqual({ user_id: 'auth0|123', email: 'user+foo@example.com' });
    expect(axiosRef.get).toHaveBeenCalledWith('/users-by-email?email=user%2Bfoo@example.com', utilService['options']);
    expect(cacheService.delete).toHaveBeenCalledWith('organizations:org_1:members:user%2Bfoo@example.com');
    expect(cacheService.delete).toHaveBeenCalledWith('organizations:org_1:members');
    expect(cacheService.set).toHaveBeenCalled();
  });

  it('getMemberByEmail throws not found when response is empty', async () => {
    axiosRef.get.mockResolvedValue({ data: [] });

    await expect(memberService.getMemberByEmail('user@example.com', req, true)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('getMemberByEmail maps 404 statusCode errors to not found', async () => {
    axiosRef.get.mockRejectedValue({ statusCode: 404, response: { statusCode: 404 } });

    await expect(memberService.getMemberByEmail('user@example.com', req, true)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('getMemberByEmail maps response.data statusCode 404 to not found', async () => {
    axiosRef.get.mockRejectedValue({ response: { data: { statusCode: 404 }, statusCode: 500 } });

    await expect(memberService.getMemberByEmail('user@example.com', req, true)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('getMemberByEmail throws unprocessable when response.data exists', async () => {
    axiosRef.get.mockRejectedValue({ response: { data: { statusCode: 422, message: 'bad' } } });

    await expect(memberService.getMemberByEmail('user@example.com', req, true)).rejects.toBeInstanceOf(UnprocessableEntityException);
  });

  it('getMemberByEmail throws unprocessable for generic errors', async () => {
    axiosRef.get.mockRejectedValue({ message: 'boom', response: {} });

    await expect(memberService.getMemberByEmail('user@example.com', req, true)).rejects.toBeInstanceOf(UnprocessableEntityException);
  });

  it('getMembers returns data', async () => {
    axiosRef.get.mockResolvedValue({ data: [{ user_id: 'auth0|1' }] });

    await expect(memberService.getMembers()).resolves.toEqual([{ user_id: 'auth0|1' }]);
    expect(axiosRef.get).toHaveBeenCalledWith('/users', utilService['options']);
  });

  it('getMembers returns response data on error', async () => {
    axiosRef.get.mockRejectedValue({ response: { data: { error: 'down' } } });

    await expect(memberService.getMembers()).resolves.toEqual({ error: 'down' });
  });

  it('updateUserRoles resolves role and posts users', async () => {
    axiosRef.get.mockResolvedValue({ data: [{ id: 'role_1', name: 'Admin' }] });
    axiosRef.post.mockResolvedValue({ data: { ok: true } });

    await expect(memberService.updateUserRoles('Admin', ['auth0|1'])).resolves.toEqual({ ok: true });
    expect(axiosRef.post).toHaveBeenCalledWith('/roles/role_1/users', { users: ['auth0|1'] }, utilService['options']);
  });

  it('updateUserRoles returns response data on error', async () => {
    axiosRef.get.mockResolvedValue({ data: [{ id: 'role_1', name: 'Admin' }] });
    axiosRef.post.mockRejectedValue({ response: { data: { error: 'bad role' } } });

    await expect(memberService.updateUserRoles('Admin', ['auth0|1'])).resolves.toEqual({ error: 'bad role' });
  });

  it('getRoles returns role list', async () => {
    axiosRef.get.mockResolvedValue({ data: [{ id: 'r1' }] });

    await expect(memberService.getRoles()).resolves.toEqual([{ id: 'r1' }]);
    expect(axiosRef.get).toHaveBeenCalledWith('/roles', utilService['options']);
  });

  it('getRoles returns response data on error', async () => {
    axiosRef.get.mockRejectedValue({ response: { data: { error: 'no roles' } } });

    await expect(memberService.getRoles()).resolves.toEqual({ error: 'no roles' });
  });

  it('deleteUser returns delete response', async () => {
    axiosRef.delete.mockResolvedValue({ data: { deleted: true } });

    await expect(memberService.deleteUser('auth0|123')).resolves.toEqual({ deleted: true });
    expect(axiosRef.delete).toHaveBeenCalledWith('/users/auth0|123', utilService['options']);
  });

  it('deleteUser returns response data on error', async () => {
    axiosRef.delete.mockRejectedValue({ response: { data: { error: 'cannot delete' } } });

    await expect(memberService.deleteUser('auth0|123')).resolves.toEqual({ error: 'cannot delete' });
  });

  it('resolveRoleByName returns first matching role', async () => {
    axiosRef.get.mockResolvedValue({ data: [{ id: 'r1', name: 'Member' }, { id: 'r2', name: 'Admin' }] });

    await expect(memberService.resolveRoleByName('Admin')).resolves.toEqual({ id: 'r2', name: 'Admin' });
  });

  it('resolveRoleByName returns response data on error', async () => {
    axiosRef.get.mockRejectedValue({ response: { data: { error: 'roles error' } } });

    await expect(memberService.resolveRoleByName('Admin')).resolves.toEqual({ error: 'roles error' });
  });

  it('createMember posts user and publishes complete mqtt event', async () => {
    axiosRef.post.mockResolvedValue({ data: { user_id: 'auth0|999' } });

    await expect(memberService.createMember(req, newUser)).resolves.toEqual({ user_id: 'auth0|999' });
    expect(axiosRef.post).toHaveBeenCalledWith('/users', newUser, utilService['options']);
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('public', expect.objectContaining({ action: 'create', status: 'complete' }));
  });

  it('createMember publishes failed mqtt event and throws response data', async () => {
    axiosRef.post.mockRejectedValue({ message: 'boom', response: { data: { statusCode: 500, message: 'create failed' } } });

    await expect(memberService.createMember(req, newUser)).rejects.toEqual({ statusCode: 500, message: 'create failed' });
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('public', expect.objectContaining({ action: 'create', status: 'failed' }));
  });

  it('updateUser throws unauthorized when non-admin updates different email', async () => {
    await expect(memberService.updateUser(req, 'other@example.com', { picture: '', password: '', connection: '', family_name: '', given_name: '' })).rejects.toContain(
      'not authorized',
    );
  });

  it('updateUser throws not found when member does not exist', async () => {
    jest.spyOn(memberService, 'getMemberByEmail').mockResolvedValue(undefined as any);

    await expect(memberService.updateUser(req, 'user@example.com', { picture: '', password: '', connection: '', family_name: '', given_name: '' })).rejects.toContain(
      'not found',
    );
  });

  it('updateUser throws unauthorized when sub does not match found user', async () => {
    jest.spyOn(memberService, 'getMemberByEmail').mockResolvedValue({ user_id: 'auth0|different' } as any);

    await expect(memberService.updateUser(req, 'user@example.com', { picture: '', password: '', connection: '', family_name: '', given_name: '' })).rejects.toContain(
      'not authorized',
    );
  });

  it('updateUser patches user and publishes complete mqtt event', async () => {
    jest.spyOn(memberService, 'getMemberByEmail').mockResolvedValue({ user_id: 'auth0|123' } as any);
    axiosRef.patch.mockResolvedValue({ data: { user_id: 'auth0|123', updated: true } });

    await expect(memberService.updateUser(req, 'user@example.com', { picture: 'p', password: 'pw', connection: 'Auth0DB', family_name: 'f', given_name: 'g' })).resolves.toEqual(
      { user_id: 'auth0|123', updated: true },
    );
    expect(axiosRef.patch).toHaveBeenCalledWith('/users/auth0|123', { picture: 'p', password: 'pw', connection: 'Auth0DB', family_name: 'f', given_name: 'g' }, utilService['options']);
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('public', expect.objectContaining({ action: 'update', status: 'complete' }));
  });

  it('updateUser publishes failed mqtt event and throws message on error', async () => {
    jest.spyOn(memberService, 'getMemberByEmail').mockResolvedValue({ user_id: 'auth0|123' } as any);
    axiosRef.patch.mockRejectedValue(new Error('patch failed'));

    await expect(memberService.updateUser(req, 'user@example.com', { picture: 'p', password: 'pw', connection: 'Auth0DB', family_name: 'f', given_name: 'g' })).rejects.toBe(
      'patch failed',
    );
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('ui', expect.objectContaining({ action: 'update', status: 'failed' }));
  });

  it('sendVerificationEmail initializes token service', async () => {
    await memberService.sendVerificationEmail('user@example.com');

    expect(utilService.init).toHaveBeenCalled();
  });

  it('sendPasswordResetEmail initializes token service', async () => {
    await memberService.sendPasswordResetEmail('user@example.com');

    expect(utilService.init).toHaveBeenCalled();
  });
});
