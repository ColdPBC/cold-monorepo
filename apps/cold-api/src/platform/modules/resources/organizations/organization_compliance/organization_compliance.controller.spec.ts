import { OrganizationComplianceController } from './organization_compliance.controller';
import { OrganizationComplianceService } from './organization_compliance.service';

describe('OrganizationComplianceController', () => {
  let controller: OrganizationComplianceController;

  const service = {
    findAll: jest.fn(),
    create: jest.fn(),
    activateAi: jest.fn(),
    findOneByName: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const req = { user: { id: 'u1' }, organization: { id: 'o1' } } as any;
  beforeEach(() => {
    jest.clearAllMocks();
    controller = new OrganizationComplianceController(service as unknown as OrganizationComplianceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll delegates to service', () => {
    service.findAll.mockReturnValue('ok');

    expect(controller.findAll('comp', req)).toBe('ok');
    expect(service.findAll).toHaveBeenCalledWith('comp', req);
  });

  it('create delegates to service', () => {
    service.create.mockReturnValue('ok');
    const dto = { id: 'x' } as any;

    expect(controller.create('comp', 'org1', dto, req)).toBe('ok');
    expect(service.create).toHaveBeenCalledWith('comp', dto, req);
  });

  it('activateAi delegates to service', () => {
    service.activateAi.mockReturnValue('ok');

    expect(controller.activateAi('comp', 'org1', req)).toBe('ok');
    expect(service.activateAi).toHaveBeenCalledWith('org1', req, 'comp');
  });

  it('findOne delegates to service', () => {
    service.findOneByName.mockReturnValue('ok');

    expect(controller.findOne('comp', 'org1', req)).toBe('ok');
    expect(service.findOneByName).toHaveBeenCalledWith('comp', req);
  });

  it('update delegates to service', () => {
    service.update.mockReturnValue('ok');
    const dto = { id: 'x' } as any;

    expect(controller.update('comp', 'org1', dto, req)).toBe('ok');
    expect(service.update).toHaveBeenCalledWith('comp', dto, req);
  });

  it('remove delegates to service', () => {
    service.remove.mockReturnValue('ok');

    expect(controller.remove('comp', 'org1', req)).toBe('ok');
    expect(service.remove).toHaveBeenCalledWith('comp', req);
  });
});
