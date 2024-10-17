import {EntityLevel} from "@coldpbc/enums";

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
    material: {
      id: string
      name: string
      attributeAssurances: {
        id: string;
        effectiveEndDate: string | null;
        organizationFile: {
          id: string;
        } | null;
        sustainabilityAttribute: {
          id: string;
          name: string;
          level: EntityLevel;
          logoUrl?: string;
        };
      }[];
    } | null;
  }[];
  organizationFacility: {
    id: string
    name: string
    attributeAssurances: {
      id: string;
      effectiveEndDate: string | null;
      organizationFile: {
        id: string;
      } | null;
      sustainabilityAttribute: {
        id: string;
        name: string;
        level: EntityLevel;
        logoUrl?: string;
      };
    }[];
  } | null;
  attributeAssurances: {
    id: string;
    effectiveEndDate: string | null;
    organizationFile: {
      id: string;
    } | null;
    sustainabilityAttribute: {
      id: string;
      name: string;
      level: EntityLevel;
      logoUrl?: string;
    };
  }[];
  metadata: any | null;
  seasonCode: string | null;
  upcCode: string | null;
  brandProductId: string | null;
  supplierProductId: string | null;
}
