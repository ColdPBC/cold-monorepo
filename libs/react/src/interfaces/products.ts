import {Materials} from "./materials";

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
    } | null;
  }[];
  organizationFacility: {
    id: string
    name: string
  } | null;
  attributeAssurances: {
    id: string
    sustainabilityAttribute: {
      id: string
      name: string
    }
  }[];
  metadata: any | null;
  seasonCode: string | null;
  upcCode: string | null;
  styleCode: string | null;
  brandProductId: string | null;
  supplierProductId: string | null;
}
