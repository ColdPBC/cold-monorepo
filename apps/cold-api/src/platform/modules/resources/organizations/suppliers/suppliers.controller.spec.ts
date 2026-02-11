import { SuppliersController } from './suppliers.controller';
import { SuppliersService } from './suppliers.service';

describe('SuppliersController', () => {
  let controller: SuppliersController;

  const service = {
    findAll: jest.fn(),
    getClaimNames: jest.fn(),
    getClaimList: jest.fn(),
    findById: jest.fn(),
  };

  const req = { organization: { id: 'o1' }, user: { id: 'u1' } } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new SuppliersController(service as unknown as SuppliersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll delegates to service', () => {
    service.findAll.mockReturnValue('ok');

    expect(controller.findAll(req, 'org1')).toBe('ok');
    expect(service.findAll).toHaveBeenCalledWith(req.organization, req.user);
  });

  it('getClaimNames delegates to service', () => {
    service.getClaimNames.mockReturnValue('ok');

    expect(controller.getClaimNames(req, 'org1')).toBe('ok');
    expect(service.getClaimNames).toHaveBeenCalledWith(req.organization, req.user);
  });

  it('getClaimList delegates to service', () => {
    service.getClaimList.mockReturnValue('ok');

    expect(controller.getClaimList(req, 'org1')).toBe('ok');
    expect(service.getClaimList).toHaveBeenCalledWith(req.organization, req.user);
  });

  it('findOne delegates to service', () => {
    service.findById.mockReturnValue('ok');

    expect(controller.findOne(req, 'org1', 'id1')).toBe('ok');
    expect(service.findById).toHaveBeenCalledWith(req.organization, req.user, 'id1');
  });
});
