import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;

  const service = {
    create: jest.fn(),
    createMany: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };
  beforeEach(() => {
    jest.clearAllMocks();
    controller = new ProductsController(service as unknown as ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createOne delegates to service', () => {
    service.create.mockReturnValue('ok');
    const req = {} as any;
    const dto = { name: 'p1' } as any;

    expect(controller.createOne(req, 'org1', dto)).toBe('ok');
    expect(service.create).toHaveBeenCalledWith(req, dto);
  });

  it('createMany delegates to service', () => {
    service.createMany.mockReturnValue('ok');
    const req = {} as any;
    const dto = [{ name: 'p1' }] as any;

    expect(controller.createMany(req, 'org1', dto)).toBe('ok');
    expect(service.createMany).toHaveBeenCalledWith(req, dto);
  });

  it('findAll delegates to service', () => {
    service.findAll.mockReturnValue('ok');
    const req = {} as any;

    expect(controller.findAll(req, 'org1')).toBe('ok');
    expect(service.findAll).toHaveBeenCalledWith(req);
  });

  it('findOneById delegates to service', () => {
    service.findOne.mockReturnValue('ok');
    const req = {} as any;

    expect(controller.findOneById(req, 'org1', 'id1')).toBe('ok');
    expect(service.findOne).toHaveBeenCalledWith(req, { id: 'id1' });
  });

  it('findOneByName delegates to service', () => {
    service.findOne.mockReturnValue('ok');
    const req = {} as any;

    expect(controller.findOneByName(req, 'org1', 'name1')).toBe('ok');
    expect(service.findOne).toHaveBeenCalledWith(req, { name: 'name1' });
  });

  it('updateById delegates to service', () => {
    service.update.mockReturnValue('ok');
    const req = {} as any;
    const dto = { name: 'n1' } as any;

    expect(controller.updateById(req, 'org1', 'id1', dto)).toBe('ok');
    expect(service.update).toHaveBeenCalledWith(req, { id: 'id1' }, dto);
  });

  it('updateByName delegates to service', () => {
    service.update.mockReturnValue('ok');
    const req = {} as any;
    const dto = { name: 'n1' } as any;

    expect(controller.updateByName(req, 'org1', 'name1', dto)).toBe('ok');
    expect(service.update).toHaveBeenCalledWith(req, { name: 'name1' }, dto);
  });

  it('removeById delegates to service', () => {
    service.remove.mockReturnValue('ok');
    const req = {} as any;

    expect(controller.removeById(req, 'org1', 'id1')).toBe('ok');
    expect(service.remove).toHaveBeenCalledWith(req, { id: 'id1' });
  });

  it('removeByName delegates to service', () => {
    service.remove.mockReturnValue('ok');
    const req = {} as any;

    expect(controller.removeByName(req, 'org1', 'name1')).toBe('ok');
    expect(service.remove).toHaveBeenCalledWith(req, { name: 'name1' });
  });
});
