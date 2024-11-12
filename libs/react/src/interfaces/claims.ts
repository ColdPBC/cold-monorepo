import { EntityLevel } from '@coldpbc/enums';

export interface Claims {
  id: string;
  name: string;
  level: EntityLevel;
  type: string;
  logoUrl: string | null;
}

export interface SuppliersClaimNamesPayload {
  claim_name: string | null;
}

export interface SuppliersClaimNames {
  claim_name: string;
}
