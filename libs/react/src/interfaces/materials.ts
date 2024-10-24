import { Suppliers } from './suppliers';
import { Claims } from './claims';
import { EntityLevel } from '@coldpbc/enums';

export interface Materials {
  id: string;
  name: string;
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
      }[]
    };
  }[];
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
  productMaterials: {
    id: string,
    product: {
      id: string;
      organizationFacility: {
        id: string;
        name: string;
      };
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
      }[]
    };
  }[];
}
