import { NotFoundException } from '@nestjs/common';
import { CacheService, IRequest, OrganizationComplianceRepository, OrganizationComplianceStatusesRepository, PrismaService } from '@coldpbc/nest';
import { survey_status_types } from '@prisma/client';
import { OrganizationComplianceStatusesService } from './organization_compliance_statuses.service';

describe('Organization compliance status creation', () => {
  let service: OrganizationComplianceStatusesService;
  let parentRepository: OrganizationComplianceRepository;
  const parents = [
    { id: 'oc_one', organization_id: 'org_one', compliance_definition_name: 'standard', statuses: [], visible: true, compliance_definition: { name: 'standard', sections: [] } },
    { id: 'oc_two', organization_id: 'org_two', compliance_definition_name: 'standard', statuses: [], visible: true, compliance_definition: { name: 'standard', sections: [] } },
  ];
  const prisma = {
    organization_compliance: { findUnique: jest.fn() },
    organization_compliance_statuses: { create: jest.fn() },
  };
  const cache = { delete: jest.fn() };
  const req = { user: { sub: 'user_one', coldclimate_claims: { email: 'member@example.test' } }, organization: { id: 'org_one' } } as unknown as IRequest;
  const storedStatus = {
    id: 'ocs_saved',
    type: 'draft',
    email: 'member@example.test',
    organization_compliance_id: 'oc_one',
    created_at: new Date('2026-01-01T00:00:00Z'),
    updated_at: null,
    deleted: false,
  };

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
    prisma.organization_compliance.findUnique.mockImplementation(
      async ({ where }) =>
        parents.find(
          parent => parent.organization_id === where.orgIdCompNameKey.organization_id && parent.compliance_definition_name === where.orgIdCompNameKey.compliance_definition_name,
        ) ?? null,
    );
    prisma.organization_compliance_statuses.create.mockResolvedValue(storedStatus);
    cache.delete.mockResolvedValue(undefined);
    const client = prisma as unknown as PrismaService;
    parentRepository = new OrganizationComplianceRepository(client, cache as unknown as CacheService);
    const repository = new OrganizationComplianceStatusesRepository(client, parentRepository, cache as unknown as CacheService);
    service = new OrganizationComplianceStatusesService(repository, parentRepository);
  });

  // Observe the real lookup rejection so the old, unawaited implementation fails
  // through the assertions below rather than an unrelated unhandled rejection.
  function observeParentLookupRejection() {
    const lookup = parentRepository.getOrgComplianceDefinitionByName.bind(parentRepository);
    jest.spyOn(parentRepository, 'getOrgComplianceDefinitionByName').mockImplementation((...args) => {
      const result = lookup(...args);
      void result.catch(() => undefined);
      return result;
    });
  }

  it.each(['draft', 'user_submitted', 'cold_submitted'] as survey_status_types[])(
    'links a new %s status to the scoped parent and preserves the supplied fields',
    async statusType => {
      await service.create('org_one', 'standard', statusType, req);

      expect(prisma.organization_compliance.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.organization_compliance.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { orgIdCompNameKey: { organization_id: 'org_one', compliance_definition_name: 'standard' } },
        }),
      );
      expect(prisma.organization_compliance_statuses.create).toHaveBeenCalledTimes(1);
      expect(prisma.organization_compliance_statuses.create).toHaveBeenCalledWith({
        data: {
          id: expect.stringMatching(/^ocs_[a-z][a-z0-9]{23}$/),
          type: statusType,
          email: 'member@example.test',
          organization_compliance_id: 'oc_one',
        },
      });
      expect(cache.delete).toHaveBeenCalledWith('organizations:org_one:compliance:standard:status', true);
    },
  );

  it('uses the other organization’s resolved parent for the same compliance name', async () => {
    const otherReq = { ...req, organization: { id: 'org_two' } } as IRequest;
    await service.create('org_two', 'standard', survey_status_types.draft, otherReq);
    expect(prisma.organization_compliance_statuses.create).toHaveBeenCalledWith({
      data: {
        id: expect.any(String),
        type: 'draft',
        email: 'member@example.test',
        organization_compliance_id: 'oc_two',
      },
    });
    expect(cache.delete).toHaveBeenCalledWith('organizations:org_two:compliance:standard:status', true);
  });

  it('returns the persisted status without changing its response fields', async () => {
    await expect(service.create('org_one', 'standard', survey_status_types.draft, req)).resolves.toBe(storedStatus);
  });

  it('does not invalidate cache or write while parent resolution is pending', async () => {
    let resolveParent!: (parent: (typeof parents)[number]) => void;
    prisma.organization_compliance.findUnique.mockReturnValue(
      new Promise(resolve => {
        resolveParent = resolve;
      }),
    );
    const creation = service.create('org_one', 'standard', survey_status_types.draft, req);
    await Promise.resolve();
    const cacheCallsBeforeResolution = cache.delete.mock.calls.length;
    const writesBeforeResolution = prisma.organization_compliance_statuses.create.mock.calls.length;
    resolveParent(parents[0]);
    await expect(creation).resolves.toBe(storedStatus);

    expect(cacheCallsBeforeResolution).toBe(0);
    expect(writesBeforeResolution).toBe(0);
    expect(prisma.organization_compliance_statuses.create).toHaveBeenCalledTimes(1);
  });

  it('does not invalidate cache or write when the scoped parent is missing', async () => {
    observeParentLookupRejection();
    await expect(service.create('org_one', 'missing', survey_status_types.draft, req)).rejects.toBeInstanceOf(NotFoundException);
    expect(cache.delete).not.toHaveBeenCalled();
    expect(prisma.organization_compliance_statuses.create).not.toHaveBeenCalled();
  });

  it('propagates parent lookup errors before invalidating cache or writing', async () => {
    const failure = new Error('parent lookup unavailable');
    prisma.organization_compliance.findUnique.mockRejectedValue(failure);
    observeParentLookupRejection();
    await expect(service.create('org_one', 'standard', survey_status_types.draft, req)).rejects.toBe(failure);
    expect(cache.delete).not.toHaveBeenCalled();
    expect(prisma.organization_compliance_statuses.create).not.toHaveBeenCalled();
  });

  it('waits for cache invalidation before creating the status', async () => {
    let resolveCache!: () => void;
    cache.delete.mockReturnValue(
      new Promise<void>(resolve => {
        resolveCache = resolve;
      }),
    );
    const creation = service.create('org_one', 'standard', survey_status_types.draft, req);
    await new Promise(resolve => setImmediate(resolve));
    const writesBeforeInvalidation = prisma.organization_compliance_statuses.create.mock.calls.length;
    resolveCache();
    await expect(creation).resolves.toBe(storedStatus);
    expect(writesBeforeInvalidation).toBe(0);
    expect(prisma.organization_compliance_statuses.create).toHaveBeenCalledTimes(1);
  });

  it('preserves cache failure propagation and does not create a status', async () => {
    const failure = new Error('cache unavailable');
    cache.delete.mockRejectedValue(failure);
    await expect(service.create('org_one', 'standard', survey_status_types.draft, req)).rejects.toBe(failure);
    expect(prisma.organization_compliance_statuses.create).not.toHaveBeenCalled();
  });

  it('propagates database create errors unchanged', async () => {
    const failure = new Error('status insert failed');
    prisma.organization_compliance_statuses.create.mockRejectedValue(failure);
    await expect(service.create('org_one', 'standard', survey_status_types.draft, req)).rejects.toBe(failure);
  });
});
