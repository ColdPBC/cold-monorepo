import { EntityLevelAttributeAssuranceGraphQL } from './attributeAssurance';
import { Length, MaterialClassificationCategory, UnitOfMeasurement, WeightFactorUnits } from '@coldpbc/enums';

export interface ProductMaterialForWeightCalculation {
  id: string
  yield: number | null;
  unitOfMeasure: UnitOfMeasurement | null;
  weight: number | null;
  material: {
    id: string
    materialClassification: {
      id: string;
      weightFactor: number;
    } | null;
    weightFactor: number | null;
    weightFactorUnitOfMeasure: WeightFactorUnits | null;
    width: number | null;
    widthUnitOfMeasure: Length | null;
  }
}

export interface ProductMaterial extends ProductMaterialForWeightCalculation {
  material: ProductMaterialForWeightCalculation['material'] & {
    id: string
    name: string
    materialCategory: string | null;
    materialSubcategory: string | null;
    materialClassification: ProductMaterialForWeightCalculation['material']['materialClassification'] & {
      name: string;
      category: MaterialClassificationCategory;
    } | null;
    emissionsFactor: {
      id: string;
      name: string;
      emissionsFactor: number;
      description: string;
    } | null;
    attributeAssurances: EntityLevelAttributeAssuranceGraphQL[];
  };
}

export interface EmissionFactor {
  id: string;
  name: string;
  emissionsFactor: number;
  description: string;
}

