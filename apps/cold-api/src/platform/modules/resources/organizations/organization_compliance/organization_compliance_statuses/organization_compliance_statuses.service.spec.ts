import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CacheService, IRequest, OrganizationComplianceRepository, OrganizationComplianceStatusesRepository, PrismaService } from '@coldpbc/nest';
import { OrganizationComplianceStatusesService } from './organization_compliance_statuses.service';

describe('OrganizationComplianceStatusesService', () => {
  let service: OrganizationComplianceStatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationComplianceStatusesService],
    }).compile();

    service = module.get<OrganizationComplianceStatusesService>(OrganizationComplianceStatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('Organization compliance status scoped lookup', () => {
  let service: OrganizationComplianceStatusesService;
  const records = [
    { id: 'oc_one', organization_id: 'org_one', compliance_definition_name: 'standard', statuses: [{ id: 'status_one', type: 'in_progress' }] },
    { id: 'oc_two', organization_id: 'org_two', compliance_definition_name: 'standard', statuses: [{ id: 'status_two', type: 'completed' }] },
  ];
  const prisma = { organization_compliance: { findUnique: jest.fn() } };
  const req = { user: { sub: 'user_one' }, organization: { id: 'org_one' } } as unknown as IRequest;

  beforeEach(() => {
    jest.resetAllMocks();
    prisma.organization_compliance.findUnique.mockImplementation(async ({ where, select }) => {
      if (where.orgIdCompNameKey) {
        return (
          records.find(
            record => record.organization_id === where.orgIdCompNameKey.organization_id && record.compliance_definition_name === where.orgIdCompNameKey.compliance_definition_name,
          ) ?? null
        );
      }
      const record = records.find(record => record.id === where.id);
      return record ? { id: record.id, organization_id: record.organization_id, statuses: record.statuses.filter(status => status.id === select.statuses.where.id) } : null;
    });
    const client = prisma as unknown as PrismaService;
    const cache = {} as CacheService;
    const parentRepository = new OrganizationComplianceRepository(client, cache);
    const repository = new OrganizationComplianceStatusesRepository(client, parentRepository, cache);
    service = new OrganizationComplianceStatusesService(repository, parentRepository);
  });

  it('resolves the named compliance within the request organization before reading its status', async () => {
    await expect(service.findOne('standard', 'status_one', req)).resolves.toEqual({
      id: 'oc_one',
      organization_id: 'org_one',
      statuses: [{ id: 'status_one', type: 'in_progress' }],
    });
    expect(prisma.organization_compliance.findUnique).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        where: { orgIdCompNameKey: { organization_id: 'org_one', compliance_definition_name: 'standard' } },
      }),
    );
    expect(prisma.organization_compliance.findUnique).toHaveBeenNthCalledWith(2, {
      where: { id: 'oc_one' },
      select: { id: true, organization_id: true, statuses: { where: { id: 'status_one' } } },
    });
  });

  it('does not return a status belonging to another organization with the same compliance name', async () => {
    await expect(service.findOne('standard', 'status_two', req)).resolves.toEqual({ id: 'oc_one', organization_id: 'org_one', statuses: [] });
  });

  it('stops before the status lookup when no scoped parent exists', async () => {
    await expect(service.findOne('missing', 'status_one', req)).rejects.toBeInstanceOf(NotFoundException);
    expect(prisma.organization_compliance.findUnique).toHaveBeenCalledTimes(1);
  });

  it('propagates a scoped parent lookup failure without performing a second query', async () => {
    const failure = new Error('database unavailable');
    prisma.organization_compliance.findUnique.mockRejectedValue(failure);
    await expect(service.findOne('standard', 'status_one', req)).rejects.toBe(failure);
    expect(prisma.organization_compliance.findUnique).toHaveBeenCalledTimes(1);
  });
});
