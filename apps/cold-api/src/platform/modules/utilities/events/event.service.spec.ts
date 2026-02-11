import { EventService } from './event.service';

describe('EventService', () => {
  const buildService = () => {
    const prisma = {
      integrations: {
        findMany: jest.fn(),
      },
    } as any;

    const rabbit = {
      publish: jest.fn(),
      request: jest.fn(),
    } as any;

    return {
      service: new EventService(prisma, rabbit),
      prisma,
      rabbit,
    };
  };

  it('should be defined', () => {
    const { service } = buildService();
    expect(service).toBeDefined();
  });

  it('sendAsyncEvent publishes expected payload shape', async () => {
    const { service, rabbit } = buildService();

    await service.sendAsyncEvent('rk', 'event.name', { hello: 'world' });

    expect(rabbit.publish).toHaveBeenCalledWith('rk', { from: 'cold-api', event: 'event.name', data: { hello: 'world' } }, undefined);
  });

  it('sendRPCEvent calls rabbit.request', async () => {
    const { service, rabbit } = buildService();

    await service.sendRPCEvent('rk', 'event.name', { hello: 'world' });

    expect(rabbit.request).toHaveBeenCalledWith('rk', { from: 'cold-api', event: 'event.name', data: { hello: 'world' } }, undefined);
  });

  it('sendPlatformEvent throws for invalid request/user input', async () => {
    const { service } = buildService();

    await expect(service.sendPlatformEvent('rk', 'event.name', {}, null as any)).rejects.toThrow();
  });

  it('sendIntegrationEvent throws when org cannot be resolved', async () => {
    const { service } = buildService();

    const userOnly = {
      isColdAdmin: true,
      coldclimate_claims: { org_id: 'org_1', email: 'test@test.com' },
    } as any;

    await expect(service.sendIntegrationEvent(false, 'event.name', {}, userOnly)).rejects.toThrow('Organization id is required.');
  });

  it('sendIntegrationEvent publishes to integration routing key', async () => {
    const { service, prisma, rabbit } = buildService();

    prisma.integrations.findMany.mockResolvedValue([
      {
        service_definition: {
          definition: {
            rabbitMQ: {
              publishOptions: {
                routing_key: 'integration.rk',
              },
            },
          },
        },
      },
    ]);

    const req = {
      user: {
        isColdAdmin: true,
        coldclimate_claims: { org_id: 'org_1', email: 'test@test.com' },
      },
      organization: { id: 'org_1' },
    } as any;

    await service.sendIntegrationEvent(false, 'integration.event', { org: { id: 'org_1' } }, req);

    expect(prisma.integrations.findMany).toHaveBeenCalledWith({
      where: { organization_id: 'org_1' },
      include: { service_definition: true },
    });
    expect(rabbit.publish).toHaveBeenCalledWith(
      'integration.rk',
      expect.objectContaining({ from: 'cold-api', event: 'integration.event' }),
      undefined,
    );
  });
});
