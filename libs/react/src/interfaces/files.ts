import { Certifications } from './certifications';
import { FileTypes } from '@coldpbc/enums';
import { MaterialsWithCertifications } from './materials';

export interface Files {
  id: string;
  original_name: string;
  type: FileTypes;
  effective_start_date: null | string;
  effective_end_date: null | string;
  certification_claim: {
    id: string;
    certification_id: string;
    organization_file_id: string;
    certification: Certifications;
    material: null | MaterialsWithCertifications;
    product: null | any;
    facility: null | any;
  }[];
}
