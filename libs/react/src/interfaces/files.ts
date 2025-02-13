import { Claims } from './claims';
import { MaterialsWithCertifications } from './materials';
import {SustainabilityAttributeWithoutAssurances} from "./sustainabilityAttribute";
import { DocumentTypes, ProcessingStatus } from '@coldpbc/enums';

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
  effective_start_date: string | null;
  effective_end_date: string | null;
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
  organization: null | {
    id: string;
    name: string;
  }
  organizationFacility: null | {
    id: string;
    name: string;
    country: string | null;
    supplierTier: number | null;
    materials: {
      id: string;
      name: string;
    }[];
  };
  material: null | {
    id: string;
    name: string;
    organizationFacility: {
      id: string;
      name: string;
      supplierTier: number | null;
    } | null;
  };
  sustainabilityAttribute: SustainabilityAttributeWithoutAssurances;
  product: {
    id: string;
    name: string;
  } | null;
}


export interface UploadsQuery {
  id: string;
  originalName: string;
  createdAt: string;
  type: typeof DocumentTypes[keyof typeof DocumentTypes];
  processingStatus: ProcessingStatus | null;
}
