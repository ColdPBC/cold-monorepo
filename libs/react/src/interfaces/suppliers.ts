import { Certifications } from './certifications';

export interface Suppliers {
  id: string;
  name: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  country: string;
  certification_claims: {
    id: string;
    certification: Certifications;
    organization_file: {
      original_name: string;
      effective_start_date: string | null;
      effective_end_date: string | null;
      type: string;
    };
  }[];
}
