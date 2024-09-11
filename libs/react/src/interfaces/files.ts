import { Claims } from './claims';
import { FileTypes } from '@coldpbc/enums';
import { MaterialsWithCertifications } from './materials';

export interface Files {
	id: string;
	original_name: string;
	type: FileTypes;
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
	type: FileTypes;
	attributeAssurances: AttributeAssurance[];
	metadata: {
		summary: string;
	} | null;
}

export interface AttributeAssurance {
	id: string;
	effectiveStartDate: string;
	effectiveEndDate: string;
	supplier: null | {
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
			supplier: {
				id: string;
				name: string;
				supplierTier: number | null;
			};
		}[];
	};
	sustainabilityAttribute: {
		name: string;
	} | null;
}
