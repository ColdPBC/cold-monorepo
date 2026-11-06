import { EcoinventActivityProcessorService } from './ecoinvent_activity.processor.service';
import { ProductCarbonFootprintCalculator } from './pcf_calculator';

describe('EcoinventActivityProcessorService product footprint persistence', () => {
  const build = () => {
    const prisma = { products: { update: jest.fn() } };
    const service = new EcoinventActivityProcessorService({} as any, {} as any, prisma as any, {} as any);
    service.pcfc = new ProductCarbonFootprintCalculator();
    return { service, prisma };
  };

  it.each([0, 12.5, -2.5])('persists a finite total of %s on the intended product', async total => {
    const { service, prisma } = build();
    service.pcfc.addActivity('Material contribution', 1, total);

    await (service as any).updateProductCarbonFootprint(total, { id: 'p1' }, { id: 'o1' }, { id: 'u1' });

    expect(prisma.products.update).toHaveBeenCalledTimes(1);
    expect(prisma.products.update).toHaveBeenCalledWith({ where: { id: 'p1' }, data: { total_co2e: total } });
  });

  it.each([NaN, Infinity, -Infinity])('does not persist a non-finite total of %s', async total => {
    const { service, prisma } = build();

    await expect((service as any).updateProductCarbonFootprint(total, { id: 'p1' }, { id: 'o1' }, { id: 'u1' })).resolves.toBeUndefined();

    expect(prisma.products.update).not.toHaveBeenCalled();
  });

  it('propagates a database failure when persisting a valid total', async () => {
    const { service, prisma } = build();
    const error = new Error('Product update failed');
    prisma.products.update.mockRejectedValue(error);

    await expect((service as any).updateProductCarbonFootprint(5, { id: 'p1' }, { id: 'o1' }, { id: 'u1' })).rejects.toBe(error);

    expect(prisma.products.update).toHaveBeenCalledWith({ where: { id: 'p1' }, data: { total_co2e: 5 } });
  });
});
