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
