import { NotFoundException } from '@nestjs/common';
import { FootprintsService } from './footprints.service';

describe('FootprintsService', () => {
  let service: FootprintsService;
  const prismaMock = {
    organizations: {
      findUnique: jest.fn(),
    },
    emission_scopes: {
      findFirst: jest.fn(),
    },
    facility_footprints: {
      upsert: jest.fn(),
      findMany: jest.fn(),
      delete: jest.fn(),
    },
    organization_facilities: {
      update: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new FootprintsService(prismaMock as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create throws when org does not exist', async () => {
    prismaMock.organizations.findUnique.mockResolvedValue(null);

    await expect(service.create('org_missing', [])).rejects.toBeInstanceOf(NotFoundException);
  });

  it('create throws when facility is not found in org', async () => {
    prismaMock.organizations.findUnique.mockResolvedValue({
      id: 'org_1',
      name: 'Org 1',
      facilities: [{ id: 'fac_1', name: 'Facility 1' }],
    });

    await expect(
      service.create('org_1', [
        {
          facility_id: 'fac_2',
          facility_name: 'Facility 2',
          periods: [],
        },
      ] as any),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('create upserts periods, enriches scope labels, updates facility names, and returns grouped result', async () => {
    prismaMock.organizations.findUnique.mockResolvedValue({
      id: 'org_1',
      name: 'Org 1',
      facilities: [{ id: 'fac_1', name: 'Old Facility Name' }],
    });
    prismaMock.emission_scopes.findFirst.mockResolvedValue({ subcategory_label: 'Combustion' });
    prismaMock.facility_footprints.upsert.mockImplementation(async ({ create }: any) => ({
      ...create,
      emissions: create.emissions,
    }));
    prismaMock.organization_facilities.update.mockResolvedValue({ id: 'fac_1', name: 'New Facility Name' });
    const groupedResult = [
      {
        facility_id: 'fac_1',
        facility_name: 'New Facility Name',
        periods: [{ id: 'fp_1' }],
      },
    ];
    const groupedSpy = jest.spyOn(service, 'getAllFacilityFootprintsByPeriod').mockResolvedValue(groupedResult as any);

    const payload = [
      {
        facility_id: 'fac_1',
        facility_name: 'New Facility Name',
        periods: [
          {
            facility_id: 'fac_1',
            type: 'year',
            value: 2024,
            emissions: [
              {
                scope: { ghg_category: 1, ghg_subcategory: 101, label: 'Scope 1' },
                activities: [{ name: 'Natural gas', tco2e: 12.34 }],
              },
            ],
          },
        ],
      },
    ] as any;

    await expect(service.create('org_1', payload)).resolves.toEqual(groupedResult);
    expect(prismaMock.emission_scopes.findFirst).toHaveBeenCalledWith({
      where: {
        ghg_subcategory: 101,
      },
    });
    expect(payload[0].periods[0].emissions[0].scope.subcategory_label).toBe('Combustion');
    expect(prismaMock.facility_footprints.upsert).toHaveBeenCalledTimes(1);
    expect(prismaMock.organization_facilities.update).toHaveBeenCalledWith({
      where: { id: 'fac_1' },
      data: { name: 'New Facility Name' },
    });
    expect(groupedSpy).toHaveBeenCalledWith('org_1');
  });

  it('create resolves each emission subcategory independently before persisting the period', async () => {
    prismaMock.organizations.findUnique.mockResolvedValue({
      id: 'org_1',
      name: 'Org 1',
      facilities: [{ id: 'fac_1', name: 'Facility One' }],
    });
    prismaMock.emission_scopes.findFirst.mockImplementation(async ({ where }: any) => {
      if (where.ghg_subcategory === 101) return { subcategory_label: 'Combustion' };
      if (where.ghg_subcategory === 202) return { subcategory_label: 'Purchased electricity' };
      return null;
    });
    prismaMock.facility_footprints.upsert.mockImplementation(async ({ create }: any) => create);
    prismaMock.facility_footprints.findMany.mockResolvedValue([]);
    prismaMock.organization_facilities.update.mockResolvedValue({ id: 'fac_1', name: 'Facility One' });

    const emissions = [
      { scope: { ghg_category: 1, ghg_subcategory: 101, label: 'Scope 1' }, activities: [{ name: 'Gas', tco2e: 12 }] },
      { scope: { ghg_category: 2, ghg_subcategory: 202, label: 'Scope 2' }, activities: [{ name: 'Electricity', tco2e: 8 }] },
      {
        scope: { ghg_category: 3, ghg_subcategory: 303, label: 'Scope 3', subcategory_label: 'Existing label' },
        activities: [{ name: 'Other', tco2e: 2 }],
      },
    ];

    await service.create('org_1', [
      {
        facility_id: 'fac_1',
        facility_name: 'Facility One',
        periods: [{ facility_id: 'fac_1', type: 'year', value: 2024, emissions } as any],
      },
    ]);

    const expectedEmissions = [
      {
        scope: { ghg_category: 1, ghg_subcategory: 101, label: 'Scope 1', subcategory_label: 'Combustion' },
        activities: [{ name: 'Gas', tco2e: 12 }],
      },
      {
        scope: { ghg_category: 2, ghg_subcategory: 202, label: 'Scope 2', subcategory_label: 'Purchased electricity' },
        activities: [{ name: 'Electricity', tco2e: 8 }],
      },
      {
        scope: { ghg_category: 3, ghg_subcategory: 303, label: 'Scope 3', subcategory_label: 'Existing label' },
        activities: [{ name: 'Other', tco2e: 2 }],
      },
    ];
    expect(prismaMock.facility_footprints.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        create: expect.objectContaining({ emissions: expectedEmissions }),
        update: expect.objectContaining({ emissions: expectedEmissions }),
      }),
    );
    expect(prismaMock.emission_scopes.findFirst.mock.calls.map(([query]) => query.where.ghg_subcategory)).toEqual([101, 202, 303]);
  });

  it.each([undefined, 0])('create skips first-emission subcategory %s without affecting later emissions', async firstSubcategory => {
    prismaMock.organizations.findUnique.mockResolvedValue({
      id: 'org_1',
      name: 'Org 1',
      facilities: [{ id: 'fac_1', name: 'Facility One' }],
    });
    prismaMock.emission_scopes.findFirst.mockImplementation(async ({ where }: any) =>
      where.ghg_subcategory === 202 ? { subcategory_label: 'Purchased electricity' } : null,
    );
    prismaMock.facility_footprints.upsert.mockImplementation(async ({ create }: any) => create);
    prismaMock.facility_footprints.findMany.mockResolvedValue([]);
    prismaMock.organization_facilities.update.mockResolvedValue({ id: 'fac_1', name: 'Facility One' });
    const emissions = [
      { scope: { ghg_category: 1, ghg_subcategory: firstSubcategory, label: 'Scope 1' }, activities: [] },
      { scope: { ghg_category: 2, ghg_subcategory: 202, label: 'Scope 2' }, activities: [] },
    ];

    await service.create('org_1', [
      {
        facility_id: 'fac_1',
        facility_name: 'Facility One',
        periods: [{ facility_id: 'fac_1', type: 'year', value: 2024, emissions } as any],
      },
    ]);

    expect(emissions[0].scope).not.toHaveProperty('subcategory_label');
    expect(emissions[1].scope).toEqual({
      ghg_category: 2,
      ghg_subcategory: 202,
      label: 'Scope 2',
      subcategory_label: 'Purchased electricity',
    });
    expect(prismaMock.emission_scopes.findFirst).toHaveBeenCalledTimes(1);
    expect(prismaMock.emission_scopes.findFirst).toHaveBeenCalledWith({ where: { ghg_subcategory: 202 } });
  });

  it('getAllFacilityFootprintsByPeriod groups footprints by facility and hydrates names', async () => {
    prismaMock.facility_footprints.findMany.mockResolvedValue([
      { id: 'fp_1', facility_id: 'fac_1', type: 'year', value: 2024 },
      { id: 'fp_2', facility_id: 'fac_1', type: 'year', value: 2023 },
      { id: 'fp_3', facility_id: 'fac_2', type: 'quarter', value: 1 },
    ]);
    prismaMock.organization_facilities.findUnique.mockImplementation(async ({ where }: any) => {
      if (where.id === 'fac_1') return { id: 'fac_1', name: 'Facility One' };
      return { id: 'fac_2', name: 'Facility Two' };
    });

    const result = await service.getAllFacilityFootprintsByPeriod('org_1');

    expect(prismaMock.facility_footprints.findMany).toHaveBeenCalledWith({ where: { organization_id: 'org_1' } });
    expect(result).toHaveLength(2);
    expect(result.find(item => item.facility_id === 'fac_1')?.periods).toHaveLength(2);
    expect(result.find(item => item.facility_id === 'fac_2')?.facility_name).toBe('Facility Two');
  });

  it('findAll delegates to facility_footprints.findMany', async () => {
    prismaMock.facility_footprints.findMany.mockResolvedValue([{ id: 'fp_1' }]);

    await expect(service.findAll()).resolves.toEqual([{ id: 'fp_1' }]);
  });

  it('findAllByOrg delegates to getAllFacilityFootprintsByPeriod', async () => {
    const groupedSpy = jest.spyOn(service, 'getAllFacilityFootprintsByPeriod').mockResolvedValue([{ facility_id: 'fac_1' }] as any);

    await expect(service.findAllByOrg('org_1')).resolves.toEqual([{ facility_id: 'fac_1' }]);
    expect(groupedSpy).toHaveBeenCalledWith('org_1');
  });

  it('findAllByOrgFacility returns periods for org+facility', async () => {
    prismaMock.facility_footprints.findMany.mockResolvedValue([{ id: 'fp_1' }, { id: 'fp_2' }]);

    await expect(service.findAllByOrgFacility('org_1', 'fac_1')).resolves.toEqual({ periods: [{ id: 'fp_1' }, { id: 'fp_2' }] });
    expect(prismaMock.facility_footprints.findMany).toHaveBeenCalledWith({
      where: {
        organization_id: 'org_1',
        facility_id: 'fac_1',
      },
    });
  });

  it('findOne filters by org+facility+id', async () => {
    prismaMock.facility_footprints.findMany.mockResolvedValue([{ id: 'fp_1' }]);

    await expect(service.findOne('org_1', 'fac_1', 'fp_1')).resolves.toEqual([{ id: 'fp_1' }]);
    expect(prismaMock.facility_footprints.findMany).toHaveBeenCalledWith({
      where: {
        organization_id: 'org_1',
        facility_id: 'fac_1',
        id: 'fp_1',
      },
    });
  });

  it('remove deletes by org+facility+id', async () => {
    prismaMock.facility_footprints.delete.mockResolvedValue({ id: 'fp_1' });

    await expect(service.remove('org_1', 'fac_1', 'fp_1')).resolves.toEqual({ id: 'fp_1' });
    expect(prismaMock.facility_footprints.delete).toHaveBeenCalledWith({
      where: {
        organization_id: 'org_1',
        facility_id: 'fac_1',
        id: 'fp_1',
      },
    });
  });
});
