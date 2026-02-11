import { MaterialsController } from './materials.controller';

describe('MaterialsController', () => {
  let controller: MaterialsController;
  const materialsServiceMock = {
    create: jest.fn(),
    createSupplierMaterial: jest.fn(),
    deleteSupplierMaterial: jest.fn(),
    createMany: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new MaterialsController(materialsServiceMock as any);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create delegates to service.create', async () => {
    const req = { organization: { id: 'org_1' } } as any;
    const dto = { name: 'Material A' };
    materialsServiceMock.create.mockResolvedValue({ id: 'mat_1' });

    await expect(controller.create(req, 'org_1', dto)).resolves.toEqual({ id: 'mat_1' });
    expect(materialsServiceMock.create).toHaveBeenCalledWith(req, dto);
  });

  it('createMaterialSupplier delegates to service.createSupplierMaterial', async () => {
    const req = { organization: { id: 'org_1' } } as any;
    materialsServiceMock.createSupplierMaterial.mockResolvedValue({ id: 'ms_1' });

    await expect(controller.createMaterialSupplier(req, 'org_1', 'mat_1', 'sup_1')).resolves.toEqual({ id: 'ms_1' });
    expect(materialsServiceMock.createSupplierMaterial).toHaveBeenCalledWith(req, 'mat_1', 'sup_1');
  });

  it('delete delegates to service.deleteSupplierMaterial', async () => {
    const req = { organization: { id: 'org_1' } } as any;
    materialsServiceMock.deleteSupplierMaterial.mockResolvedValue({ deleted: true });

    await expect(controller.delete(req, 'org_1', 'mat_1', 'sup_1')).resolves.toEqual({ deleted: true });
    expect(materialsServiceMock.deleteSupplierMaterial).toHaveBeenCalledWith(req, 'mat_1', 'sup_1');
  });

  it('createMany delegates to service.createMany', async () => {
    const req = { organization: { id: 'org_1' } } as any;
    const dto = [{ name: 'Material A' }];
    materialsServiceMock.createMany.mockResolvedValue([{ id: 'mat_1' }]);

    await expect(controller.createMany(req, 'org_1', dto)).resolves.toEqual([{ id: 'mat_1' }]);
    expect(materialsServiceMock.createMany).toHaveBeenCalledWith(req, dto);
  });

  it('findAll delegates to service.findAll', async () => {
    const req = { organization: { id: 'org_1' } } as any;
    materialsServiceMock.findAll.mockResolvedValue([{ id: 'mat_1' }]);

    await expect(controller.findAll(req, 'org_1')).resolves.toEqual([{ id: 'mat_1' }]);
    expect(materialsServiceMock.findAll).toHaveBeenCalledWith(req);
  });

  it('findOne delegates to service.findOne', async () => {
    const req = { organization: { id: 'org_1' } } as any;
    materialsServiceMock.findOne.mockResolvedValue({ id: 'mat_1' });

    await expect(controller.findOne(req, 'org_1', 'mat_1')).resolves.toEqual({ id: 'mat_1' });
    expect(materialsServiceMock.findOne).toHaveBeenCalledWith(req, 'mat_1');
  });

  it('update delegates to service.update', async () => {
    const req = { organization: { id: 'org_1' } } as any;
    const dto = { name: 'Material B' };
    materialsServiceMock.update.mockResolvedValue({ id: 'mat_1', name: 'Material B' });

    await expect(controller.update(req, 'org_1', 'mat_1', dto)).resolves.toEqual({ id: 'mat_1', name: 'Material B' });
    expect(materialsServiceMock.update).toHaveBeenCalledWith(req, 'mat_1', dto);
  });

  it('remove delegates to service.remove', async () => {
    const req = { organization: { id: 'org_1' } } as any;
    materialsServiceMock.remove.mockResolvedValue({ id: 'mat_1' });

    await expect(controller.remove(req, 'org_1', 'mat_1')).resolves.toEqual({ id: 'mat_1' });
    expect(materialsServiceMock.remove).toHaveBeenCalledWith(req, 'mat_1');
  });
});
