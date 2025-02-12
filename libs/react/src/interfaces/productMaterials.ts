import { EntityLevelAttributeAssuranceGraphQL } from './attributeAssurance';
import { Length, MaterialClassificationCategory, UnitOfMeasurement, WeightFactorUnits } from '@coldpbc/enums';

// This will eventually be used in PaginatedProductsQuery
export interface ProductMaterial {
  id: string
  yield: number | null;
  unitOfMeasure: UnitOfMeasurement | null;
  weight: number | null;
  material: {
    id: string
    name: string
    materialCategory: string | null;
    materialSubcategory: string | null;
    materialClassification: {
      id: string;
      name: string;
      category: MaterialClassificationCategory;
      weightFactor: number;
    } | null;
    emissionsFactor: number | null;
    attributeAssurances: EntityLevelAttributeAssuranceGraphQL[];
    weightFactor: number | null;
    weightFactorUnitOfMeasure: WeightFactorUnits | null;
    width: number | null;
    widthUnitOfMeasure: Length | null;
  };
};
