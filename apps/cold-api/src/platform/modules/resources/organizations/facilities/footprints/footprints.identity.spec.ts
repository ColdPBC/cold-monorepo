import { PrismaService } from '@coldpbc/nest';
import { FacilityFootprint } from './entities/footprint.entity';
import { FootprintsService } from './footprints.service';

describe('Footprint natural-key upsert identity', () => {
  let service: FootprintsService;
  let rows: Array<Record<string, unknown>>;
  const originalEmissions = [{ scope: { ghg_category: 1, label: 'Scope 1' }, activities: [{ name: 'Gas', tco2e: 4 }] }];
  const updatedEmissions = [{ scope: { ghg_category: 1, label: 'Scope 1' }, activities: [{ name: 'Gas', tco2e: 9 }] }];
  const createdAt = new Date('2025-01-01T00:00:00Z');
  const updatedAt = new Date('2025-02-01T00:00:00Z');
  const prisma = {
    organizations: { findUnique: jest.fn() },
    emission_scopes: { findFirst: jest.fn() },
    facility_footprints: { upsert: jest.fn(), findMany: jest.fn(), delete: jest.fn() },
    organization_facilities: { update: jest.fn(), findUnique: jest.fn() },
  };

  function payload(period: Partial<FacilityFootprint> = {}) {
    return [
      {
        facility_id: 'fac_one',
        facility_name: 'Updated facility',
        periods: [{ facility_id: 'stale_input_facility', type: 'year', value: 2024, emissions: structuredClone(updatedEmissions), ...period }],
      },
    ] as Parameters<FootprintsService['create']>[1];
  }

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    rows = [
      {
        id: 'foot_existing',
        facility_id: 'fac_one',
        organization_id: 'org_one',
        type: 'year',
        value: 2024,
        emissions: structuredClone(originalEmissions),
        created_at: createdAt,
        updated_at: updatedAt,
        deleted: false,
      },
    ];
    prisma.organizations.findUnique.mockResolvedValue({ id: 'org_one', name: 'Organization', facilities: [{ id: 'fac_one', name: 'Original facility' }] });
    prisma.organization_facilities.update.mockResolvedValue({ id: 'fac_one', name: 'Updated facility' });
    prisma.organization_facilities.findUnique.mockResolvedValue({ id: 'fac_one', name: 'Updated facility' });
    // Simulate only the Prisma boundary used here: natural-key upsert merges the
    // emitted update fields into the matching row, including id if it is sent.
    prisma.facility_footprints.upsert.mockImplementation(async ({ where, update, create }) => {
      const key = where.facilityFootprintKey;
      const row = rows.find(row => row.facility_id === key.facility_id && row.type === key.type && row.value === key.value);
      if (row) {
        Object.assign(row, update);
        return structuredClone(row);
      }
      const createdRow: Record<string, unknown> = { created_at: createdAt, deleted: false, ...create };
      rows.push(createdRow);
      return structuredClone(createdRow);
    });
    prisma.facility_footprints.findMany.mockImplementation(async ({ where }) =>
      structuredClone(rows.filter(row => Object.entries(where).every(([key, value]) => row[key] === value))),
    );
    prisma.facility_footprints.delete.mockImplementation(async ({ where }) => {
      const index = rows.findIndex(row => Object.entries(where).every(([key, value]) => row[key] === value));
      if (index < 0) throw new Error('Footprint not found');
      return rows.splice(index, 1)[0];
    });
    service = new FootprintsService(prisma as unknown as PrismaService);
  });

  afterEach(() => jest.restoreAllMocks());

  it.each([
    ['omitted', {}],
    ['matching', { id: 'foot_existing' }],
    ['different', { id: 'foot_input' }],
    ['empty', { id: '' }],
  ])('does not send a primary-key update when the input ID is %s', async (_label, idFields) => {
    const result = await service.create('org_one', payload(idFields));
    expect(prisma.facility_footprints.upsert).toHaveBeenCalledWith({
      where: { facilityFootprintKey: { facility_id: 'fac_one', type: 'year', value: 2024 } },
      update: { facility_id: 'fac_one', organization_id: 'org_one', type: 'year', value: 2024, emissions: updatedEmissions },
      create: {
        id: expect.stringMatching(/^foot_[a-z][a-z0-9]{23}$/),
        facility_id: 'fac_one',
        organization_id: 'org_one',
        type: 'year',
        value: 2024,
        emissions: updatedEmissions,
        updated_at: expect.any(String),
      },
    });
    expect(prisma.facility_footprints.upsert.mock.calls[0][0].update).not.toHaveProperty('id');
    expect(result).toEqual([
      {
        facility_id: 'fac_one',
        facility_name: 'Updated facility',
        periods: [
          {
            id: 'foot_existing',
            facility_id: 'fac_one',
            organization_id: 'org_one',
            type: 'year',
            value: 2024,
            emissions: updatedEmissions,
            created_at: createdAt,
            updated_at: updatedAt,
            deleted: false,
          },
        ],
      },
    ]);
    expect(prisma.organization_facilities.update).toHaveBeenCalledWith({ where: { id: 'fac_one' }, data: { name: 'Updated facility' } });
  });

  it('keeps one stable row across repeated ID-less imports while replacing emissions', async () => {
    await service.create('org_one', payload());
    const latestEmissions = [{ scope: { ghg_category: 2, label: 'Scope 2' }, activities: [{ name: 'Electricity', tco2e: 2 }] }];
    const result = await service.create('org_one', payload({ emissions: latestEmissions }));

    expect(rows).toHaveLength(1);
    expect(result[0].periods).toEqual([expect.objectContaining({ id: 'foot_existing', emissions: latestEmissions })]);
    expect(prisma.facility_footprints.upsert).toHaveBeenCalledTimes(2);
  });

  it.each([undefined, 'foot_client_supplied'])('generates a server ID for a new natural key when the input ID is %s', async id => {
    const result = await service.create('org_one', payload({ value: 2025, ...(id === undefined ? {} : { id }) }));
    const created = result[0].periods.find(period => period.value === 2025);
    expect(created).toEqual({
      id: expect.stringMatching(/^foot_[a-z][a-z0-9]{23}$/),
      facility_id: 'fac_one',
      organization_id: 'org_one',
      type: 'year',
      value: 2025,
      emissions: updatedEmissions,
      created_at: createdAt,
      updated_at: expect.any(String),
      deleted: false,
    });
    expect(created?.id).not.toBe('foot_client_supplied');
    expect(rows).toHaveLength(2);
    expect(rows[0].id).toBe('foot_existing');
  });

  it('preserves an existing ID and creates a new ID in the same import', async () => {
    const input = payload();
    input[0].periods.push(...payload({ value: 2025 })[0].periods);
    const result = await service.create('org_one', input);
    expect(result[0].periods).toHaveLength(2);
    expect(result[0].periods.find(period => period.value === 2024)?.id).toBe('foot_existing');
    expect(result[0].periods.find(period => period.value === 2025)?.id).toMatch(/^foot_[a-z][a-z0-9]{23}$/);
  });

  it('keeps the original identifier usable for individual reads and deletes after reimport', async () => {
    await service.create('org_one', payload());
    await expect(service.findOne('org_one', 'fac_one', 'foot_existing')).resolves.toEqual([expect.objectContaining({ id: 'foot_existing', emissions: updatedEmissions })]);
    await expect(service.remove('org_one', 'fac_one', 'foot_existing')).resolves.toEqual(expect.objectContaining({ id: 'foot_existing' }));
    expect(rows).toHaveLength(0);
  });

  it('propagates upsert failures without renaming the facility', async () => {
    const failure = new Error('database unavailable');
    prisma.facility_footprints.upsert.mockRejectedValue(failure);
    await expect(service.create('org_one', payload())).rejects.toBe(failure);
    expect(prisma.organization_facilities.update).not.toHaveBeenCalled();
    expect(rows[0].id).toBe('foot_existing');
  });
});
