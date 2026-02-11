import { UnprocessableEntityException } from '@nestjs/common';
import { OrganizationIntegrationsService } from './organization.integrations.service';

describe('OrganizationIntegrationsService', () => {
  let service: OrganizationIntegrationsService;
  const cache = {
    get: jest.fn(),
    set: jest.fn(),
  };
  const mqtt = {
    publishMQTT: jest.fn(),
  };
  const helper = {
    getOrganizationById: jest.fn(),
  };
  const prisma = {
    integrations: {
      findMany: jest.fn(),
    },
    service_definitions: {
      findUnique: jest.fn(),
    },
    organizations: {
      findUnique: jest.fn(),
    },
  };
  const rabbit = {
    publish: jest.fn(),
  };
  const broadcast = {
    sendIntegrationEvent: jest.fn(),
  };
  const backbone = {
    syncProducts: jest.fn(),
  };
  const req = {
    url: '/organizations/org_1/integrations',
    user: {
      isColdAdmin: false,
      coldclimate_claims: {
        org_id: 'org_1',
        email: 'user@example.com',
      },
    },
    organization: { id: 'org_1', name: 'Org One' },
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new OrganizationIntegrationsService(cache as any, mqtt as any, helper as any, prisma as any, rabbit as any, broadcast as any, backbone as any);
    cache.get.mockResolvedValue(undefined);
    cache.set.mockResolvedValue(undefined);
    prisma.integrations.findMany.mockResolvedValue([]);
    prisma.service_definitions.findUnique.mockResolvedValue(undefined);
    prisma.organizations.findUnique.mockResolvedValue(undefined);
    rabbit.publish.mockResolvedValue({});
    broadcast.sendIntegrationEvent.mockResolvedValue({});
    backbone.syncProducts.mockResolvedValue(undefined);
    helper.getOrganizationById.mockResolvedValue({ id: 'org_1', name: 'Org One' });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getOrganizationIntegrations returns cached integrations when bpc cache hit', async () => {
    cache.get.mockResolvedValue([{ id: 'int_cached' }]);

    await expect(service.getOrganizationIntegrations(req, 'org_1', true)).resolves.toEqual([{ id: 'int_cached' }]);
    expect(prisma.integrations.findMany).not.toHaveBeenCalled();
  });

  it('getOrganizationIntegrations reads db and caches result when cache miss', async () => {
    prisma.integrations.findMany.mockResolvedValue([{ id: 'int_1' }]);

    await expect(service.getOrganizationIntegrations(req, 'org_1', true)).resolves.toEqual([{ id: 'int_1' }]);
    expect(prisma.integrations.findMany).toHaveBeenCalledWith({
      where: { organization_id: 'org_1' },
      include: { organization: true, service_definition: true },
    });
    expect(cache.set).toHaveBeenCalledWith('organizations:org_1:integrations', [{ id: 'int_1' }], { ttl: 60 * 60 * 24 });
  });

  it('getOrganizationIntegrations uses requested orgId for cold admin with bpc', async () => {
    const adminReq = {
      ...req,
      user: {
        ...req.user,
        isColdAdmin: true,
      },
    } as any;
    prisma.integrations.findMany.mockResolvedValue([{ id: 'int_admin' }]);

    await expect(service.getOrganizationIntegrations(adminReq, 'org_admin', true)).resolves.toEqual([{ id: 'int_admin' }]);
    expect(prisma.integrations.findMany).toHaveBeenCalledWith({
      where: { organization_id: 'org_admin' },
      include: { organization: true, service_definition: true },
    });
  });

  it('getOrganizationIntegrations maps errors to UnprocessableEntityException', async () => {
    prisma.integrations.findMany.mockRejectedValue(new Error('db failure'));

    await expect(service.getOrganizationIntegrations(req, 'org_1', false)).rejects.toBeInstanceOf(UnprocessableEntityException);
  });

  it('createFacilityIntegration creates rpc integration and publishes mqtt success', async () => {
    prisma.service_definitions.findUnique.mockResolvedValue({
      id: 'svc_1',
      name: 'cold-platform-bayou',
      definition: { rabbitMQ: { rpcOptions: { routing_key: 'rpc.route' }, publishOptions: { routing_key: 'pub.route' } } },
    });
    prisma.organizations.findUnique.mockResolvedValue({
      id: 'org_1',
      name: 'Org One',
      integrations: [],
      facilities: [{ id: 'fac_1', address_line_1: '123 Main St' }],
    });

    await expect(
      service.createFacilityIntegration(req, 'org_1', 'fac_1', {
        service_definition_id: 'svc_1',
        metadata: { address: '123 Main St' },
      }),
    ).resolves.toBeUndefined();
    expect(rabbit.publish).toHaveBeenCalledWith(
      'rpc.route',
      expect.objectContaining({
        event: 'facility.integration.enabled',
        from: 'cold.api',
      }),
      { exchange: 'amq.direct', timeout: 5000 },
    );
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('public', expect.objectContaining({ action: 'create', status: 'complete' }));
  });

  it('createFacilityIntegration throws when service definition missing routing key', async () => {
    prisma.service_definitions.findUnique.mockResolvedValue({
      id: 'svc_1',
      definition: {},
    });

    await expect(
      service.createFacilityIntegration(req, 'org_1', 'fac_1', {
        service_definition_id: 'svc_1',
        metadata: {},
      }),
    ).rejects.toBeInstanceOf(UnprocessableEntityException);
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('public', expect.objectContaining({ status: 'failed' }));
  });

  it('createFacilityIntegration throws when facility not found', async () => {
    prisma.service_definitions.findUnique.mockResolvedValue({
      id: 'svc_1',
      definition: { rabbitMQ: { publishOptions: { routing_key: 'pub.route' }, rpcOptions: { routing_key: 'rpc.route' } } },
    });
    prisma.organizations.findUnique.mockResolvedValue({
      id: 'org_1',
      name: 'Org One',
      facilities: [{ id: 'fac_1', address_line_1: '123 Main St' }],
    });

    await expect(
      service.createFacilityIntegration(req, 'org_1', 'fac_2', {
        service_definition_id: 'svc_1',
        metadata: {},
      }),
    ).rejects.toBeInstanceOf(UnprocessableEntityException);
  });

  it('createFacilityIntegration resolves facility by metadata address when locId is empty', async () => {
    prisma.service_definitions.findUnique.mockResolvedValue({
      id: 'svc_1',
      definition: { rabbitMQ: { publishOptions: { routing_key: 'pub.route' }, rpcOptions: { routing_key: 'rpc.route' } } },
    });
    prisma.organizations.findUnique.mockResolvedValue({
      id: 'org_1',
      name: 'Org One',
      facilities: [{ id: 'fac_1', address_line_1: '123 Main St' }],
    });

    await expect(
      service.createFacilityIntegration(req, 'org_1', '', {
        service_definition_id: 'svc_1',
        metadata: { address: '123 Main St' },
      }),
    ).resolves.toBeUndefined();
    expect(rabbit.publish).toHaveBeenCalled();
  });

  it('createFacilityIntegration throws when organization does not exist', async () => {
    prisma.service_definitions.findUnique.mockResolvedValue({
      id: 'svc_1',
      definition: { rabbitMQ: { publishOptions: { routing_key: 'pub.route' }, rpcOptions: { routing_key: 'rpc.route' } } },
    });
    prisma.organizations.findUnique.mockResolvedValue(null);

    await expect(
      service.createFacilityIntegration(req, 'org_1', 'fac_1', {
        service_definition_id: 'svc_1',
        metadata: {},
      }),
    ).rejects.toBeInstanceOf(UnprocessableEntityException);
  });

  it('enableIntegration sends compliance activation event and publishes ui mqtt', async () => {
    prisma.service_definitions.findUnique.mockResolvedValue({
      id: 'svc_1',
      name: 'Service A',
      definition: { rabbitMQ: { publishOptions: { routing_key: 'pub.route' } } },
    });
    helper.getOrganizationById.mockResolvedValue({ id: 'org_1', name: 'Org One' });

    await expect(service.enableIntegration(req, 'org_1', { service_definition_id: 'svc_1', metadata: { key: 'value' } })).resolves.toEqual({
      message: 'Integration enable request for Org One with service Service A was added to the queue',
    });
    expect(broadcast.sendIntegrationEvent).toHaveBeenCalledWith(
      false,
      'compliance.activated',
      expect.objectContaining({ service_definition_id: 'svc_1' }),
      req.user,
      { exchange: 'amq.direct', timeout: 5000 },
    );
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('ui', expect.objectContaining({ action: 'update', status: 'complete' }));
  });

  it('enableIntegration throws when service definition is missing', async () => {
    prisma.service_definitions.findUnique.mockResolvedValue(null);

    await expect(service.enableIntegration(req, 'org_1', { service_definition_id: 'missing', metadata: {} })).rejects.toBeInstanceOf(UnprocessableEntityException);
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('public', expect.objectContaining({ status: 'failed' }));
  });

  it('enableIntegration continues when service has no publish routing key', async () => {
    prisma.service_definitions.findUnique.mockResolvedValue({
      id: 'svc_1',
      name: 'Service A',
      definition: {},
    });
    helper.getOrganizationById.mockResolvedValue({ id: 'org_1', name: 'Org One' });

    await expect(service.enableIntegration(req, 'org_1', { service_definition_id: 'svc_1', metadata: {} })).resolves.toEqual({
      message: 'Integration enable request for Org One with service Service A was added to the queue',
    });
    expect(broadcast.sendIntegrationEvent).toHaveBeenCalled();
  });

  it('triggerIntegration calls backbone sync with skip and limit', async () => {
    await expect(service.triggerIntegration(req, 'org_1', { api_key: 'k' }, 10, 20)).resolves.toBeUndefined();
    expect(backbone.syncProducts).toHaveBeenCalledWith(req, 10, 20);
  });

  it('createIntegration sends integration.enabled event and publishes ui mqtt', async () => {
    prisma.service_definitions.findUnique.mockResolvedValue({
      id: 'svc_1',
      name: 'Service A',
      definition: { rabbitMQ: { publishOptions: { routing_key: 'pub.route' } } },
    });
    helper.getOrganizationById.mockResolvedValue({ id: 'org_1', name: 'Org One' });

    await expect(service.createIntegration(req, 'org_1', { service_definition_id: 'svc_1', metadata: { key: 'value' } })).resolves.toEqual({
      message: 'Integration enable request for Org One with service Service A was added to the queue',
    });
    expect(broadcast.sendIntegrationEvent).toHaveBeenCalledWith(
      false,
      'integration.enabled',
      expect.objectContaining({ service_definition_id: 'svc_1' }),
      req.user,
      { exchange: 'amq.direct', timeout: 5000 },
    );
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('ui', expect.objectContaining({ action: 'create', status: 'complete' }));
  });

  it('createIntegration publishes failure and rethrows on error', async () => {
    prisma.service_definitions.findUnique.mockResolvedValue({
      id: 'svc_1',
      name: 'Service A',
      definition: { rabbitMQ: { publishOptions: { routing_key: 'pub.route' } } },
    });
    helper.getOrganizationById.mockRejectedValue(new Error('org error'));

    await expect(service.createIntegration(req, 'org_1', { service_definition_id: 'svc_1', metadata: {} })).rejects.toThrow('org error');
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('public', expect.objectContaining({ status: 'failed' }));
  });

  it('createIntegration throws when service definition is missing', async () => {
    prisma.service_definitions.findUnique.mockResolvedValue(null);

    await expect(service.createIntegration(req, 'org_1', { service_definition_id: 'missing', metadata: {} })).rejects.toBeInstanceOf(UnprocessableEntityException);
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('public', expect.objectContaining({ status: 'failed' }));
  });

  it('createIntegration proceeds when service publish routing key is missing', async () => {
    prisma.service_definitions.findUnique.mockResolvedValue({
      id: 'svc_1',
      name: 'Service A',
      definition: {},
    });
    helper.getOrganizationById.mockResolvedValue({ id: 'org_1', name: 'Org One' });

    await expect(service.createIntegration(req, 'org_1', { service_definition_id: 'svc_1', metadata: {} })).resolves.toEqual({
      message: 'Integration enable request for Org One with service Service A was added to the queue',
    });
    expect(broadcast.sendIntegrationEvent).toHaveBeenCalled();
  });
});
