import { ConflictException, HttpException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Auth0TokenService, CacheService, DarklyService, MqttService, PrismaService } from '@coldpbc/nest';
import { ConfigService } from '@nestjs/config';
import { RoleService } from '../../auth0/roles/role.service';
import { HttpService } from '@nestjs/axios';
import { OrganizationHelper } from '../helpers/organization.helper';
import { InvitationsService } from './invitations.service';

describe('InvitationsService', () => {
  let service: InvitationsService;

  const prisma = {} as any;
  const config = {
    get: jest.fn(),
  };
  const roleService = {
    convertRoleNamesToIds: jest.fn(),
  };
  const cache = {
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  };
  const helper = {
    getOrganizationById: jest.fn(),
  };
  const utilService = {
    init: jest.fn(),
  };
  const darkly = {
    onModuleInit: jest.fn(),
    subscribeToJsonFlagChanges: jest.fn(),
  };
  const axiosRef = {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  };
  const httpService = {
    axiosRef,
  };
  const mqtt = {
    publishMQTT: jest.fn(),
  };

  const req = {
    url: '/organizations/org_1/invitation',
    user: {
      isColdAdmin: false,
      coldclimate_claims: {
        org_id: 'org_1',
        email: 'user@example.com',
      },
    },
  } as any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvitationsService,
        { provide: PrismaService, useValue: prisma },
        { provide: ConfigService, useValue: config },
        { provide: RoleService, useValue: roleService },
        { provide: CacheService, useValue: cache },
        { provide: OrganizationHelper, useValue: helper },
        { provide: Auth0TokenService, useValue: utilService },
        { provide: DarklyService, useValue: darkly },
        { provide: HttpService, useValue: httpService },
        { provide: MqttService, useValue: mqtt },
      ],
    }).compile();

    service = module.get<InvitationsService>(InvitationsService);
    (service as any).metrics = {
      increment: jest.fn(),
      event: jest.fn(),
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
    config.get.mockReset();
    roleService.convertRoleNamesToIds.mockReset();
    cache.get.mockReset();
    cache.set.mockReset();
    cache.delete.mockReset();
    helper.getOrganizationById.mockReset();
    utilService.init.mockReset();
    darkly.onModuleInit.mockReset();
    darkly.subscribeToJsonFlagChanges.mockReset();
    axiosRef.get.mockReset();
    axiosRef.post.mockReset();
    axiosRef.delete.mockReset();
    mqtt.publishMQTT.mockReset();

    config.get.mockReturnValue('client_1');
    roleService.convertRoleNamesToIds.mockResolvedValue(['role_1']);
    cache.get.mockResolvedValue(undefined);
    cache.set.mockResolvedValue(undefined);
    cache.delete.mockResolvedValue(undefined);
    helper.getOrganizationById.mockResolvedValue({ id: 'org_1', name: 'Org One' });
    utilService.init.mockResolvedValue({ headers: { authorization: 'Bearer token' } });
    darkly.onModuleInit.mockResolvedValue(undefined);
    darkly.subscribeToJsonFlagChanges.mockImplementation((_flag: string, cb: any) => cb([]));
    axiosRef.get.mockResolvedValue({ data: [{ id: 'inv_1' }] });
    axiosRef.post.mockResolvedValue({ data: { id: 'inv_2' } });
    axiosRef.delete.mockResolvedValue({});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('onModuleInit subscribes to darkly and initializes auth options', async () => {
    await service.onModuleInit();

    expect(darkly.onModuleInit).toHaveBeenCalled();
    expect(darkly.subscribeToJsonFlagChanges).toHaveBeenCalledWith('dynamic-org-white-list', expect.any(Function));
    expect(utilService.init).toHaveBeenCalled();
  });

  it('getOrgInvites returns cached invitations when available', async () => {
    cache.get.mockResolvedValue([{ id: 'cached_inv' }]);

    await expect(service.getOrgInvites('org_1', req, false)).resolves.toEqual([{ id: 'cached_inv' }]);
    expect(axiosRef.get).not.toHaveBeenCalled();
  });

  it('getOrgInvites uses default updateCache=false when omitted', async () => {
    cache.get.mockResolvedValue([{ id: 'cached_default' }]);

    await expect(service.getOrgInvites('org_1', req)).resolves.toEqual([{ id: 'cached_default' }]);
    expect(axiosRef.get).not.toHaveBeenCalled();
  });

  it('getOrgInvites refreshes cache when updateCache=true', async () => {
    await expect(service.getOrgInvites('org_1', req, true)).resolves.toEqual({ data: [{ id: 'inv_1' }] });
    expect(cache.delete).toHaveBeenCalledWith('organizations:org_1:members');
    expect(cache.delete).toHaveBeenCalledWith('organizations:org_1:invitations');
    expect(cache.set).toHaveBeenCalledWith('organizations:org_1:invitations', [{ id: 'inv_1' }], { ttl: 1000 * 60 * 60, update: true });
  });

  it('inviteUser posts invitation and publishes success', async () => {
    helper.getOrganizationById.mockResolvedValue({ id: 'org_1', name: 'Org One' });
    service.test_orgs = [];
    await service.onModuleInit();

    await expect(service.inviteUser('org_1', 'invitee@example.com', 'Owner', 'cold:admin', false, req, true)).resolves.toEqual({ id: 'inv_2' });
    expect(roleService.convertRoleNamesToIds).toHaveBeenCalledWith(['cold:admin']);
    expect(axiosRef.post).toHaveBeenCalledWith(
      '/organizations/org_1/invitations',
      expect.objectContaining({
        client_id: 'client_1',
        invitee: { email: 'invitee@example.com' },
        inviter: { name: 'Owner' },
        roles: ['role_1'],
      }),
      expect.any(Object),
    );
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('ui', expect.objectContaining({ action: 'create', status: 'complete' }));
  });

  it('inviteUser uses default suppressEmail and bpc args when omitted', async () => {
    helper.getOrganizationById.mockResolvedValue({ id: 'org_1', name: 'Org One' });
    await service.onModuleInit();

    await expect(service.inviteUser('org_1', 'invitee@example.com', 'Owner', 'cold:admin', undefined as any, req, undefined as any)).resolves.toEqual({ id: 'inv_2' });
    expect(helper.getOrganizationById).toHaveBeenCalledWith('org_1', req.user, true);
  });

  it('inviteUser accepts array role ids and forwards to converter', async () => {
    helper.getOrganizationById.mockResolvedValue({ id: 'org_1', name: 'Org One' });
    roleService.convertRoleNamesToIds.mockResolvedValue(['role_1', 'role_2']);
    await service.onModuleInit();

    await expect(service.inviteUser('org_1', 'invitee@example.com', 'Owner', ['cold:admin', 'cold:member'], false, req, true)).resolves.toEqual({ id: 'inv_2' });
    expect(roleService.convertRoleNamesToIds).toHaveBeenCalledWith(['cold:admin', 'cold:member']);
  });

  it('inviteUser on forbidden path throws HttpException', async () => {
    const badReq = {
      ...req,
      user: {
        ...req.user,
        isColdAdmin: false,
        coldclimate_claims: {
          ...req.user.coldclimate_claims,
          org_id: 'org_other',
        },
      },
    } as any;
    await service.onModuleInit();

    await expect(service.inviteUser('org_1', 'invitee@example.com', 'Owner', 'cold:admin', false, badReq, true)).rejects.toBeInstanceOf(HttpException);
  });

  it('inviteUser throws NotFoundException for 404 auth0 errors', async () => {
    await service.onModuleInit();
    axiosRef.post.mockRejectedValue({ message: 'not found', response: { status: 404, data: { message: 'missing' } } });

    await expect(service.inviteUser('org_1', 'invitee@example.com', 'Owner', 'cold:admin', false, req, true)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('inviteUser throws UnprocessableEntityException for 400 auth0 errors', async () => {
    await service.onModuleInit();
    axiosRef.post.mockRejectedValue({ message: 'bad request', response: { status: 400, data: { message: 'bad' } } });

    await expect(service.inviteUser('org_1', 'invitee@example.com', 'Owner', 'cold:admin', false, req, true)).rejects.toBeInstanceOf(UnprocessableEntityException);
  });

  it('inviteUser throws ConflictException for 409 auth0 errors', async () => {
    await service.onModuleInit();
    axiosRef.post.mockRejectedValue({ message: 'conflict', response: { status: 409, data: { message: 'exists' } } });

    await expect(service.inviteUser('org_1', 'invitee@example.com', 'Owner', 'cold:admin', false, req, true)).rejects.toBeInstanceOf(ConflictException);
  });

  it('inviteUser maps 404/400/409 when response.data is absent', async () => {
    await service.onModuleInit();
    axiosRef.post.mockRejectedValueOnce({ message: '404', response: { status: 404 } });
    axiosRef.post.mockRejectedValueOnce({ message: '400', response: { status: 400 } });
    axiosRef.post.mockRejectedValueOnce({ message: '409', response: { status: 409 } });

    await expect(service.inviteUser('org_1', 'invitee@example.com', 'Owner', 'cold:admin', false, req, true)).rejects.toBeInstanceOf(NotFoundException);
    await expect(service.inviteUser('org_1', 'invitee@example.com', 'Owner', 'cold:admin', false, req, true)).rejects.toBeInstanceOf(UnprocessableEntityException);
    await expect(service.inviteUser('org_1', 'invitee@example.com', 'Owner', 'cold:admin', false, req, true)).rejects.toBeInstanceOf(ConflictException);
  });

  it('inviteUser default switch branch throws HttpException for other status', async () => {
    await service.onModuleInit();
    axiosRef.post.mockRejectedValue({ message: 'server error', response: { status: 500, data: { message: 'down' } } });

    await expect(service.inviteUser('org_1', 'invitee@example.com', 'Owner', 'cold:admin', false, req, true)).rejects.toBeInstanceOf(HttpException);
  });

  it('deleteInvitation throws forbidden when non-admin targets different org', async () => {
    await expect(service.deleteInvitation('other_org', 'inv_1', req)).rejects.toBeInstanceOf(HttpException);
  });

  it('deleteInvitation deletes invitation and publishes success', async () => {
    await service.onModuleInit();
    jest.spyOn(service, 'getOrgInvites').mockResolvedValue([{ id: 'inv_1' }] as any);

    await expect(service.deleteInvitation('org_1', 'inv_1', req)).resolves.toBe('Invitation inv_1 deleted');
    expect(axiosRef.delete).toHaveBeenCalledWith('/organizations/org_1/invitations/inv_1', expect.any(Object));
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('ui', expect.objectContaining({ action: 'delete', status: 'complete' }));
  });

  it('deleteInvitation handles axios errors without throwing unprocessable', async () => {
    await service.onModuleInit();
    axiosRef.delete.mockRejectedValue({ isAxiosError: true, message: 'axios fail', response: { data: { message: 'boom' } } });

    await expect(service.deleteInvitation('org_1', 'inv_1', req)).resolves.toBe('Invitation inv_1 deleted');
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('ui', expect.objectContaining({ status: 'failed' }));
  });

  it('deleteInvitation maps non-axios errors to UnprocessableEntityException', async () => {
    await service.onModuleInit();
    axiosRef.delete.mockRejectedValue(new Error('delete failed'));

    await expect(service.deleteInvitation('org_1', 'inv_1', req)).rejects.toBeInstanceOf(UnprocessableEntityException);
  });
});
