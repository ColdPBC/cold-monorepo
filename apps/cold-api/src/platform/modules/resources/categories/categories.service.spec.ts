import { BadRequestException, ConflictException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  const reqBase = {
    user: {
      isColdAdmin: false,
      coldclimate_claims: { org_id: 'org_user_1', email: 'user@example.com', id: 'u1' },
    },
    url: '/categories',
  } as any;

  const build = () => {
    const darkly = {
      subscribeToJsonFlagChanges: jest.fn(),
    } as any;

    const prisma = {
      $connect: jest.fn(),
      category_definitions: {
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      category_data: {
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      organizations: {
        findUnique: jest.fn(),
      },
    } as any;

    const cache = {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
    } as any;

    const mqtt = {
      publishMQTT: jest.fn(),
    } as any;

    const service = new CategoriesService(darkly, prisma, cache, mqtt);
    (service as any).metrics = { event: jest.fn() };
    (service as any).tracer = { getTracer: () => ({ dogstatsd: { increment: jest.fn() } }) };
    return { service, darkly, prisma, cache };
  };

  it('should be defined', () => {
    const { service } = build();
    expect(service).toBeDefined();
  });

  it('onModuleInit connects prisma and subscribes darkly flag', async () => {
    const { service, prisma, darkly } = build();

    await service.onModuleInit();

    expect(prisma.$connect).toHaveBeenCalled();
    expect(darkly.subscribeToJsonFlagChanges).toHaveBeenCalledWith('dynamic-org-white-list', expect.any(Function));
  });

  it('findFull returns cached value when bypassCache is false', async () => {
    const { service, cache, prisma } = build();
    cache.get.mockResolvedValue({ definition: { categories: {} } });

    const result = await service.findFull(reqBase, false);

    expect(result).toEqual({ definition: { categories: {} } });
    expect(prisma.category_definitions.findFirst).not.toHaveBeenCalled();
  });

  it('findFull merges category definition with org submission for non-admin', async () => {
    const { service, prisma, cache } = build();
    prisma.category_definitions.findFirst.mockResolvedValue({ id: 'cd_1', definition: { categories: { a: { x: 1 } } } });
    prisma.category_data.findFirst.mockResolvedValue({ data: { categories: { a: { y: 2 } } } });

    const result = await service.findFull(reqBase, true);

    expect(result).toEqual({ categories: { a: { x: 1, y: 2 } } });
    expect(cache.set).toHaveBeenCalled();
  });

  it('findFull throws when org submission is missing', async () => {
    const { service, prisma } = build();
    prisma.category_definitions.findFirst.mockResolvedValue({ id: 'cd_1', definition: { categories: {} } });
    prisma.category_data.findFirst.mockResolvedValue(null);

    await expect(service.findFull(reqBase, true)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('findByName rejects empty name', async () => {
    const { service } = build();

    await expect(service.findByName(reqBase, false, undefined, '')).rejects.toBeInstanceOf(BadRequestException);
  });

  it('findByName rejects placeholder path token name', async () => {
    const { service } = build();

    await expect(service.findByName(reqBase, false, undefined, ':name')).rejects.toBeInstanceOf(BadRequestException);
  });

  it('findByName returns cached key data when available', async () => {
    const { service, cache } = build();
    cache.get.mockResolvedValue({ test: true });

    const result = await service.findByName(reqBase, false, undefined, 'outerwear');

    expect(result).toEqual({ test: true });
  });

  it('findByName resolves from full definition and caches it', async () => {
    const { service, cache } = build();
    cache.get.mockResolvedValue(null);
    jest.spyOn(service, 'findFull').mockResolvedValue({
      definition: { categories: { outerwear: { definition: { categories: 'outerwear' } } } },
    } as any);

    const result = await service.findByName(reqBase, true, undefined, 'outerwear');

    expect(result).toEqual({ definition: { categories: 'outerwear' } });
    expect(cache.set).toHaveBeenCalled();
  });

  it('findByName throws not found when category key is missing', async () => {
    const { service, cache } = build();
    cache.get.mockResolvedValue(null);
    jest.spyOn(service, 'findFull').mockResolvedValue({ definition: { categories: {} } } as any);

    await expect(service.findByName(reqBase, true, undefined, 'missing')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('getCategoryCacheKey path behavior for admin and org/user context', () => {
    const { service } = build();

    const adminReq = {
      user: {
        isColdAdmin: true,
        coldclimate_claims: { org_id: 'org_user_1' },
      },
    } as any;

    const userReq = reqBase;

    const adminImpersonated = (service as any).getCategoryCacheKey(adminReq, 'org_x', 'abc');
    const adminRoot = (service as any).getCategoryCacheKey(adminReq);
    const userScoped = (service as any).getCategoryCacheKey(userReq, undefined, 'name');

    expect(adminImpersonated).toBe('organizations:org_x:category_definitions:name:abc');
    expect(adminRoot).toBe('category_definitions');
    expect(userScoped).toBe('organizations:org_user_1:category_definitions:name:name');
  });

  it('getCategoryCacheKey uses id keyName for UUID values', () => {
    const { service } = build();
    const userReq = reqBase;
    const uuid = '123e4567-e89b-12d3-a456-426614174000';

    const key = (service as any).getCategoryCacheKey(userReq, undefined, uuid);
    expect(key).toBe(`organizations:org_user_1:category_definitions:id:${uuid}`);
  });

  it('getCategoryCacheKey returns admin impersonated collection key when nameOrId omitted', () => {
    const { service } = build();
    const adminReq = { user: { isColdAdmin: true, coldclimate_claims: { org_id: 'org_admin' } } } as any;

    const key = (service as any).getCategoryCacheKey(adminReq, 'org_imp');
    expect(key).toBe('organizations:org_imp:category_definitions');
  });

  it('getCategoryCacheKey returns admin scoped key by name when orgId omitted', () => {
    const { service } = build();
    const adminReq = { user: { isColdAdmin: true, coldclimate_claims: { org_id: 'org_admin' } } } as any;

    const key = (service as any).getCategoryCacheKey(adminReq, undefined, 'outerwear');
    expect(key).toBe('organizations:undefined:category_definitions:name:outerwear');
  });

  it('getCategoryCacheKey returns user collection key when nameOrId omitted', () => {
    const { service } = build();
    const key = (service as any).getCategoryCacheKey(reqBase);
    expect(key).toBe('organizations:org_user_1:category_definitions');
  });

  it('submitResults throws when organization is not found', async () => {
    const { service, cache, prisma } = build();
    cache.get.mockResolvedValue(null);
    prisma.organizations.findUnique.mockResolvedValue(null);

    await expect(service.submitResults({ name: 'test', definition: {} }, reqBase)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('submitResults creates new category_data submission and returns refreshed full definition', async () => {
    const { service, cache, prisma } = build();
    cache.get.mockResolvedValue({ id: 'org_user_1', display_name: 'Org One' });
    prisma.category_definitions.findFirst.mockResolvedValue({ id: 'def_1', name: 'base', definition: { categories: {} } });
    prisma.category_data.findFirst.mockResolvedValue(null);
    prisma.category_data.create.mockResolvedValue({ id: 'sub_1' });
    jest.spyOn(service, 'findFull').mockResolvedValue({ definition: { categories: {} } } as any);

    await expect(service.submitResults({ name: 'base', definition: { categories: { a: {} } } }, reqBase)).resolves.toEqual({ definition: { categories: {} } });
    expect(prisma.category_data.create).toHaveBeenCalled();
  });

  it('submitResults updates existing submission when one exists', async () => {
    const { service, cache, prisma } = build();
    cache.get.mockResolvedValue({ id: 'org_user_1', display_name: 'Org One' });
    prisma.category_definitions.findFirst.mockResolvedValue({ id: 'def_1', name: 'base', definition: { categories: { a: { old: true } } } });
    prisma.category_data.findFirst.mockResolvedValue({ id: 'sub_1', data: { categories: { a: { old: true } } } });
    prisma.category_data.update.mockResolvedValue({ id: 'sub_1' });
    jest.spyOn(service, 'findFull').mockResolvedValue({ definition: { categories: { a: { new: true } } } } as any);

    await expect(service.submitResults({ name: 'base', definition: { categories: { a: { new: true } } } }, reqBase)).resolves.toEqual({
      definition: { categories: { a: { new: true } } },
    });
    expect(prisma.category_data.update).toHaveBeenCalled();
  });

  it('submitResults maps persistence errors to UnprocessableEntityException', async () => {
    const { service, cache, prisma } = build();
    cache.get.mockResolvedValue({ id: 'org_user_1', display_name: 'Org One' });
    prisma.category_definitions.findFirst.mockResolvedValue({ id: 'def_1', name: 'base', definition: { categories: {} } });
    prisma.category_data.findFirst.mockResolvedValue(null);
    prisma.category_data.create.mockRejectedValue(new Error('write failed'));

    await expect(service.submitResults({ name: 'base', definition: { categories: {} } }, reqBase)).rejects.toBeInstanceOf(UnprocessableEntityException);
  });

  it('submitResults throws UnprocessableEntityException when no category definition exists', async () => {
    const { service, cache, prisma } = build();
    cache.get.mockResolvedValue({ id: 'org_user_1', display_name: 'Org One' });
    prisma.category_definitions.findFirst.mockResolvedValue(null);

    await expect(service.submitResults({ name: 'base', definition: {} }, reqBase)).rejects.toBeInstanceOf(UnprocessableEntityException);
  });

  it('create stores definition, refreshes cache, and returns new definition', async () => {
    const { service, cache, prisma } = build();
    cache.get.mockResolvedValue({ id: 'org_user_1', display_name: 'Org One' });
    prisma.category_definitions.findFirst.mockResolvedValue(null);
    prisma.category_definitions.create.mockResolvedValue({ id: 'def_2', name: 'base', definition: {} });
    jest.spyOn(service, 'findFull').mockResolvedValue({ id: 'def_2', name: 'base', definition: {} } as any);

    await expect(service.create(reqBase, { name: 'base', definition: {} })).resolves.toEqual({ id: 'def_2', name: 'base', definition: {} });
  });

  it('create maps duplicate names to ConflictException', async () => {
    const { service, cache, prisma } = build();
    cache.get.mockResolvedValue({ id: 'org_user_1', display_name: 'Org One' });
    prisma.category_definitions.findFirst.mockResolvedValue({ id: 'existing_1', name: 'base' });

    await expect(service.create(reqBase, { name: 'base', definition: {} })).rejects.toBeInstanceOf(ConflictException);
  });

  it('create maps unique-constraint errors to ConflictException', async () => {
    const { service, cache, prisma } = build();
    cache.get.mockResolvedValue({ id: 'org_user_1', display_name: 'Org One' });
    prisma.category_definitions.findFirst.mockResolvedValue(null);
    prisma.category_definitions.create.mockRejectedValue(new Error('Unique constraint failed on the fields'));

    await expect(service.create(reqBase, { name: 'base', definition: {} })).rejects.toBeInstanceOf(ConflictException);
  });

  it('create maps generic errors to UnprocessableEntityException', async () => {
    const { service, cache, prisma } = build();
    cache.get.mockResolvedValue({ id: 'org_user_1', display_name: 'Org One' });
    prisma.category_definitions.findFirst.mockResolvedValue(null);
    prisma.category_definitions.create.mockRejectedValue(new Error('db create failed'));

    await expect(service.create(reqBase, { name: 'base', definition: {} })).rejects.toBeInstanceOf(UnprocessableEntityException);
  });

  it('update writes definition and returns refreshed full payload', async () => {
    const { service, cache, prisma } = build();
    cache.get.mockResolvedValue({ id: 'org_user_1', display_name: 'Org One' });
    const findFullSpy = jest.spyOn(service, 'findFull');
    findFullSpy.mockResolvedValueOnce({ id: 'def_1', name: 'base', definition: {} } as any);
    findFullSpy.mockResolvedValueOnce({ id: 'def_1', name: 'base', definition: { categories: { a: {} } } } as any);
    prisma.category_definitions.update.mockResolvedValue({ id: 'def_1', name: 'base', definition: { categories: { a: {} } } });

    await expect(service.update('base', { definition: { categories: { a: {} } } }, reqBase)).resolves.toEqual({
      id: 'def_1',
      name: 'base',
      definition: { categories: { a: {} } },
    });
  });

  it('update maps errors to UnprocessableEntityException', async () => {
    const { service, cache, prisma } = build();
    cache.get.mockResolvedValue({ id: 'org_user_1', display_name: 'Org One' });
    jest.spyOn(service, 'findFull').mockResolvedValue({ id: 'def_1', name: 'base', definition: {} } as any);
    prisma.category_definitions.update.mockRejectedValue(new Error('db update failed'));

    await expect(service.update('base', { definition: {} }, reqBase)).rejects.toBeInstanceOf(UnprocessableEntityException);
  });

  it('findFull for admin without orgId returns base definition when cache miss', async () => {
    const { service, cache, prisma } = build();
    const adminReq = {
      ...reqBase,
      user: {
        ...reqBase.user,
        isColdAdmin: true,
      },
    } as any;
    cache.get.mockResolvedValue(null);
    prisma.category_definitions.findFirst.mockResolvedValue({ id: 'def_1', definition: { categories: { base: {} } } });

    await expect(service.findFull(adminReq, false)).resolves.toEqual({ id: 'def_1', definition: { categories: { base: {} } } });
  });

  it('findByName resolves from root categories object when full.definition is missing', async () => {
    const { service, cache } = build();
    cache.get.mockResolvedValue(null);
    jest.spyOn(service, 'findFull').mockResolvedValue({
      categories: { outerwear: { definition: { categories: 'outerwear' } } },
    } as any);

    await expect(service.findByName(reqBase, false, undefined, 'outerwear')).resolves.toEqual({ definition: { categories: 'outerwear' } });
  });
});
