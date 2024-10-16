import { SustainabilityAttributeAssurance } from './attributeAssurance';
import { AttributeAssuranceStatus } from '@coldpbc/enums';

export interface SustainabilityAttribute {
  id: string;
  name: string;
  logoUrl?: string;
  level: 'MATERIAL' | 'ORGANIZATION' | 'PRODUCT' | 'SUPPLIER';
  attributeAssurances: SustainabilityAttributeAssurance[];
}

export interface SustainabilityAttributeWithStatus {
  id: string;
  name: string;
  logoUrl?: string;
  level: 'MATERIAL' | 'ORGANIZATION' | 'PRODUCT' | 'SUPPLIER';
  assuranceStatus: AttributeAssuranceStatus;
  expirationDate?: Date | null;
}
