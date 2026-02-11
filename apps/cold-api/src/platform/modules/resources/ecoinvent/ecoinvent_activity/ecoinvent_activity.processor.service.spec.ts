import { EcoinventActivityProcessorService } from './ecoinvent_activity.processor.service';

describe('EcoinventActivityProcessorService', () => {
  const build = () => {
    const s3 = {} as any;
    const events = {
      sendRPCEvent: jest.fn(),
    } as any;
    const prisma = {
      material_classification: { findMany: jest.fn() },
      materials: { update: jest.fn() },
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
});
