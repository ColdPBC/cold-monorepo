import { SustainabilityAttributesController } from './sustainability_attributes.controller';
import { SustainabilityAttributesService } from './sustainability_attributes.service';

describe('SustainabilityAttributesController', () => {
  let controller: SustainabilityAttributesController;

  const service = {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByName: jest.fn(),
    remove: jest.fn(),
  };

  const req = { organization: { id: 'o1' }, user: { id: 'u1' } } as any;
  beforeEach(() => {
    jest.clearAllMocks();
    controller = new SustainabilityAttributesController(service as unknown as SustainabilityAttributesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create delegates to service', () => {
    service.create.mockReturnValue('ok');
    const dto = { name: 'attr' } as any;

    expect(controller.create(req, dto)).toBe('ok');
    expect(service.create).toHaveBeenCalledWith(req.organization, req.user, dto);
  });

  it('update sets id then delegates to service', () => {
    service.update.mockReturnValue('ok');
    const dto = { name: 'attr' } as any;

    expect(controller.update(req, 'id1', dto)).toBe('ok');
    expect(dto.id).toBe('id1');
    expect(service.update).toHaveBeenCalledWith(req.organization, req.user, dto);
  });

  it('findAll delegates to service', () => {
    service.findAll.mockReturnValue('ok');

    expect(controller.findAll()).toBe('ok');
    expect(service.findAll).toHaveBeenCalled();
  });

  it('findById delegates to service', () => {
    service.findById.mockReturnValue('ok');

    expect(controller.findById(req, 'id1')).toBe('ok');
    expect(service.findById).toHaveBeenCalledWith(req.organization, req.user, 'id1');
  });

  it('findByName delegates to service', () => {
    service.findByName.mockReturnValue('ok');

    expect(controller.findByName(req, 'name1')).toBe('ok');
    expect(service.findByName).toHaveBeenCalledWith(req.organization, req.user, 'name1');
  });

  it('remove delegates to service', () => {
    service.remove.mockReturnValue('ok');

    expect(controller.remove(req, 'id1')).toBe('ok');
    expect(service.remove).toHaveBeenCalledWith(req.organization, req.user, 'id1');
  });
});
