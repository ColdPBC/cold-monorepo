import { MaterialClassificationCategory } from './materialClassificationCategories';

export const Length = {
  in: 'in',
  ft: 'ft',
  yd: 'yd',
  m: 'm',
} as const;

export const Area = {
  in2: 'in2',
  ft2: 'ft2',
  yd2: 'yd2',
  m2: 'm2',
} as const;

export const Weight = {
  kg: 'kg',
} as const;

export const Count = {
  pcs: 'pcs'
} as const;

export const UnitOfMeasurement = {
  ...Length,
  ...Area,
  ...Weight,
  ...Count
} as const;

export type Length = typeof Length[keyof typeof Length];
export type Area = typeof Area[keyof typeof Area];
export type Weight = typeof Weight[keyof typeof Weight];
export type Count = typeof Count[keyof typeof Count];
export type UnitOfMeasurement = typeof UnitOfMeasurement[keyof typeof UnitOfMeasurement];

export enum WeightFactorUnits {
  KG_PER_M2 = 'kg per m2',
  KG_PER_PCS = 'kg per pcs',
}

export interface PcfGraphData {
  classificationCategory: MaterialClassificationCategory;
  emissions: number;
}
