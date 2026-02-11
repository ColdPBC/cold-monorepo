import { IntegrationsService } from './integrations.service';

describe('IntegrationsService', () => {
  const build = () => {
    const prisma = {
      integrations: {
        findMany: jest.fn(),
      },
    } as any;

    const cache = {
      get: jest.fn(),
    } as any;

    const service = new IntegrationsService(prisma, cache);
    return { service, prisma, cache };
  };

  const req = {
    user: { id: 'u1' },
  } as any;

  it('should be defined', () => {
    const { service } = build();
    expect(service).toBeDefined();
  });

  it('returns cached integrations when bpc is true', async () => {
    const { service, cache, prisma } = build();
    cache.get.mockResolvedValue([{ id: 'i1' }]);

    const result = await service.getAllIntegrations(req, { routingKey: 'rk', action: 'all' }, true);

    expect(result).toEqual([{ id: 'i1' }]);
    expect(prisma.integrations.findMany).not.toHaveBeenCalled();
  });

  it('queries prisma when cache miss or bpc disabled', async () => {
    const { service, cache, prisma } = build();
    cache.get.mockResolvedValue(null);
    prisma.integrations.findMany.mockResolvedValue([{ id: 'i2' }]);

    const result = await service.getAllIntegrations(req, { routingKey: 'rk', action: 'all' }, true);

    expect(prisma.integrations.findMany).toHaveBeenCalled();
    expect(result).toEqual([{ id: 'i2' }]);
  });

  it('rethrows underlying errors', async () => {
    const { service, prisma } = build();
    prisma.integrations.findMany.mockRejectedValue(new Error('db down'));

    await expect(service.getAllIntegrations(req, { routingKey: 'rk', action: 'all' }, false)).rejects.toThrow('db down');
  });
});
