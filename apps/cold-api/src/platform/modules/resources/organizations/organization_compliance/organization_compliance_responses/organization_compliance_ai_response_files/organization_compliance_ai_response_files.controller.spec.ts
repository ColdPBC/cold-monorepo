import { OrganizationComplianceAiResponseFilesController } from './organization_compliance_ai_response_files.controller';
import { OrganizationComplianceAiResponseFilesService } from './organization_compliance_ai_response_files.service';

describe('OrganizationComplianceAiResponseFilesController', () => {
  let controller: OrganizationComplianceAiResponseFilesController;

  const service = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const req = { organization: { id: 'o1' }, user: { id: 'u1' } } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new OrganizationComplianceAiResponseFilesController(service as unknown as OrganizationComplianceAiResponseFilesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create delegates to service', () => {
    service.create.mockReturnValue('ok');
    const dto = { file: 'a' };

    expect(controller.create('org1', 'comp', 'ai1', dto, req)).toBe('ok');
    expect(service.create).toHaveBeenCalledWith(req.organization, 'comp', 'ai1', dto, req.user);
  });

  it('findAll delegates to service', () => {
    service.findAll.mockReturnValue('ok');

    expect(controller.findAll('org1', 'comp', 'ai1', req)).toBe('ok');
    expect(service.findAll).toHaveBeenCalledWith(req.organization, 'comp', 'ai1', req.user);
  });

  it('findOne delegates to service', () => {
    service.findOne.mockReturnValue('ok');

    expect(controller.findOne('org1', 'comp', 'ai1', 'id1', req)).toBe('ok');
    expect(service.findOne).toHaveBeenCalledWith(req.organization, 'comp', 'ai1', 'id1', req.user);
  });

  it('update delegates to service', () => {
    service.update.mockReturnValue('ok');
    const dto = { file: 'b' };

    expect(controller.update('org1', 'comp', 'ai1', 'id1', dto, req)).toBe('ok');
    expect(service.update).toHaveBeenCalledWith(req.organization, 'comp', 'ai1', 'id1', dto, req.user);
  });

  it('remove delegates to service', () => {
    service.remove.mockReturnValue('ok');

    expect(controller.remove('org1', 'comp', 'ai1', 'id1', req)).toBe('ok');
    expect(service.remove).toHaveBeenCalledWith(req.organization, 'comp', 'ai1', 'id1', req.user);
  });
});
