import { integration_service_type } from '@prisma/client';
import { ServiceDefinitionsService } from './service_definitions.service';

describe('ServiceDefinitionsService', () => {
  const buildService = () => {
    const prisma = {
      service_definitions: {
        findFirst: jest.fn(),
        update: jest.fn(),
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
      },
    } as any;

    return {
      service: new ServiceDefinitionsService(prisma),
      prisma,
    };
  };

  it('should be defined', () => {
    const { service } = buildService();
    expect(service).toBeDefined();
  });

  it('registerService creates a new service when one does not exist', async () => {
    const { service, prisma } = buildService();
    prisma.service_definitions.findFirst.mockResolvedValue(null);
    prisma.service_definitions.create.mockResolvedValue({ name: 'svc-1' });

    const result = await service.registerService('svc-1', integration_service_type.provider, 'label', { k: 'v' });

    expect(prisma.service_definitions.create).toHaveBeenCalled();
    expect(result).toEqual({ name: 'svc-1' });
  });

  it('registerService updates existing service when already registered', async () => {
    const { service, prisma } = buildService();
    prisma.service_definitions.findFirst.mockResolvedValue({ id: 'old-id', name: 'svc-1' });
    prisma.service_definitions.update.mockResolvedValue({ id: 'updated-id', name: 'svc-1' });

    const result = await service.registerService('svc-1', integration_service_type.provider, 'label', { k: 'v' });

    expect(prisma.service_definitions.update).toHaveBeenCalled();
    expect(result).toEqual({ id: 'updated-id', name: 'svc-1' });
  });

  it('getService includes integrations for cold admins', async () => {
    const { service, prisma } = buildService();
    prisma.service_definitions.findUnique.mockResolvedValue({ name: 'svc-1' });

    await service.getService({ isColdAdmin: true } as any, 'svc-1');

    expect(prisma.service_definitions.findUnique).toHaveBeenCalledWith({
      where: { name: 'svc-1' },
      include: { integrations: true },
    });
  });

  it('getServices includes integrations for non-admin users as false', async () => {
    const { service, prisma } = buildService();
    prisma.service_definitions.findMany.mockResolvedValue([{ name: 'svc-1' }]);

    const result = await service.getServices({ isColdAdmin: false } as any);

    expect(prisma.service_definitions.findMany).toHaveBeenCalledWith({ include: { integrations: false } });
    expect(result).toEqual([{ name: 'svc-1' }]);
  });
});
