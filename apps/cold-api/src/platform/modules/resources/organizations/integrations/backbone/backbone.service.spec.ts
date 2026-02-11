import { BackboneService } from './backbone.service';
import { ImperialUnits } from '@coldpbc/nest';

describe('BackboneService', () => {
  const build = () => {
    const prisma = {} as any;
    const service = new BackboneService(prisma);

    return { service };
  };

  it('should be defined', () => {
    const { service } = build();
    expect(service).toBeDefined();
  });

  it('authenticate exits early when api key is missing', async () => {
    const { service } = build();

    await service.authenticate({ body: {} } as any);

    expect((service as any).config.headers.authentication).toBeUndefined();
  });

  it('authenticate sets auth header when login succeeds', async () => {
    const { service } = build();
    const postSpy = jest.spyOn((service as any).axios.axiosRef, 'post').mockResolvedValue({ data: { token: 'tok' } } as any);

    await service.authenticate({ body: { api_key: 'k1' } } as any);

    expect(postSpy).toHaveBeenCalledWith('/users/login', null, expect.any(Object));
    expect((service as any).config.headers).toEqual({ authentication: 'tok' });
  });

  it('resolveWidth returns nulls when width field id is not configured', () => {
    const { service } = build();
    (service as any).customFields.material_width_field_id = null;

    expect(service.resolveWidth({ component: { custom_fields: [] } })).toEqual({ value: null, uom: null });
  });

  it('resolveWidth returns parsed width in inches when found', () => {
    const { service } = build();

    const result = service.resolveWidth({
      component: {
        custom_fields: [{ field_info: (service as any).customFields.material_width_field_id, value: '10.5' }],
      },
    });

    expect(result).toEqual({ value: 10.5, uom: 'in' });
  });

  it('resolveWidth handles malformed item safely', () => {
    const { service } = build();

    const result = service.resolveWidth({ component: null } as any);

    expect(result).toEqual({ value: null, uom: null });
  });

  it('getArea returns null when product dimensions are missing', () => {
    const { service } = build();

    expect(service.getArea({ component: { custom_fields: [] } })).toBeNull();
  });

  it('getArea computes converted area from dimensions string', () => {
    const { service } = build();

    const area = service.getArea({
      component: {
        custom_fields: [{ field_info: (service as any).customFields.product_dimensions_lwd_field_id, value: '10 x 4 x 2 in' }],
      },
    });

    expect(area).toBeGreaterThan(0);
  });

  it('resolveWeight returns nulls when weight field id is missing', () => {
    const { service } = build();
    (service as any).customFields.material_weight_field_id = null;

    expect(service.resolveWeight({ component: { custom_fields: [] } })).toEqual({
      weight: null,
      uom: null,
      factor: null,
      factor_unit: null,
    });
  });

  it('resolveWeight handles compound units and returns factor', () => {
    const { service } = build();

    const result = service.resolveWeight({
      component: {
        custom_fields: [
          { field_info: (service as any).customFields.material_weight_field_id, value: '120 g/m2' },
          { field_info: (service as any).customFields.product_dimensions_lwd_field_id, value: '10 x 4 x 2 in' },
        ],
      },
    });

    expect(result.uom).toBe('g/m2');
    expect(result.factor).toBeGreaterThan(0);
    expect(result.factor_unit).toBe('kg per m2');
    expect(result.weight).toBeGreaterThan(0);
  });

  it('resolveWeight handles single units and converts to kg', () => {
    const { service } = build();

    const result = service.resolveWeight({
      component: {
        custom_fields: [{ field_info: (service as any).customFields.material_weight_field_id, value: '2 lb' }],
      },
    });

    expect(result.uom).toBe('pcs');
    expect(result.weight).toBeCloseTo(0.907184, 5);
    expect(result.factor).toBeNull();
  });

  it('resolveWeight returns nulls for unsupported formats', () => {
    const { service } = build();

    const result = service.resolveWeight({
      component: {
        custom_fields: [{ field_info: (service as any).customFields.material_weight_field_id, value: 'abc' }],
      },
    });

    expect(result).toEqual({ weight: null, uom: null, factor: null, factor_unit: null });
  });

  it('resolveUofM returns nulls when yield field id is missing', () => {
    const { service } = build();
    (service as any).customFields.material_yield_field_id = null;

    expect(service.resolveUofM({ component: { custom_fields: [] } }, {})).toEqual({ uofm: null, yieldNumber: null });
  });

  it('resolveUofM maps yard, inch and foot abbreviations', () => {
    const { service } = build();
    (service as any).customFields.material_yield_field_id = 'yield-id';

    const yard = service.resolveUofM({ component: { custom_fields: [{ field_info: 'yield-id', value: '3 yds' }] } }, {});
    const inch = service.resolveUofM({ component: { custom_fields: [{ field_info: 'yield-id', value: '5 in' }] } }, {});
    const foot = service.resolveUofM({ component: { custom_fields: [{ field_info: 'yield-id', value: '2 ft' }] } }, {});

    expect(yard.uofm).toBe(ImperialUnits.yard);
    expect(inch.uofm).toBe(ImperialUnits.inch);
    expect(foot.uofm).toBe(ImperialUnits.foot);
    expect(foot.yieldNumber).toBe(2);
  });

  it('resolveUofM prefers existing yield and handles unknown units', () => {
    const { service } = build();
    (service as any).customFields.material_yield_field_id = 'yield-id';

    const result = service.resolveUofM(
      { component: { custom_fields: [{ field_info: 'yield-id', value: '9 mm' }] } },
      { yield: 77 },
    );

    expect(result).toEqual({ uofm: null, yieldNumber: 77 });
  });
});
