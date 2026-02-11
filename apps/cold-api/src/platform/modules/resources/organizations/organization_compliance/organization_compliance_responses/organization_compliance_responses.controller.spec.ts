import { OrganizationComplianceResponsesController } from './organization_compliance_responses.controller';
import { OrganizationComplianceResponsesService } from './organization_compliance_responses.service';

describe('OrganizationComplianceResponsesController', () => {
  let controller: OrganizationComplianceResponsesController;

  const service = {
    upsert: jest.fn(),
    findAllByCompliance: jest.fn(),
    findAllByGroupId: jest.fn(),
    getQuestionsBySectionId: jest.fn(),
    getQuestionResponseById: jest.fn(),
    deleteReponseByType: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const req = { user: { id: 'u1' }, organization: { id: 'o1' } } as any;
  beforeEach(() => {
    jest.clearAllMocks();
    controller = new OrganizationComplianceResponsesController(service as unknown as OrganizationComplianceResponsesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('upsertOrgComplianceResponse delegates to service', () => {
    service.upsert.mockReturnValue('ok');
    const response = { id: 1 } as any;

    expect(controller.upsertOrgComplianceResponse('comp', 'sg1', 's1', 'q1', response, req)).toBe('ok');
    expect(service.upsert).toHaveBeenCalledWith('comp', 'sg1', 's1', 'q1', response, req);
  });

  it('getGroupResponses delegates to service', () => {
    service.findAllByCompliance.mockReturnValue('ok');

    expect(controller.getGroupResponses('comp', req, 10, 5, true, false, true)).toBe('ok');
    expect(service.findAllByCompliance).toHaveBeenCalledWith('comp', req, {
      references: false,
      responses: true,
      take: 10,
      skip: 5,
      bpc: true,
    });
  });

  it('getResponsesByGroup delegates to service', () => {
    service.findAllByGroupId.mockReturnValue('ok');

    expect(controller.getResponsesByGroup('comp', 'sg1', req, 20, 2, true, false)).toBe('ok');
    expect(service.findAllByGroupId).toHaveBeenCalledWith('comp', 'sg1', req, {
      references: true,
      responses: false,
      take: 20,
      skip: 2,
    });
  });

  it('findQuestionsBySectionId delegates to service', () => {
    service.getQuestionsBySectionId.mockReturnValue('ok');

    expect(controller.findQuestionsBySectionId('comp', 'sg1', 's1', req, 11, 3, false)).toBe('ok');
    expect(service.getQuestionsBySectionId).toHaveBeenCalledWith('comp', 'sg1', 's1', req, {
      responses: false,
      take: 11,
      skip: 3,
    });
  });

  it('getResponseDetailsById delegates to service', () => {
    service.getQuestionResponseById.mockReturnValue('ok');

    expect(controller.getResponseDetailsById('comp', 'sg1', 's1', 'q1', req, true, false)).toBe('ok');
    expect(service.getQuestionResponseById).toHaveBeenCalledWith('comp', 'sg1', 's1', 'q1', req, {
      responses: true,
      references: false,
    });
  });

  it('deleteQuestionResponseByType delegates to service', () => {
    service.deleteReponseByType.mockReturnValue('ok');

    expect(controller.deleteQuestionResponseByType('comp', 'sg1', 's1', 'q1', req, 'all')).toBe('ok');
    expect(service.deleteReponseByType).toHaveBeenCalledWith('comp', 'sg1', 's1', 'q1', req, 'all');
  });

  it('findAllComplianceResponses delegates to service', () => {
    service.findAllByCompliance.mockReturnValue('ok');

    expect(controller.findAllComplianceResponses('comp', req, 50, 10, true)).toBe('ok');
    expect(service.findAllByCompliance).toHaveBeenCalledWith('comp', req, { take: 50, skip: 10, bpc: true });
  });

  it('getComplianceResponsesCounts delegates to service', async () => {
    service.findAllByCompliance.mockResolvedValue({ counts: 1 });

    await expect(controller.getComplianceResponsesCounts('comp', req, true)).resolves.toEqual({ counts: 1 });
    expect(service.findAllByCompliance).toHaveBeenCalledWith('comp', req, { onlyCounts: true, bpc: true });
  });

  it('findById delegates to service', () => {
    service.findOne.mockReturnValue('ok');

    expect(controller.findById('comp', 42, req)).toBe('ok');
    expect(service.findOne).toHaveBeenCalledWith('comp', 42, req);
  });

  it('remove delegates to service', () => {
    service.remove.mockReturnValue('ok');

    expect(controller.remove('org1', 'comp', '123')).toBe('ok');
    expect(service.remove).toHaveBeenCalledWith(123);
  });
});
