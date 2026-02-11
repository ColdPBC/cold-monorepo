import { HttpException, NotFoundException } from '@nestjs/common';
import { OrganizationService } from './organization.service';

describe('OrganizationService', () => {
  const build = () => {
    const cache = {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
    } as any;

    const utilService = {
      init: jest.fn().mockResolvedValue({ headers: { Authorization: 'Bearer token' } }),
    } as any;

    const darkly = {} as any;
    const events = {
      sendAsyncEvent: jest.fn(),
    } as any;
    const integrations = {} as any;
    const mqtt = {
      publishMQTT: jest.fn(),
    } as any;

    const prisma = {
      service_definitions: { findUnique: jest.fn() },
      organizations: { update: jest.fn() },
    } as any;

    const repository = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
    } as any;

    const service = new OrganizationService(cache, utilService, darkly, events, integrations, mqtt, prisma, repository);
    return { service, cache, utilService, repository, prisma, mqtt, events };
  };

  const userReq = {
    user: {
      isColdAdmin: false,
      coldclimate_claims: { org_id: 'org_1', email: 'user@example.com' },
    },
    organization: { id: 'org_1', name: 'acme' },
    url: '/organizations',
  } as any;

  it('should be defined', () => {
    const { service } = build();
    expect(service).toBeDefined();
  });

  it('getConnections returns cached values when present', async () => {
    const { service, cache } = build();
    cache.get.mockResolvedValue([{ id: 'con_1' }]);

    const result = await service.getConnections();

    expect(result).toEqual([{ id: 'con_1' }]);
  });

  it('getConnections fetches and caches when cache miss', async () => {
    const { service, cache, utilService } = build();
    cache.get.mockResolvedValue(null);
    jest.spyOn((service as any).httpService.axiosRef, 'get').mockResolvedValue({ data: [{ id: 'con_1' }] } as any);

    const result = await service.getConnections();

    expect(utilService.init).toHaveBeenCalled();
    expect(cache.set).toHaveBeenCalledWith('auth0:connections', [{ id: 'con_1' }], { ttl: 0, update: true });
    expect(result).toEqual([{ id: 'con_1' }]);
  });

  it('getOrganizations normalizes invalid empty filters', async () => {
    const { service, repository } = build();
    repository.findAll.mockResolvedValue([{ id: 'org_1' }]);

    const result = await service.getOrganizations(true, userReq, {} as any);

    expect(result).toEqual([{ id: 'org_1' }]);
    expect(repository.findAll).toHaveBeenCalledWith(userReq.user, null);
  });

  it('getOrganizations throws when repository returns no orgs', async () => {
    const { service, repository } = build();
    repository.findAll.mockResolvedValue(null);

    await expect(service.getOrganizations(true, userReq, { id: 'org_1' })).rejects.toBeInstanceOf(NotFoundException);
  });

  it('getOrganization validates required name or id', async () => {
    const { service } = build();

    await expect(service.getOrganization(':orgId', userReq)).rejects.toMatchObject({
      constructor: HttpException,
      message: "Organization 'name' or 'id' is required",
      status: 422,
    });
  });

  it('getOrganization returns cached org when available', async () => {
    const { service, cache, repository } = build();
    cache.get.mockResolvedValue({ id: 'org_1' });

    const result = await service.getOrganization('org_1', userReq);

    expect(result).toEqual({ id: 'org_1' });
    expect(repository.findOne).not.toHaveBeenCalled();
  });

  it('getOrganization finds by id from repository and caches result', async () => {
    const { service, cache, repository } = build();
    cache.get.mockResolvedValue(null);
    repository.findOne.mockResolvedValue({ id: 'org_1', name: 'acme' });

    const result = await service.getOrganization('org_1', userReq);

    expect(repository.findOne).toHaveBeenCalledWith(userReq.user, { id: 'org_1' });
    expect(cache.set).toHaveBeenCalledWith('organizations:org_1', { id: 'org_1', name: 'acme' }, { ttl: 1000 * 60 * 60 * 24, update: true });
    expect(result).toEqual({ id: 'org_1', name: 'acme' });
  });

  it('getOrganization blocks non-admin access to different org', async () => {
    const { service, cache, repository } = build();
    cache.get.mockResolvedValue(null);
    repository.findOne.mockResolvedValue({ id: 'org_other', name: 'other' });

    await expect(service.getOrganization('org_other', userReq)).rejects.toMatchObject({
      constructor: HttpException,
      status: 401,
    });
  });

  it('getOrganization wraps upstream 404 into NotFoundException', async () => {
    const { service, cache, repository, utilService } = build();
    const adminReq = {
      ...userReq,
      user: { ...userReq.user, isColdAdmin: true },
    } as any;
    cache.get.mockResolvedValue(null);
    repository.findOne.mockResolvedValue(null);
    utilService.init.mockResolvedValue({ headers: { Authorization: 'Bearer token' } });
    jest.spyOn((service as any).httpService.axiosRef, 'get').mockRejectedValue({
      response: { status: 404 },
      message: 'Not found',
      status: 404,
    });

    await expect(service.getOrganization('org_missing', adminReq)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('getOrganization wraps non-404 upstream failures in HttpException', async () => {
    const { service, cache, repository } = build();
    cache.get.mockResolvedValue(null);
    repository.findOne.mockRejectedValue({ response: { status: 500 }, message: 'boom', status: 500 });

    await expect(service.getOrganization('org_1', userReq)).rejects.toBeInstanceOf(HttpException);
  });

  it('updateOrganization clears cache, updates org, refreshes list, and publishes mqtt', async () => {
    const { service, cache, prisma, mqtt } = build();
    prisma.organizations.update.mockResolvedValue({ id: 'org_1', name: 'new-name' });
    jest.spyOn(service, 'getOrganizations').mockResolvedValue([{ id: 'org_1' }] as any);
    (service as any).openAI = null;

    const result = await service.updateOrganization('org_1', { name: 'new-name' }, userReq);

    expect(cache.delete).toHaveBeenCalledWith('organizations:acme');
    expect(cache.delete).toHaveBeenCalledWith('organizations:org_1');
    expect(prisma.organizations.update).toHaveBeenCalled();
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('cold', expect.objectContaining({ action: 'update', status: 'complete' }));
    expect(result).toEqual({ id: 'org_1', name: 'new-name' });
  });
});
