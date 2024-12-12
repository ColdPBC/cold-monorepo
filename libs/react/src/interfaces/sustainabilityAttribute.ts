import { SustainabilityAttributeAssurance, SustainabilityAttributeAssuranceGraphQL } from './attributeAssurance';
import { AttributeAssuranceStatus, EntityLevel } from '@coldpbc/enums';

export interface SustainabilityAttributeWithoutAssurances {
  id: string;
  name: string;
  logoUrl?: string;
  level: EntityLevel;
}

export interface SustainabilityAttributeGraphQL {
  id: string;
  name: string;
  logoUrl?: string;
  level: EntityLevel;
  organization: {
    id: string;
  } | null;
  attributeAssurances: SustainabilityAttributeAssuranceGraphQL[];
}

export interface SustainabilityAttribute {
  id: string;
  name: string;
  logoUrl?: string;
  level: EntityLevel;
  attributeAssurances: SustainabilityAttributeAssurance[]
}

export interface SustainabilityAttributeWithStatus {
  id: string;
  name: string;
  logoUrl?: string;
  level: EntityLevel;
  assuranceStatus: AttributeAssuranceStatus;
  expirationDate?: Date | null;
}

export interface SustainabilityAttributeForBulkEditGraphQL {
  id: string;
  name: string;
  logoUrl?: string;
  level: EntityLevel;
  organization: {
    id: string;
  } | null;
}
