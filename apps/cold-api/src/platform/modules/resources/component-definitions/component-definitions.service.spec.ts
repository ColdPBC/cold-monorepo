import { BadRequestException, ConflictException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { ComponentDefinitionsService } from './component-definitions.service';
import { CacheService, DarklyService, MqttService, PrismaService } from '@coldpbc/nest';

describe('ComponentDefinitionsService', () => {
  let service: ComponentDefinitionsService;

  const darkly = {
    subscribeToJsonFlagChanges: jest.fn(),
  } as unknown as DarklyService;

  const prismaMock = {
    component_definitions: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  const prisma = prismaMock as unknown as PrismaService;

  const cache = {
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  } as unknown as CacheService;

  const mqtt = {
    publishMQTT: jest.fn(),
  } as unknown as MqttService;

  const req = {
    url: '/component-definitions',
    user: {
      coldclimate_claims: {
        email: 'user@example.com',
        roles: ['cold:admin'],
      },
    },
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    prismaMock.component_definitions.findMany.mockReset();
    prismaMock.component_definitions.findUnique.mockReset();
    prismaMock.component_definitions.create.mockReset();
    prismaMock.component_definitions.update.mockReset();
    prismaMock.component_definitions.delete.mockReset();
    cache.get = jest.fn().mockResolvedValue(undefined);
    cache.set = jest.fn().mockResolvedValue(undefined);
    cache.delete = jest.fn().mockResolvedValue(undefined);
    service = new ComponentDefinitionsService(darkly, prisma, cache, mqtt);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('onModuleInit subscribes and updates test orgs', async () => {
    darkly.subscribeToJsonFlagChanges = jest.fn((_, cb) => cb(['org_1']));
    await service.onModuleInit();

    await expect(service.getTestOrgs()).resolves.toEqual(['org_1']);
  });

  it('findByType returns cached data', async () => {
    cache.get = jest.fn().mockResolvedValue([{ id: 'c1' }]);

    await expect(service.findByType(req, 'integration' as any)).resolves.toEqual([{ id: 'c1' }]);
    expect(prismaMock.component_definitions.findMany).not.toHaveBeenCalled();
  });

  it('findByType reads from db and caches', async () => {
    prismaMock.component_definitions.findMany.mockResolvedValue([{ id: 'c1', type: 'integration' }]);

    await expect(service.findByType(req, 'integration' as any)).resolves.toEqual([{ id: 'c1', type: 'integration' }]);
    expect(cache.set).toHaveBeenCalledWith('component_definitions:type:integration', [{ id: 'c1', type: 'integration' }], { ttl: 0 });
  });

  it('findByType maps Prisma validation errors to bad request', async () => {
    prismaMock.component_definitions.findMany.mockRejectedValue({ name: 'PrismaClientValidationError' });

    await expect(service.findByType(req, 'bad' as any)).rejects.toBeInstanceOf(BadRequestException);
  });

  it('create creates definition, rebuilds cache, and publishes success', async () => {
    const dto = { name: 'def-1', type: 'integration' } as any;
    prismaMock.component_definitions.create.mockResolvedValue({ id: '1', ...dto });
    const findByTypeSpy = jest.spyOn(service, 'findByType').mockResolvedValue([]);

    await expect(service.create(dto, req)).resolves.toEqual(expect.objectContaining({ id: '1', name: 'def-1' }));
    expect(cache.delete).toHaveBeenCalledWith('form_definitions:type:integration');
    expect(findByTypeSpy).toHaveBeenCalledWith(req, 'integration');
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('public', expect.objectContaining({ action: 'create', status: 'complete' }));
  });

  it('create maps unique constraint errors to conflict', async () => {
    prismaMock.component_definitions.create.mockRejectedValue(new Error('Unique constraint failed on the fields'));

    await expect(service.create({ name: 'dup', type: 'integration' }, req)).rejects.toBeInstanceOf(ConflictException);
  });

  it('create maps Prisma validation errors to unprocessable', async () => {
    prismaMock.component_definitions.create.mockRejectedValue({ name: 'PrismaClientValidationError', message: 'bad props' });

    await expect(service.create({ name: 'bad', type: 'integration' }, req)).rejects.toBeInstanceOf(UnprocessableEntityException);
  });

  it('create publishes failure and rethrows generic errors', async () => {
    prismaMock.component_definitions.create.mockRejectedValue(new Error('create failed'));

    await expect(service.create({ name: 'bad', type: 'integration' }, req)).rejects.toThrow('create failed');
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('public', expect.objectContaining({ action: 'create', status: 'failed' }));
  });

  it('findAll returns definitions', async () => {
    prismaMock.component_definitions.findMany.mockResolvedValue([
      { id: '1', definition: null },
      { id: '2', definition: { items: [{ key: 'k1', roles: ['cold:admin'] }] } },
    ]);

    await expect(service.findAll(req)).resolves.toHaveLength(2);
  });

  it('findOne returns cached definition unless bypassing cache', async () => {
    cache.get = jest.fn().mockResolvedValue({ id: 'cached' });

    await expect(service.findOne('cached-name', req, false)).resolves.toEqual({ id: 'cached' });
    expect(prismaMock.component_definitions.findUnique).not.toHaveBeenCalled();
  });

  it('findOne loads from db, filters items, and caches result', async () => {
    prismaMock.component_definitions.findUnique.mockResolvedValue({
      name: 'def-1',
      type: 'integration',
      definition: { items: [{ label: 'visible', roles: ['cold:admin'] }, { label: 'hidden', roles: ['other:role'] }] },
    });

    const result = await service.findOne('def-1', req, true);

    expect(result.definition.items).toHaveLength(1);
    expect(cache.set).toHaveBeenCalledWith('component_definitions:name:def-1', expect.any(Object), { ttl: 0 });
    expect(cache.set).toHaveBeenCalledWith('component_definitions:type:integration', expect.any(Object), { ttl: 0 });
  });

  it('findOne throws not found when db returns null', async () => {
    prismaMock.component_definitions.findUnique.mockResolvedValue(null);

    await expect(service.findOne('missing', req, true)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('findOne maps Prisma validation errors to unprocessable', async () => {
    prismaMock.component_definitions.findUnique.mockRejectedValue({ name: 'PrismaClientValidationError', message: 'bad' });

    await expect(service.findOne('bad', req, true)).rejects.toBeInstanceOf(UnprocessableEntityException);
  });

  it('update clears cache, updates definition, and publishes success', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue({ name: 'def-1', type: 'integration' } as any);
    prismaMock.component_definitions.update.mockResolvedValue({ name: 'def-1', type: 'integration' });

    await expect(service.update('def-1', { definition: {} }, req)).resolves.toEqual({ name: 'def-1', type: 'integration' });
    expect(cache.delete).toHaveBeenCalledWith('component_definitions:name:def-1');
    expect(cache.delete).toHaveBeenCalledWith('component_definitions:type:integration');
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('public', expect.objectContaining({ action: 'update', status: 'complete' }));
  });

  it('update throws not found when update returns null', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue({ name: 'def-1', type: 'integration' } as any);
    prismaMock.component_definitions.update.mockResolvedValue(null);

    await expect(service.update('def-1', {}, req)).rejects.toBeInstanceOf(NotFoundException);
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('public', expect.objectContaining({ action: 'update', status: 'failed' }));
  });

  it('update maps non-404 errors to unprocessable', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue({ name: 'def-1', type: 'integration' } as any);
    prismaMock.component_definitions.update.mockRejectedValue(new Error('db write failed'));

    await expect(service.update('def-1', {}, req)).rejects.toBeInstanceOf(UnprocessableEntityException);
  });

  it('remove clears cache, rebuilds type cache, deletes, and publishes success', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue({ name: 'def-1', type: 'integration' } as any);
    const findByTypeSpy = jest.spyOn(service, 'findByType').mockResolvedValue([]);
    prismaMock.component_definitions.delete.mockResolvedValue({});

    await expect(service.remove('def-1', req)).resolves.toBeUndefined();
    expect(findByTypeSpy).toHaveBeenCalledWith(req, 'integration');
    expect(prismaMock.component_definitions.delete).toHaveBeenCalledWith({ where: { name: 'def-1' } });
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('public', expect.objectContaining({ action: 'delete', status: 'complete' }));
  });

  it('remove maps missing delete record to not found', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue({ name: 'def-1', type: 'integration' } as any);
    jest.spyOn(service, 'findByType').mockResolvedValue([]);
    prismaMock.component_definitions.delete.mockRejectedValue(new Error('Record to delete does not exist'));

    await expect(service.remove('def-1', req)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('remove publishes failure and rethrows generic errors', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue({ name: 'def-1', type: 'integration' } as any);
    jest.spyOn(service, 'findByType').mockRejectedValue(new Error('type refresh failed'));

    await expect(service.remove('def-1', req)).rejects.toThrow('type refresh failed');
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('public', expect.objectContaining({ action: 'delete', status: 'failed' }));
  });
});
