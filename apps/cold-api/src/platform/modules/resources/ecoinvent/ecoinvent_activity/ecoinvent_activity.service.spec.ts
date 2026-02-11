import { EcoinventActivityService } from './ecoinvent_activity.service';

describe('EcoinventActivityService', () => {
  const build = () => {
    const s3 = {} as any;
    const prisma = {
      ecoinvent_classifications: { findMany: jest.fn() },
      products: { findMany: jest.fn() },
    } as any;
    const activityQueue = {
      on: jest.fn(),
      add: jest.fn(),
    } as any;
    const events = {} as any;

    const service = new EcoinventActivityService(s3, prisma, activityQueue, events);
    return { service, prisma, activityQueue };
  };

  it('should be defined', () => {
    const { service } = build();
    expect(service).toBeDefined();
  });

  it('queues a classify_product job for each product', async () => {
    const { service, prisma, activityQueue } = build();
    prisma.products.findMany.mockResolvedValue([{ id: 'p1', name: 'A' }, { id: 'p2', name: 'B' }]);
    activityQueue.add.mockResolvedValue({ data: {} });

    await service.queueActivityMatchJobs({ user: { id: 'u1' }, organization: { id: 'org_1' } } as any, 'org_1', false, false);

    expect(activityQueue.add).toHaveBeenCalledTimes(2);
  });

  it('reclassifies materials when requested before queueing', async () => {
    const { service, prisma, activityQueue } = build();
    const findSpy = jest.spyOn(service, 'findEcoinventClassifications').mockResolvedValue(undefined as any);
    prisma.products.findMany.mockResolvedValue([{ id: 'p1', name: 'A' }]);
    activityQueue.add.mockResolvedValue({ data: {} });

    await service.queueActivityMatchJobs({ user: { id: 'u1' }, organization: { id: 'org_1' } } as any, 'org_1', true, true);

    expect(findSpy).toHaveBeenCalledWith({ id: 'org_1' }, { id: 'u1' }, true);
  });
});
