import { getCalculatedWeight } from './weightUtils';
import { Area, Count, Length, UnitOfMeasurement, Weight } from '../enums/pcf';
// These imports allow the tests to run with `yarn vitest [test-file-path]`
// However, including them makes the Chromatic deploy fail.
// Without these imports, you can also run it by:
//      1. Adding '../../libs/react/src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}' to the included test files in the vite.config.js file
//      2. Running the command `yarn vitest --config apps/cold-ui/vite.config.ts [test-file-path]`
// import { describe, it, expect } from 'vitest';

const defaultProductMaterialAttributes = {
  id: 'id',
  yield: null,
  weight: null,
}

const defaultMaterialAttributes = {
  id: 'id',
  name: 'Material',
  attributeAssurances: [],
  emissionsFactor: null,
  materialCategory: null,
  materialSubcategory: null,
  materialClassification: null,
  unitOfMeasure: null,
  weightFactor: null,
  weightFactorUnitOfMeasure: null,
  width: null,
  widthUnitOfMeasure: null,
}

describe('getCalculatedWeight', () => {
  it('returns the weight if provided', () => {
    const result = getCalculatedWeight({
      ...defaultProductMaterialAttributes,
      weight: 1.00,
      material: defaultMaterialAttributes,
    });
    expect(result).toEqual({ weight: '1,000 g' });
  })

  it('returns error if yield is missing', () => {
    const result = getCalculatedWeight({
      ...defaultProductMaterialAttributes,
      yield: null,
      material: {
        ...defaultMaterialAttributes,
        unitOfMeasure: Count.pcs,
        weightFactor: 0.5,
      },
    });
    expect(result).toEqual({ error: 'Missing yield or unit of measure' });
  });

  it('returns error if unit of measure is missing', () => {
    const result = getCalculatedWeight({
      ...defaultProductMaterialAttributes,
      yield: 10,
      material: {
        ...defaultMaterialAttributes,
        unitOfMeasure: null,
        weightFactor: 0.5,
      },
    });
    expect(result).toEqual({ error: 'Missing yield or unit of measure' });
  });

  it('returns error if weight factor is missing', () => {
    const result = getCalculatedWeight({
      ...defaultProductMaterialAttributes,
      yield: 10,
      material: {
        ...defaultMaterialAttributes,
        unitOfMeasure: Area.m2,
        weightFactor: null,
        materialClassification: null,
      },
    });
    expect(result).toEqual({ error: 'Missing weight factor. Add a weight factor to the material or classify the material for an estimated weight factor.' });
  });

  it('calculates weight for pieces using global weight factor', () => {
    const result = getCalculatedWeight({
      ...defaultProductMaterialAttributes,
      yield: 100,
      material: {
        ...defaultMaterialAttributes,
        unitOfMeasure: Count.pcs,
        weightFactor: null,
      },
    });
    expect(result).toEqual({
      calculatedWeight: '300 g',
      message: 'Weight estimated using a yield of 100 pieces and a weight factor of 0.003 kg per piece',
    });
  });

  it('calculates weight for pieces using material weight factor', () => {
    const result = getCalculatedWeight({
      ...defaultProductMaterialAttributes,
      yield: 100,
      material: {
        ...defaultMaterialAttributes,
        unitOfMeasure: Count.pcs,
        weightFactor: 0.05,
      },
    });
    expect(result).toEqual({
      calculatedWeight: '5,000 g',
      message: 'Weight estimated using a yield of 100 pieces and a weight factor of 0.050 kg per piece',
    });
  });

  it('calculates weight for area', () => {
    const result = getCalculatedWeight({
      ...defaultProductMaterialAttributes,
      yield: 100,
      material: {
        ...defaultMaterialAttributes,
        unitOfMeasure: Area.ft2,
        weightFactor: 0.5,
      },
    });
    expect(result).toEqual({
      calculatedWeight: '4,645 g', // 100 ft2 * (0.3048m)^2 * 0.5 kg/m2
      message: 'Weight estimated using a yield of 100.00 ft2 and a weight factor of 0.500 kg per m2',
    });
  });

  it('returns error for length without width', () => {
    const result = getCalculatedWeight({
      ...defaultProductMaterialAttributes,
      yield: 100,
      material: {
        ...defaultMaterialAttributes,
        unitOfMeasure: Length.m,
        weightFactor: 0.5,
        width: null,
        widthUnitOfMeasure: Length.m,
      },
    });
    expect(result).toEqual({ error: 'Missing width or width unit of measure' });
  });

  it('calculates weight for length', () => {
    const result = getCalculatedWeight({
      ...defaultProductMaterialAttributes,
      yield: 1,
      material: {
        ...defaultMaterialAttributes,
        unitOfMeasure: Length.m,
        weightFactor: 0.5,
        width: 2,
        widthUnitOfMeasure: Length.m,
      },
    });
    expect(result).toEqual({
      calculatedWeight: '1,000 g',
      message: 'Weight estimated using a yield of 1.00 m, a width of 2.00 m, and a weight factor of 0.500 kg per m2',
    });
  });

  it('returns weight directly for kg unit', () => {
    const result = getCalculatedWeight({
      ...defaultProductMaterialAttributes,
      yield: 1,
      material: {
        ...defaultMaterialAttributes,
        unitOfMeasure: Weight.kg,
        weightFactor: 0.5,
      },
    });
    expect(result).toEqual({
      weight: '1,000 g',
    });
  });

  it('throws error for unsupported unit', () => {
    const result = getCalculatedWeight({
      ...defaultProductMaterialAttributes,
      yield: 100,
      material: {
        ...defaultMaterialAttributes,
        unitOfMeasure: 'foo' as UnitOfMeasurement,
        weightFactor: 0.5,
      },
    });
    expect(result).toEqual({ error: 'Cannot estimate weight for unit of measure: foo'});
  });
});
