import { MaterialsService } from './materials.service';

describe('MaterialsService', () => {
  let service: MaterialsService;
  const repositoryMock = {
    createMaterial: jest.fn(),
    createSupplierMaterial: jest.fn(),
    removeMaterialSupplier: jest.fn(),
    createMaterials: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    updateMaterials: jest.fn(),
    remove: jest.fn(),
  };
  const req = {
    organization: { id: 'org_1' },
    user: { coldclimate_claims: { email: 'user@example.com' } },
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new MaterialsService(repositoryMock as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create delegates to repository.createMaterial', async () => {
    const dto = { name: 'Material A' };
    repositoryMock.createMaterial.mockResolvedValue({ id: 'mat_1' });

    await expect(service.create(req, dto)).resolves.toEqual({ id: 'mat_1' });
    expect(repositoryMock.createMaterial).toHaveBeenCalledWith(req.organization, req.user, dto);
  });

  it('createSupplierMaterial delegates with mapped payload', async () => {
    repositoryMock.createSupplierMaterial.mockResolvedValue({ id: 'link_1' });

    await expect(service.createSupplierMaterial(req, 'mat_1', 'sup_1')).resolves.toEqual({ id: 'link_1' });
    expect(repositoryMock.createSupplierMaterial).toHaveBeenCalledWith(req.organization, req.user, {
      material_id: 'mat_1',
      supplier_id: 'sup_1',
    });
  });

  it('deleteSupplierMaterial delegates with mapped payload', async () => {
    repositoryMock.removeMaterialSupplier.mockResolvedValue({ deleted: true });

    await expect(service.deleteSupplierMaterial(req, 'mat_1', 'sup_1')).resolves.toEqual({ deleted: true });
    expect(repositoryMock.removeMaterialSupplier).toHaveBeenCalledWith(req.organization, req.user, {
      material_id: 'mat_1',
      supplier_id: 'sup_1',
    });
  });

  it('createMany delegates to repository.createMaterials', async () => {
    const dto = [{ name: 'Material A' }, { name: 'Material B' }];
    repositoryMock.createMaterials.mockResolvedValue([{ id: 'mat_1' }, { id: 'mat_2' }]);

    await expect(service.createMany(req, dto)).resolves.toEqual([{ id: 'mat_1' }, { id: 'mat_2' }]);
    expect(repositoryMock.createMaterials).toHaveBeenCalledWith(req.organization, req.user, dto);
  });

  it('findAll delegates to repository.findAll', async () => {
    repositoryMock.findAll.mockResolvedValue([{ id: 'mat_1' }]);

    await expect(service.findAll(req)).resolves.toEqual([{ id: 'mat_1' }]);
    expect(repositoryMock.findAll).toHaveBeenCalledWith(req.organization, req.user);
  });

  it('findOne delegates with id criteria object', async () => {
    repositoryMock.findOne.mockResolvedValue({ id: 'mat_1' });

    await expect(service.findOne(req, 'mat_1')).resolves.toEqual({ id: 'mat_1' });
    expect(repositoryMock.findOne).toHaveBeenCalledWith(req.organization, req.user, { id: 'mat_1' });
  });

  it('update delegates with id criteria and dto', async () => {
    const dto = { name: 'Material C' };
    repositoryMock.updateMaterials.mockResolvedValue({ id: 'mat_1', name: 'Material C' });

    await expect(service.update(req, 'mat_1', dto)).resolves.toEqual({ id: 'mat_1', name: 'Material C' });
    expect(repositoryMock.updateMaterials).toHaveBeenCalledWith(req.organization, req.user, { id: 'mat_1' }, dto);
  });

  it('remove delegates with id criteria object', async () => {
    repositoryMock.remove.mockResolvedValue({ id: 'mat_1' });

    await expect(service.remove(req, 'mat_1')).resolves.toEqual({ id: 'mat_1' });
    expect(repositoryMock.remove).toHaveBeenCalledWith(req.organization, req.user, { id: 'mat_1' });
  });
});
