import { ConflictException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CacheService, MqttService, PrismaService } from '@coldpbc/nest';
import { Policy_definitionsService } from './policy_definitions.service';

describe('Policy_definitionsService', () => {
  let service: Policy_definitionsService;

  const prisma = {
    policy_definitions: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
    policy_data: {
      create: jest.fn(),
    },
  };

  const cache = {
    get: jest.fn(),
    set: jest.fn(),
  };

  const mqtt = {
    publishMQTT: jest.fn(),
  };

  const req = {
    url: '/policies',
    user: {
      coldclimate_claims: {
        email: 'user@example.com',
        org_id: 'org_1',
      },
    },
  } as any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Policy_definitionsService,
        { provide: PrismaService, useValue: prisma },
        { provide: CacheService, useValue: cache },
        { provide: MqttService, useValue: mqtt },
      ],
    }).compile();

    service = module.get<Policy_definitionsService>(Policy_definitionsService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    prisma.policy_definitions.create.mockReset();
    prisma.policy_definitions.findUnique.mockReset();
    prisma.policy_definitions.update.mockReset();
    prisma.policy_definitions.findMany.mockReset();
    prisma.policy_definitions.findFirst.mockReset();
    prisma.policy_data.create.mockReset();
    cache.get.mockReset();
    cache.set.mockReset();
    mqtt.publishMQTT.mockReset();
    cache.get.mockResolvedValue(undefined);
    cache.set.mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create stores policy, refreshes by name, and publishes success', async () => {
    const dto = { name: 'policy-a', definition: { v: 1 } } as any;
    prisma.policy_definitions.create.mockResolvedValue({ id: 1, ...dto });
    jest.spyOn(service, 'findPolicyByName').mockResolvedValue({ id: 1, ...dto } as any);

    await expect(service.create(req, dto)).resolves.toEqual({ id: 1, name: 'policy-a', definition: { v: 1 } });
    expect(prisma.policy_definitions.create).toHaveBeenCalledWith({ data: expect.objectContaining({ name: 'policy-a' }) });
    expect(mqtt.publishMQTT).toHaveBeenCalledWith(
      'cold',
      expect.objectContaining({ action: 'create', status: 'complete', swr_key: '/policies' }),
    );
  });

  it('create maps unique errors to ConflictException', async () => {
    prisma.policy_definitions.create.mockRejectedValue(new Error('Unique constraint failed on the fields'));

    await expect(service.create(req, { name: 'policy-a', definition: {} } as any)).rejects.toBeInstanceOf(ConflictException);
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('cold', expect.objectContaining({ status: 'failed' }));
  });

  it('create maps Prisma validation errors to UnprocessableEntityException', async () => {
    prisma.policy_definitions.create.mockRejectedValue({ name: 'PrismaClientValidationError', message: 'bad policy payload' });

    await expect(service.create(req, { name: 'policy-a', definition: {} } as any)).rejects.toBeInstanceOf(UnprocessableEntityException);
  });

  it('create rethrows generic errors', async () => {
    prisma.policy_definitions.create.mockRejectedValue(new Error('db failed'));

    await expect(service.create(req, { name: 'policy-a', definition: {} } as any)).rejects.toThrow('db failed');
  });

  it('update updates existing policy, refreshes cache, and publishes success', async () => {
    prisma.policy_definitions.findUnique.mockResolvedValue({ id: 1, name: 'policy-a' });
    prisma.policy_definitions.update.mockResolvedValue({ id: 1, name: 'policy-a', definition: { v: 2 } });

    await expect(service.update(1, { definition: { v: 2 } } as any, req)).resolves.toEqual({ id: 1, name: 'policy-a', definition: { v: 2 } });
    expect(cache.set).toHaveBeenCalledWith('policy_definitions', expect.any(Object), { update: true });
    expect(cache.set).toHaveBeenCalledWith('policy_definitions:name:policy-a', expect.any(Object), { update: true });
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('cold', expect.objectContaining({ action: 'update', status: 'complete' }));
  });

  it('update throws NotFoundException when policy id is missing', async () => {
    prisma.policy_definitions.findUnique.mockResolvedValue(null);

    await expect(service.update(1, { definition: {} } as any, req)).rejects.toBeInstanceOf(NotFoundException);
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('cold', expect.objectContaining({ status: 'failed' }));
  });

  it('createSignedData writes signature and publishes success', async () => {
    prisma.policy_data.create.mockResolvedValue({ policy_id: 10, email: 'user@example.com' });

    await expect(service.createSignedData(10, req)).resolves.toEqual({ policy_id: 10, email: 'user@example.com' });
    expect(prisma.policy_data.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ policy_id: 10, email: 'user@example.com' }),
    });
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('ui', expect.objectContaining({ action: 'create', status: 'complete' }));
  });

  it('createSignedData maps unique violations to ConflictException', async () => {
    prisma.policy_data.create.mockRejectedValue(new Error('Unique constraint failed on the fields'));

    await expect(service.createSignedData(10, req)).rejects.toBeInstanceOf(ConflictException);
  });

  it('createSignedData rethrows non-unique errors and publishes failure', async () => {
    prisma.policy_data.create.mockRejectedValue(new Error('insert failed'));

    await expect(service.createSignedData(10, req)).rejects.toThrow('insert failed');
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('ui', expect.objectContaining({ status: 'failed' }));
  });

  it('findAllPolicies returns cached entries when cache is populated', async () => {
    cache.get.mockResolvedValue([{ id: 2, name: 'policy-b' }]);

    await expect(service.findAllPolicies()).resolves.toEqual([{ id: 2, name: 'policy-b' }]);
    expect(prisma.policy_definitions.findMany).not.toHaveBeenCalled();
  });

  it('findAllPolicies bypasses cache and queries prisma', async () => {
    prisma.policy_definitions.findMany.mockResolvedValue([{ id: 3, name: 'policy-c' }]);

    await expect(service.findAllPolicies({ bypassCache: true })).resolves.toEqual([{ id: 3, name: 'policy-c' }]);
    expect(cache.set).toHaveBeenCalledWith('policy_definitions', [{ id: 3, name: 'policy-c' }], { ttl: 0, update: true });
  });

  it('findPolicyByName returns cached full policy by default', async () => {
    cache.get.mockResolvedValue({ id: 1, name: 'policy-a', definition: { a: 1 } });

    await expect(service.findPolicyByName('policy-a')).resolves.toEqual({ id: 1, name: 'policy-a', definition: { a: 1 } });
    expect(prisma.policy_definitions.findFirst).not.toHaveBeenCalled();
  });

  it('findPolicyByName returns cached definition when contentOnly is true', async () => {
    cache.get.mockResolvedValue({ id: 1, name: 'policy-a', definition: { a: 1 } });

    await expect(service.findPolicyByName('policy-a', { bypassCache: false, contentOnly: true })).resolves.toEqual({ a: 1 });
  });

  it('findPolicyByName loads from prisma, caches, and returns full policy when bypassing cache', async () => {
    prisma.policy_definitions.findFirst.mockResolvedValue({ id: 4, name: 'policy-d', definition: { d: 4 } });

    await expect(service.findPolicyByName('policy-d', { bypassCache: true, contentOnly: false })).resolves.toEqual({
      id: 4,
      name: 'policy-d',
      definition: { d: 4 },
    });
    expect(cache.set).toHaveBeenCalledWith('policy_definitions:name:policy-d', { id: 4, name: 'policy-d', definition: { d: 4 } }, { update: true });
  });

  it('findPolicyByName throws NotFoundException when policy is not found', async () => {
    prisma.policy_definitions.findFirst.mockResolvedValue(null);

    await expect(service.findPolicyByName('missing', { bypassCache: true, contentOnly: false })).rejects.toBeInstanceOf(NotFoundException);
  });

  it('findSignedDataByEmail queries policy_data include for request user email', async () => {
    prisma.policy_definitions.findMany.mockResolvedValue([{ id: 5, name: 'policy-e', policy_data: [] }]);

    await expect(service.findSignedDataByEmail(req)).resolves.toEqual([{ id: 5, name: 'policy-e', policy_data: [] }]);
    expect(prisma.policy_definitions.findMany).toHaveBeenCalledWith({
      distinct: ['name'],
      orderBy: { name: 'desc' },
      include: {
        policy_data: {
          where: {
            email: 'user@example.com',
          },
        },
      },
    });
  });
});
