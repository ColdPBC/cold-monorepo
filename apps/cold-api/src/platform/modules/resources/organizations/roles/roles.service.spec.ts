import { HttpException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Auth0TokenService, CacheService, ColdRabbitService, MqttService } from '@coldpbc/nest';
import { HttpService } from '@nestjs/axios';
import { RoleService } from '../../auth0/roles/role.service';
import { OrgRolesService } from './roles.service';

const makeReq = () =>
  ({
    user: {
      isColdAdmin: false,
      coldclimate_claims: {
        org_id: 'org_1',
        email: 'user@example.com',
      },
    },
    url: '/roles',
  } as any);

describe('OrgRolesService', () => {
  let service: OrgRolesService;

  const roleService = {
    resolveRoleIdByName: jest.fn(),
  };

  const coldRabbit = {
    request: jest.fn(),
  };

  const cache = {
    get: jest.fn(),
  };

  const utilService = {
    init: jest.fn(),
  };

  const httpService = {
    axiosRef: {
      get: jest.fn(),
      post: jest.fn(),
    },
  };

  const mqtt = {
    publishMQTT: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    utilService.init.mockResolvedValue({ headers: { authorization: 'Bearer token' } });
    cache.get.mockResolvedValue({ id: 'org_1' });
    roleService.resolveRoleIdByName.mockResolvedValue('rol_1');
    httpService.axiosRef.get.mockResolvedValue({ data: [{ name: 'company:member' }] });
    httpService.axiosRef.post.mockResolvedValue({});
    coldRabbit.request.mockResolvedValue([{ id: 'user_2' }]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrgRolesService,
        { provide: RoleService, useValue: roleService },
        { provide: ColdRabbitService, useValue: coldRabbit },
        { provide: CacheService, useValue: cache },
        { provide: Auth0TokenService, useValue: utilService },
        { provide: HttpService, useValue: httpService },
        { provide: MqttService, useValue: mqtt },
      ],
    }).compile();

    service = module.get<OrgRolesService>(OrgRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('OnModuleInit initializes options', async () => {
    await service.OnModuleInit();

    expect(utilService.init).toHaveBeenCalled();
    expect(service.options).toEqual({ headers: { authorization: 'Bearer token' } });
  });

  it('getOrgUserRoles rejects unauthorized org access', async () => {
    await expect(service.getOrgUserRoles('org_other', 'auth0|u2', makeReq())).rejects.toBeInstanceOf(HttpException);
  });

  it('getOrgUserRoles fetches roles from Auth0', async () => {
    const out = await service.getOrgUserRoles('org_1', 'auth0|u2', makeReq());

    expect(httpService.axiosRef.get).toHaveBeenCalledWith('/organizations/org_1/members/auth0|u2/roles', expect.any(Object));
    expect(out).toEqual([{ name: 'company:member' }]);
  });

  it('getOrgUserRoles returns axios error response data when request fails', async () => {
    httpService.axiosRef.get.mockRejectedValue({ response: { data: { message: 'bad request' } } });

    const out = await service.getOrgUserRoles('org_1', 'auth0|u2', makeReq());

    expect(out).toEqual({ message: 'bad request' });
  });

  it('updateOrgUserRoles updates role and returns refreshed members', async () => {
    const out = await service.updateOrgUserRoles('org_1', 'auth0|u2', makeReq(), 'company:admin', true);

    expect(roleService.resolveRoleIdByName).toHaveBeenCalledWith('company:admin');
    expect(httpService.axiosRef.post).toHaveBeenCalledWith(
      '/organizations/org_1/members/auth0|u2/roles',
      { roles: ['rol_1'] },
      expect.any(Object),
    );
    expect(coldRabbit.request).toHaveBeenCalledWith(
      'rpc.api.organizations.members',
      expect.objectContaining({ event: 'user_roles_updated' }),
    );
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('ui', expect.objectContaining({ action: 'update', status: 'complete' }));
    expect(out).toEqual([{ id: 'user_2' }]);
  });

  it('updateOrgUserRoles rejects unauthorized org access', async () => {
    await expect(service.updateOrgUserRoles('org_other', 'auth0|u2', makeReq(), 'company:member', false)).rejects.toBeInstanceOf(
      UnprocessableEntityException,
    );

    expect(mqtt.publishMQTT).toHaveBeenCalledWith('ui', expect.objectContaining({ action: 'update', status: 'failed' }));
  });

  it('updateOrgUserRoles rejects cold role updates by non-cold admins', async () => {
    await expect(service.updateOrgUserRoles('org_1', 'auth0|u2', makeReq(), 'cold:admin', false)).rejects.toBeInstanceOf(
      UnprocessableEntityException,
    );
  });

  it('updateOrgUserRoles throws when organization cache is missing', async () => {
    cache.get.mockResolvedValue(null);

    await expect(service.updateOrgUserRoles('org_1', 'auth0|u2', makeReq(), 'company:member', false)).rejects.toBeInstanceOf(
      UnprocessableEntityException,
    );
  });

  it('updateOrgUserRoles logs axios errors and does not throw', async () => {
    const err = {
      isAxiosError: true,
      response: { data: { message: 'axios fail' } },
      toJSON: () => ({}),
    } as any;
    httpService.axiosRef.post.mockRejectedValue(err);

    await expect(service.updateOrgUserRoles('org_1', 'auth0|u2', makeReq(), 'company:member', false)).resolves.toBeUndefined();

    expect(mqtt.publishMQTT).toHaveBeenCalledWith('ui', expect.objectContaining({ action: 'update', status: 'failed' }));
  });

  it('updateOrgUserRoles wraps non-axios errors as UnprocessableEntityException', async () => {
    httpService.axiosRef.post.mockRejectedValue(new Error('network down'));

    await expect(service.updateOrgUserRoles('org_1', 'auth0|u2', makeReq(), 'company:member', false)).rejects.toBeInstanceOf(
      UnprocessableEntityException,
    );
  });

  it('getOrgUserRoles allows cold admins to query another org', async () => {
    const req = makeReq();
    req.user.isColdAdmin = true;

    const out = await service.getOrgUserRoles('org_other', 'auth0|u2', req);

    expect(out).toEqual([{ name: 'company:member' }]);
  });

  it('updateOrgUserRoles allows cold admins to set cold role', async () => {
    const req = makeReq();
    req.user.isColdAdmin = true;

    const out = await service.updateOrgUserRoles('org_other', 'auth0|u2', req, 'cold:admin', false);

    expect(out).toEqual([{ id: 'user_2' }]);
  });
});
