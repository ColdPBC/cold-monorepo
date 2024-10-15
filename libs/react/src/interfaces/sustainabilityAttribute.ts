import { SustainabilityAttributeAssurance } from './attributeAssurance';

export interface SustainabilityAttribute {
  id: string;
  name: string;
  logoUrl?: string;
  level: 'MATERIAL' | 'ORGANIZATION' | 'PRODUCT' | 'SUPPLIER';
  attributeAssurances: SustainabilityAttributeAssurance[];
}
