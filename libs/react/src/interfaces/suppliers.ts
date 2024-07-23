import { ComplianceManagerCountsPayload } from './compliance';
import { Certifications } from './certifications';

export interface Suppliers {
  id: string;
  name: string;
  country: string;
  certificate_claims: {
    expiration_date: string;
    certification: Certifications | undefined;
  }[];
}
