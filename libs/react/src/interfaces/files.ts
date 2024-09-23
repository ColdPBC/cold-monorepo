import { Claims } from './claims';
import { MaterialsWithCertifications } from './materials';

export interface Files {
	id: string;
	original_name: string;
	type: string;
	effective_start_date: null | string;
	effective_end_date: null | string;
	organization_claims: {
		id: string;
		claim_id: string;
		organization_file_id: string;
		claim: Claims;
		material: null | MaterialsWithCertifications;
		product: null | any;
		facility: null | any;
	}[];
}

export interface FilesWithAssurances {
	id: string;
	originalName: string;
	createdAt: string;
	type: string;
	attributeAssurances: AttributeAssurance[];
  metadata: {
    effective_start_date: string | null;
    effective_end_date: string | null;
    status: string;
    summary: string;
    certificate_number?: string | null;
  } | null;
}

export interface AttributeAssurance {
  id: string;
  effectiveStartDate: string | null;
  effectiveEndDate: string | null;
  organizationFacility: null | {
    id: string;
    name: string;
    country: string | null;
    supplierTier: number | null;
    materialSuppliers: {
      material: {
        id: string;
        name: string;
      };
    }[];
  };
  material: null | {
    id: string;
    name: string;
    materialSuppliers: {
      organizationFacility: {
        id: string;
        name: string;
        supplierTier: number | null;
      };
    }[];
  };
  sustainabilityAttribute: {
    id: string;
    name: string;
    level: string;
  } | null;
}
