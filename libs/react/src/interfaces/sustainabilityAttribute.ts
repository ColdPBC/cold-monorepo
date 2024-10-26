import { SustainabilityAttributeAssuranceGraphQL } from './attributeAssurance';
import { AttributeAssuranceStatus, EntityLevel } from '@coldpbc/enums';

export interface SustainabilityAttributeWithoutAssurances {
  id: string;
  name: string;
  logoUrl?: string;
  level: EntityLevel;
}

export interface SustainabilityAttribute {
  id: string;
  name: string;
  logoUrl?: string;
  level: EntityLevel;
  attributeAssurances: SustainabilityAttributeAssuranceGraphQL[];
}

export interface SustainabilityAttributeWithStatus {
  id: string;
  name: string;
  logoUrl?: string;
  level: EntityLevel;
  assuranceStatus: AttributeAssuranceStatus;
  expirationDate?: Date | null;
}
