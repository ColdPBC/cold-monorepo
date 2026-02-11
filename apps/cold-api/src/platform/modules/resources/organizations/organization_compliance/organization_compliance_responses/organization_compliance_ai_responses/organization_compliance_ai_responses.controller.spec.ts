import { OrganizationComplianceAiResponsesController } from './organization_compliance_ai_responses.controller';
import { OrganizationComplianceAiResponsesService } from './organization_compliance_ai_responses.service';

describe('OrganizationComplianceAiResponsesController', () => {
  let controller: OrganizationComplianceAiResponsesController;

  const service = {
    createAiResponse: jest.fn(),
    findAllAiResponses: jest.fn(),
    findOneAiResponse: jest.fn(),
    updateAiResponse: jest.fn(),
    removeAllAiResponses: jest.fn(),
    removeAiResponse: jest.fn(),
  };

  const req = { organization: { id: 'o1' }, user: { id: 'u1' } } as any;
  beforeEach(() => {
    jest.clearAllMocks();
    controller = new OrganizationComplianceAiResponsesController(service as unknown as OrganizationComplianceAiResponsesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create delegates to service', () => {
    service.createAiResponse.mockReturnValue('ok');
    const dto = { id: 'ai1' } as any;

    expect(controller.create('org1', 'comp', dto, req)).toBe('ok');
    expect(service.createAiResponse).toHaveBeenCalledWith(req.organization, 'comp', dto, req.user);
  });

  it('findAllAiResponses delegates to service', () => {
    service.findAllAiResponses.mockReturnValue('ok');

    expect(controller.findAllAiResponses('org1', 'comp', req)).toBe('ok');
    expect(service.findAllAiResponses).toHaveBeenCalledWith(req.organization, 'comp', req.user);
  });

  it('findOneAiResponse delegates to service', () => {
    service.findOneAiResponse.mockReturnValue('ok');

    expect(controller.findOneAiResponse('org1', 'comp', 'ai1', req)).toBe('ok');
    expect(service.findOneAiResponse).toHaveBeenCalledWith(req.organization, 'comp', 'ai1', req.user);
  });

  it('updateAiResponse delegates to service', () => {
    service.updateAiResponse.mockReturnValue('ok');
    const dto = { id: 'ai1' } as any;

    expect(controller.updateAiResponse('org1', 'comp', 'ai1', dto, req)).toBe('ok');
    expect(service.updateAiResponse).toHaveBeenCalledWith(req.organization, 'comp', 'ai1', dto, req.user);
  });

  it('removeAllAiResponses delegates to service', () => {
    service.removeAllAiResponses.mockReturnValue('ok');

    expect(controller.removeAllAiResponses('org1', 'comp', req)).toBe('ok');
    expect(service.removeAllAiResponses).toHaveBeenCalledWith(req.organization, 'comp', req.user);
  });

  it('removeAiResponse delegates to service', () => {
    service.removeAiResponse.mockReturnValue('ok');

    expect(controller.removeAiResponse('org1', 'comp', 'ai1', req)).toBe('ok');
    expect(service.removeAiResponse).toHaveBeenCalledWith(req.organization, 'comp', 'ai1', req.user);
  });
});
