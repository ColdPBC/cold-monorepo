import { EntityLevelAttributeAssuranceGraphQL } from './attributeAssurance';
import {MaterialClassificationCategory} from "@coldpbc/enums";
import { gql } from '@apollo/client';
import { string } from 'zod';

export interface Products {
  id: string;
  name: string;
}

export interface ProductBaseEntity extends Products {
  productCategory: string | null;
  productSubcategory: string | null;
}

export interface ProductForMaterialLevelSustainabilityReportGraphQL extends ProductBaseEntity {
  description: string | null;
  seasonCode: string | null;
  productCategory: string | null;
  productSubcategory: string | null;
  organizationFacility: {
    id: string;
    name: string;
  } | null;
  productMaterials: {
    id: string;
    weight: number | null;
    material: {
      id: string;
      name: string;
    }
  }[];
}

export interface ProductForMaterialLevelSustainabilityReport extends ProductBaseEntity {
  description: string | null;
  seasonCode: string | null;
  productCategory: string | null;
  productSubcategory: string | null;
  totalWeight: number;
  materialCount: number;
  materialPercentByWeight: number | null;
  materialList: string[];
  tier1SupplierName: string | null;
}

export interface PaginatedProductsQuery {
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

export interface ProductsQuery extends PaginatedProductsQuery {
  productMaterials: Array<PaginatedProductsQuery['productMaterials'][0] & {
    material: PaginatedProductsQuery['productMaterials'][0]['material'] & {
      organizationFacility: {
        id: string;
        name: string;
      };
      materialClassification: {
        id: string;
        name: string;
        category: MaterialClassificationCategory;
      } | null
    };
  }>;
}

export interface ProductCarbonFootprintData extends Products {
  productCategory: string | null;
  productMaterials: {
    id: string;
    weight: number | null;
    material: {
      id: string;
      name: string;
      emissionsFactor: number | null;
    }
  }[]
}


