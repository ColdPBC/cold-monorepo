import { Suppliers } from './suppliers';
import { Claims } from './claims';

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
