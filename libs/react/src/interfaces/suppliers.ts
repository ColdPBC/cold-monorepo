import { Claims } from './claims';
import { EntityLevel } from '@coldpbc/enums';
import { EntityLevelAttributeAssuranceGraphQL } from './attributeAssurance';
import { PaginatedProductsQuery } from './products';

export interface Suppliers {
  id: string;
  name: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  country: string;
}

export interface SupplierBaseEntity {
  id: string;
  name: string;
  country: string;
}

export interface SuppliersWithCertifications extends Suppliers {
  organization_claims: {
    id: string;
    claim: Claims;
    organization_file: {
      original_name: string;
      effective_start_date: string | null;
      effective_end_date: string | null;
      type: string;
    };
  }[];
}

export interface SuppliersWithAssurances {
  id: string;
  name: string;
  country: string | null;
  supplierTier: number | null;
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
  materialSuppliers: {
    id: string;
    material: {
      id: string;
      name: string;
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
    };
  }[];
  products: {
    id: string;
    name: string;
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
  }[]
}

// More basic version for the Suppliers DataGrid
export interface SuppliersDataGridGraphQL {
  id: string;
  name: string;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  stateProvince: string | null;
  postalCode: string | null;
  country: string | null;
  supplierTier: number | null;
  brandFacilityId: string | null;
  category: string | null;
  subcategory: string | null;
  attributeAssurances: EntityLevelAttributeAssuranceGraphQL[];
  materialSuppliers: {
    id: string;
    material: {
      id: string;
      name: string;
      attributeAssurances: EntityLevelAttributeAssuranceGraphQL[];
    }
  }[];
  products: {
    id: string;
    name: string;
  }[];
}

// Additional attribute assurance information pulled for SuppliersDetail page
export interface SupplierGraphQL extends SuppliersDataGridGraphQL {
  materialSuppliers: Array<SuppliersDataGridGraphQL['materialSuppliers'][0] & {
    material: SuppliersDataGridGraphQL['materialSuppliers'][0]['material'] & {
      materialCategory: string | null;
      materialSubcategory: string | null;
      attributeAssurances: EntityLevelAttributeAssuranceGraphQL[];
    }
  }>;
  products: Array<SuppliersDataGridGraphQL['products'][0] & {
    productCategory: string | null;
    productSubcategory: string | null;
    attributeAssurances: EntityLevelAttributeAssuranceGraphQL[];
  }>;
}
