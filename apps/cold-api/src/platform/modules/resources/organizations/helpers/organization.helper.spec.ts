import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CacheService, PrismaService } from '@coldpbc/nest';
import { OrganizationHelper } from './organization.helper';

describe('OrganizationHelper', () => {
  let service: OrganizationHelper;

  const prisma = {
    organizations: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  const cache = {
    get: jest.fn(),
  };

  const makeUser = (overrides: any = {}) =>
    ({
      isColdAdmin: false,
      coldclimate_claims: {
        org_id: 'org_1',
      },
      ...overrides,
    } as any);

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationHelper,
        { provide: PrismaService, useValue: prisma },
        { provide: CacheService, useValue: cache },
      ],
    }).compile();

    service = module.get<OrganizationHelper>(OrganizationHelper);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getOrganizations returns cached organizations when present', async () => {
    cache.get.mockResolvedValue([{ id: 'org_1' }]);

    const out = await service.getOrganizations(false);

    expect(out).toEqual([{ id: 'org_1' }]);
    expect(prisma.organizations.findMany).not.toHaveBeenCalled();
  });

  it('getOrganizations falls back to prisma when cache is empty', async () => {
    cache.get.mockResolvedValue(null);
    prisma.organizations.findMany.mockResolvedValue([{ id: 'org_2' }]);

    const out = await service.getOrganizations(false);

    expect(out).toEqual([{ id: 'org_2' }]);
    expect(prisma.organizations.findMany).toHaveBeenCalled();
  });

  it('getOrganizations bypasses cache when bpc=true and returns current in-memory default', async () => {
    prisma.organizations.findMany.mockResolvedValue([{ id: 'org_3' }]);

    const out = await service.getOrganizations(true);

    expect(cache.get).not.toHaveBeenCalled();
    expect(prisma.organizations.findMany).not.toHaveBeenCalled();
    expect(out).toEqual([]);
  });

  it('getOrganizations throws when db also has no organizations', async () => {
    cache.get.mockResolvedValue(null);
    prisma.organizations.findMany.mockResolvedValue(null);

    await expect(service.getOrganizations(false)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('getOrganizationById blocks unauthorized access', async () => {
    await expect(service.getOrganizationById('org_2', makeUser(), false)).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('getOrganizationById finds organization through cached list when authorized', async () => {
    jest.spyOn(service, 'getOrganizations').mockResolvedValue([{ id: 'org_1' }, { id: 'org_2' }] as any);

    const out = await service.getOrganizationById('org_1', makeUser(), false);

    expect(out).toEqual({ id: 'org_1' });
  });

  it('getOrganizationById queries prisma when bpc=true', async () => {
    prisma.organizations.findUnique.mockResolvedValue({ id: 'org_1' });

    const out = await service.getOrganizationById('org_1', makeUser(), true);

    expect(prisma.organizations.findUnique).toHaveBeenCalledWith({ where: { id: 'org_1' } });
    expect(out).toEqual({ id: 'org_1' });
  });

  it('getOrganizationById throws NotFoundException when org missing', async () => {
    jest.spyOn(service, 'getOrganizations').mockResolvedValue([{ id: 'org_other' }] as any);

    await expect(service.getOrganizationById('org_1', makeUser(), false)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('getOrganizationById allows cold admins to access other orgs', async () => {
    jest.spyOn(service, 'getOrganizations').mockResolvedValue([{ id: 'org_2' }] as any);

    const out = await service.getOrganizationById('org_2', makeUser({ isColdAdmin: true }), false);

    expect(out).toEqual({ id: 'org_2' });
  });
});
