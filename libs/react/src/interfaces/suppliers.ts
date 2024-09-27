import { Claims } from './claims';

export interface Suppliers {
  id: string;
  name: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
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
  country: string;
  supplierTier: number | null;
  attributeAssurances: {
    id: string;
    sustainabilityAttribute: {
      id: string;
      name: string;
    };
  }[];
  materialSuppliers: {
    material: {
      name: string;
    };
  }[];
}
