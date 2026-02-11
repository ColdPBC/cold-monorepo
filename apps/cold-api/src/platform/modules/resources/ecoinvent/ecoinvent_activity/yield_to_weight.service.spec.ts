import { getCalculatedWeight } from './yield_to_weight.service';
import { Area, Count, Length, Weight, WeightFactorUnits } from './weight.types';

describe('yield_to_weight service', () => {
  const baseMaterial = {
    id: 'm1',
    material_classification: { id: 'mc1', weight_factor: 0.2 },
    weight_factor: null,
    weight_factor_unit_of_measure: null,
    width: null,
    width_unit_of_measure: null,
  };

  it('returns explicit weight when present', () => {
    const result = getCalculatedWeight({
      id: 'pm1',
      weight: 1.2,
      yield: null,
      unit_of_measure: null,
      material: baseMaterial,
    });

    expect(result).toEqual(expect.objectContaining({ weightInKg: 1.2 }));
  });

  it('returns error when yield or unit is missing', () => {
    const result = getCalculatedWeight({
      id: 'pm1',
      weight: null,
      yield: null,
      unit_of_measure: null,
      material: baseMaterial,
    });

    expect(result).toEqual({ error: 'Missing yield or unit of measure' });
  });

  it('calculates pieces with global fallback factor', () => {
    const result = getCalculatedWeight({
      id: 'pm1',
      weight: null,
      yield: 10,
      unit_of_measure: Count.pcs,
      material: baseMaterial,
    });

    expect(result).toEqual(expect.objectContaining({ weightInKg: 0.03 }));
  });

  it('calculates pieces using kg per pcs override', () => {
    const result = getCalculatedWeight({
      id: 'pm1',
      weight: null,
      yield: 5,
      unit_of_measure: Count.pcs,
      material: {
        ...baseMaterial,
        weight_factor: 0.4,
        weight_factor_unit_of_measure: WeightFactorUnits.KG_PER_PCS,
      },
    });

    expect(result).toEqual(expect.objectContaining({ weightInKg: 2 }));
  });

  it('calculates area-based weight', () => {
    const result = getCalculatedWeight({
      id: 'pm1',
      weight: null,
      yield: 10,
      unit_of_measure: Area.ft2,
      material: baseMaterial,
    });

    expect((result as any).weightInKg).toBeGreaterThan(0);
  });

  it('returns error for length-based units without width', () => {
    const result = getCalculatedWeight({
      id: 'pm1',
      weight: null,
      yield: 10,
      unit_of_measure: Length.m,
      material: baseMaterial,
    });

    expect(result).toEqual({ error: 'Missing width or width unit of measure' });
  });

  it('returns error for unsupported unit values', () => {
    const result = getCalculatedWeight({
      id: 'pm1',
      weight: null,
      yield: 10,
      unit_of_measure: 'unsupported' as any,
      material: baseMaterial,
    });

    expect(result).toEqual({ error: 'Cannot estimate weight for unit of measure: unsupported' });
  });

  it('returns yield directly for kilogram units', () => {
    const result = getCalculatedWeight({
      id: 'pm1',
      weight: null,
      yield: 2.5,
      unit_of_measure: Weight.kg,
      material: baseMaterial,
    });

    expect(result).toEqual(expect.objectContaining({ weightInKg: 2.5 }));
  });
});
