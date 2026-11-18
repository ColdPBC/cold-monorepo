import { EcoinventActivityProcessorService } from './ecoinvent_activity.processor.service';
import { ProductCarbonFootprintCalculator } from './pcf_calculator';

describe('EcoinventActivityProcessorService', () => {
  const build = () => {
    const s3 = {} as any;
    const events = {
      sendRPCEvent: jest.fn(),
    } as any;
    const prisma = {
      material_classification: { findMany: jest.fn() },
      materials: { update: jest.fn() },
      product_materials: { update: jest.fn() },
    } as any;
    const cache = {} as any;

    const service = new EcoinventActivityProcessorService(s3, events, prisma, cache);
    return { service, events, prisma };
  };

  it('should be defined', () => {
    const { service } = build();
    expect(service).toBeDefined();
  });

  it('throws when no material classifications are available', async () => {
    const { service, prisma } = build();
    prisma.material_classification.findMany.mockResolvedValue([]);

    await expect(service.assignColdPlatformMaterialClassification({ id: 'm1', name: 'Cotton' } as any, {} as any, {} as any)).rejects.toThrow(
      'No material classifications found',
    );
  });

  it('updates material classification when match is returned', async () => {
    const { service, events, prisma } = build();
    prisma.material_classification.findMany.mockResolvedValue([
      { id: 'mc1', name: 'Textiles', material_ecoinvent_classifications: [], core_classification: { name: 'Core' } },
    ]);
    events.sendRPCEvent.mockResolvedValue({ name: 'Textiles' });

    const result = await service.assignColdPlatformMaterialClassification({ id: 'm1', name: 'Cotton', description: 'fabric' } as any, { id: 'u1' } as any, {
      id: 'o1',
    } as any);

    expect(prisma.materials.update).toHaveBeenCalledWith({
      where: { id: 'm1' },
      data: { material_classification_id: 'mc1' },
    });
    expect(result).toEqual(expect.objectContaining({ id: 'mc1', name: 'Textiles' }));
  });

  describe('material emissions', () => {
    it.each([
      { name: 'one impact', weight: 2, factors: [3], expectedTotal: 6 },
      { name: 'multiple impacts including a credit', weight: 2, factors: [3, 0.5, -1], expectedTotal: 5 },
      { name: 'zero material weight', weight: 0, factors: [3], expectedTotal: 0 },
    ])('persists the sum for $name without duplicating calculator contributions', async ({ weight, factors, expectedTotal }) => {
      const { service, prisma } = build();
      service.pcfc = new ProductCarbonFootprintCalculator();
      service.pcfc.addActivity('Existing material', 1, 7);
      const addActivity = jest.spyOn(service.pcfc, 'addActivity');
      const productMaterial = { id: 'pm1', weight, total_co2e: 99 };
      const activity = { name: 'Cotton', ecoinvent_activity_impacts: factors.map(impact_value => ({ impact_value })) };

      await (service as any).calculateAndPersistMaterialEmissions(productMaterial, activity, { id: 'o1' }, { id: 'u1' });

      expect(prisma.product_materials.update).toHaveBeenCalledTimes(1);
      expect(prisma.product_materials.update).toHaveBeenCalledWith({ where: { id: 'pm1' }, data: { total_co2e: expectedTotal } });
      expect(productMaterial.total_co2e).toBe(expectedTotal);
      expect(addActivity.mock.calls).toEqual(factors.map(factor => ['Cotton', weight, factor]));
      expect(service.pcfc.calculateTotal()).toBe(7 + expectedTotal);
    });

    it.each([
      { name: 'missing', impacts: undefined },
      { name: 'null', impacts: null },
      { name: 'empty', impacts: [] },
    ])('skips $name impacts without changing accumulated emissions', async ({ impacts }) => {
      const { service, prisma } = build();
      service.pcfc = new ProductCarbonFootprintCalculator();
      service.pcfc.addActivity('Existing material', 1, 7);
      const addActivity = jest.spyOn(service.pcfc, 'addActivity');
      const productMaterial = { id: 'pm1', weight: 2, total_co2e: 99 };

      await (service as any).calculateAndPersistMaterialEmissions(
        productMaterial,
        { name: 'Cotton', ecoinvent_activity_impacts: impacts },
        { id: 'o1' },
        { id: 'u1' },
      );

      expect(addActivity).not.toHaveBeenCalled();
      expect(prisma.product_materials.update).not.toHaveBeenCalled();
      expect(productMaterial.total_co2e).toBe(99);
      expect(service.pcfc.calculateTotal()).toBe(7);
    });
  });
});
