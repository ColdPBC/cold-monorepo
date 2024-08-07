import { Certifications } from './certifications';
import { FileTypes } from '@coldpbc/enums';
import { Materials } from './materials';

export interface Files {
  id: string;
  original_name: string;
  type: FileTypes;
  effective_start_date: null | string;
  effective_end_date: null | string;
  certification_claim: {
    id: string;
    certification_id: string;
    organization_facility_id: string | null;
    organization_file_id: string;
    issued_date: string;
    effective_date: string;
    created_at: string;
    updated_at: string;
    deleted: boolean;
    material_id: string | null;
    product_id: string | null;
    organization_id: string;
    certification: Certifications;
    material: null | Materials;
    product: null | any;
    facility: null | any;
  }[];
}
