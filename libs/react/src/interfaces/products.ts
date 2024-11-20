import {EntityLevel} from "@coldpbc/enums";
import { EntityLevelAttributeAssuranceGraphQL, SustainabilityAttributeAssuranceGraphQL } from './attributeAssurance';

export interface Products {
  id: string;
  name: string;
}


export interface ProductsQuery {
  id: string;
  name: string;
  description: string | null;
  productCategory: string | null;
  productSubcategory: string | null;
  productMaterials: {
    id: string
    yield: number | null;
    unitOfMeasure: string | null;
    weight: number | null;
    material: {
      id: string
      name: string
      materialCategory: string | null;
      materialSubcategory: string | null;
      emissionsFactor: number | null;
      attributeAssurances: EntityLevelAttributeAssuranceGraphQL[];
      materialSuppliers: {
        id: string;
        organizationFacility: {
          id: string;
          name: string;
          attributeAssurances: EntityLevelAttributeAssuranceGraphQL[];
        };
      }[];
    };
  }[];
  organizationFacility: {
    id: string
    name: string
    attributeAssurances: EntityLevelAttributeAssuranceGraphQL[];
  } | null;
  attributeAssurances: EntityLevelAttributeAssuranceGraphQL[];
  metadata: any | null;
  seasonCode: string | null;
  upcCode: string | null;
  brandProductId: string | null;
  supplierProductId: string | null;
}
