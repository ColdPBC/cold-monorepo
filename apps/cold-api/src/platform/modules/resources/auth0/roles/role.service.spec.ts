import { RoleService } from './role.service';

describe('RoleService', () => {
  const build = () => {
    const cache = {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
    } as any;

    const utilService = {
      init: jest.fn().mockResolvedValue({ headers: { Authorization: 'Bearer token' } }),
    } as any;

    const mqtt = {} as any;

    const service = new RoleService(cache, utilService, mqtt);
    jest.spyOn(service.httpService.axiosRef, 'get').mockResolvedValue({ data: [{ id: 'rol_1', name: 'company:owner' }] } as any);

    return { service, cache, utilService };
  };

  it('should be defined', () => {
    const { service } = build();
    expect(service).toBeDefined();
  });

  it('throws when empty filter object is provided', async () => {
    const { service } = build();
    await expect(service.getRoles({})).rejects.toThrow('must specify either an id or name');
  });

  it('returns cached roles when present', async () => {
    const { service, cache } = build();
    cache.get.mockResolvedValue([{ id: 'rol_1', name: 'company:owner' }]);

    const result = await service.getRoles();

    expect(result).toEqual([{ id: 'rol_1', name: 'company:owner' }]);
    expect(service.httpService.axiosRef.get).not.toHaveBeenCalled();
  });

  it('getRole uses id filter for rol_ values', async () => {
    const { service, cache } = build();
    cache.get.mockResolvedValueOnce(null);
    const spy = jest.spyOn(service, 'getRoles').mockResolvedValue([{ id: 'rol_1', name: 'company:owner' }] as any);

    await service.getRole('rol_1');

    expect(spy).toHaveBeenCalledWith({ id: 'rol_1' });
  });

  it('resolveRoleIdByName returns cached id', async () => {
    const { service, cache } = build();
    cache.get.mockResolvedValue({ id: 'rol_1', name: 'company:owner' });

    const result = await service.resolveRoleIdByName(['company:owner'] as any);

    expect(result).toBe('rol_1');
  });

  it('convertRoleNamesToIds leaves ids and resolves names', async () => {
    const { service } = build();
    jest.spyOn(service, 'resolveRoleIdByName').mockResolvedValue('rol_2');

    const result = await service.convertRoleNamesToIds(['rol_1', 'company:member']);

    expect(result).toEqual(['rol_1', 'rol_2']);
  });
});
