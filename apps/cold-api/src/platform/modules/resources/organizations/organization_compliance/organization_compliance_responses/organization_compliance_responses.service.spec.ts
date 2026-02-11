import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { OrganizationComplianceResponsesService } from './organization_compliance_responses.service';

describe('OrganizationComplianceResponsesService', () => {
  let service: OrganizationComplianceResponsesService;

  const repository = {
    updateComplianceResponse: jest.fn(),
    getScoredComplianceQuestionsByName: jest.fn(),
    getScoredComplianceQuestionBySection: jest.fn(),
    getScoredComplianceQuestionById: jest.fn(),
    getScoredComplianceQuestionBySectionGroup: jest.fn(),
    getComplianceResponses: jest.fn(),
    getComplianceResponseById: jest.fn(),
    deleteComplianceResponse: jest.fn(),
  };

  const req = {
    organization: { id: 'org_1' },
    user: { id: 'u1' },
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new OrganizationComplianceResponsesService(repository as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('upsert delegates to repository', () => {
    repository.updateComplianceResponse.mockReturnValue('ok');

    expect(service.upsert('comp', 'sg1', 's1', 'q1', { answer: 'yes' }, req)).toBe('ok');
    expect(repository.updateComplianceResponse).toHaveBeenCalledWith(req.organization, 'comp', 'sg1', 's1', 'q1', req.user, { answer: 'yes' });
  });

  it('findAllByCompliance sets defaults and delegates', async () => {
    repository.getScoredComplianceQuestionsByName.mockResolvedValue(['x']);
    const options = { take: 0, skip: 0 } as any;

    await expect(service.findAllByCompliance('comp', req, options)).resolves.toEqual(['x']);
    expect(options.take).toBe(400);
    expect(options.skip).toBe(0);
  });

  it('findAllByCompliance rethrows not found errors', async () => {
    repository.getScoredComplianceQuestionsByName.mockRejectedValue(new NotFoundException('missing'));

    await expect(service.findAllByCompliance('comp', req, {} as any)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('findAllByCompliance wraps generic errors as unprocessable', async () => {
    repository.getScoredComplianceQuestionsByName.mockRejectedValue(new Error('boom'));

    await expect(service.findAllByCompliance('comp', req, {} as any)).rejects.toBeInstanceOf(UnprocessableEntityException);
  });

  it('getQuestionsBySectionId sets defaults and delegates', () => {
    repository.getScoredComplianceQuestionBySection.mockReturnValue('ok');
    const options = {} as any;

    expect(service.getQuestionsBySectionId('comp', 'sg1', 's1', req, options)).toBe('ok');
    expect(options.take).toBe(100);
    expect(options.skip).toBe(0);
    expect(repository.getScoredComplianceQuestionBySection).toHaveBeenCalledWith(req.organization, 'comp', 'sg1', 's1', req.user, options);
  });

  it('getQuestionResponseById sets defaults and delegates', () => {
    repository.getScoredComplianceQuestionById.mockReturnValue('ok');
    const options = {} as any;

    expect(service.getQuestionResponseById('comp', 'sg1', 's1', 'q1', req, options)).toBe('ok');
    expect(options.take).toBe(100);
    expect(options.skip).toBe(0);
    expect(repository.getScoredComplianceQuestionById).toHaveBeenCalledWith(req.organization, 'comp', 'sg1', 's1', 'q1', req.user, options);
  });

  it('findAllByGroupId normalizes options and delegates', () => {
    repository.getScoredComplianceQuestionBySectionGroup.mockReturnValue('ok');
    const options = { take: -1, skip: -1 } as any;

    expect(service.findAllByGroupId('comp', 'csg1', req, options)).toBe('ok');
    expect(options.take).toBe(100);
    expect(options.skip).toBe(0);
    expect(repository.getScoredComplianceQuestionBySectionGroup).toHaveBeenCalledWith(req.organization, 'comp', 'csg1', req.user, options);
  });

  it('findAll applies defaults through formatter and delegates', () => {
    repository.getComplianceResponses.mockReturnValue('ok');

    expect(service.findAll('org1', 'comp', 'sg1', 's1', 'q1', req, undefined)).toBe('ok');
    expect(repository.getComplianceResponses).toHaveBeenCalledWith(req.organization, 'comp', req.user, { take: 100, skip: 0 });
  });

  it('findOne sets defaults and delegates', () => {
    repository.getComplianceResponseById.mockReturnValue('ok');
    const options = {} as any;

    expect(service.findOne('comp', 5, req, options)).toBe('ok');
    expect(options.take).toBe(100);
    expect(options.skip).toBe(0);
    expect(repository.getComplianceResponseById).toHaveBeenCalledWith(req.organization, 'comp', req.user, 5, options);
  });

  it('deleteReponseByType delegates to repository', () => {
    repository.deleteComplianceResponse.mockReturnValue('ok');

    expect(service.deleteReponseByType('comp', 'sg1', 's1', 'q1', req, 'all')).toBe('ok');
    expect(repository.deleteComplianceResponse).toHaveBeenCalledWith(req.organization, 'comp', 'sg1', 's1', 'q1', req.user, 'all');
  });

  it('remove returns placeholder message', () => {
    expect(service.remove(42)).toBe('This action removes a #42 organizationComplianceResponse');
  });
});
