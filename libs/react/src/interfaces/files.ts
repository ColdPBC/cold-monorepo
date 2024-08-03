import { Certifications } from './certifications';
import { FileTypes } from '@coldpbc/enums';

export interface Files {
  id: string;
  original_name: string;
  type: FileTypes;
  effective_start_date: null | string;
  effective_end_date: null | string;
  certification_claim: Certifications[];
}
