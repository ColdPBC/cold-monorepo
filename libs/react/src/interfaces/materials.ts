import { Suppliers } from './suppliers';
import { Claims } from './claims';
import { EntityLevelAttributeAssuranceGraphQL } from './attributeAssurance';

export interface Materials {
  id: string;
  name: string;
}

export interface MaterialBaseEntity extends Materials {
  materialCategory: string | null;
  materialSubcategory: string | null;
}

export interface MaterialsWithCertifications extends Materials {
  material_suppliers: MaterialSuppliers[];
  organization_claims: {
    id: string;
    claim: Claims;
    organization_file: {
      original_name: string;
      effective_start_date: string | null;
      effective_end_date: string | null;
      type: string;
    };
    material: Materials | null;
    facility: Suppliers;
    product: any | null;
  }[];
}

export interface MaterialSuppliers {
  id: string;
  supplier: Suppliers;
  material: {
    id: string;
    name: string;
  };
}

export interface MaterialsWithRelations extends Materials {
  materialCategory: string | null;
  materialSubcategory: string | null;
  materialSuppliers: {
    id: string;
    organizationFacility: {
      id: string;
      name: string;
      supplierTier: number | null;
      attributeAssurances: EntityLevelAttributeAssuranceGraphQL[];
    };
  }[];
  attributeAssurances: EntityLevelAttributeAssuranceGraphQL[];
  productMaterials: {
    id: string,
    product: {
      id: string;
      organizationFacility: {
        id: string;
        name: string;
      } | null;
      attributeAssurances: EntityLevelAttributeAssuranceGraphQL[];
    };
  }[];
}

export interface MaterialGraphQL extends Materials {
  brandMaterialId: string | null;
  // description: string | null;
  materialCategory: string | null;
  materialSubcategory: string | null;
  supplierMaterialId: string | null;
  attributeAssurances: EntityLevelAttributeAssuranceGraphQL[];
  materialSuppliers: {
    id: string;
    organizationFacility: {
      id: string;
      name: string;
      country: string;
    };
  }[];
}
