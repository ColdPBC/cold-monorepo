import { AttributeAssuranceStatus, EntityLevel } from '@coldpbc/enums';

// This is intended to be the child of a SustainabilityAttribute
// and represents the aggregated status (in the case of multiple
// attribute assurances for the same entity / attribute).
export interface SustainabilityAttributeAssurance {
  effectiveEndDate?: Date | null;
  entity: {
    id: string;
  }
  status: AttributeAssuranceStatus;
}

// This is the structure of AttributeAssurances when queried from
// an entity (i.e. product, material, supplier, etc.). In this case,
// we grab the sustainability attribute as a child, but we'll remap
// the relationship before using it in components like the
// SustainabilityAttributeCard.
export interface EntityWithAttributeAssurances {
  id: string;
  name?: string;
  attributeAssurances: EntityLevelAttributeAssuranceGraphQL[];
}

export interface EntityLevelAttributeAssuranceGraphQL {
  id: string;
  effectiveEndDate: string | null;
  organizationFile: {
    id: string;
  } | null;
  sustainabilityAttribute: {
    id: string;
    name: string;
    level: EntityLevel;
    logoUrl?: string;
  };
}

// The backend has separate fields for all entities, so when we
// query we get this broad structure, but we'll winnow it into something
// a little more flexible for presentation in the UI (the
// SustainabilityAttributeAssurance).
export interface SustainabilityAttributeAssuranceGraphQL {
  id: string;
  effectiveEndDate: string | null;
  material?: {
    id: string;
  } | null;
  organization?: {
    id: string;
  } | null;
  organizationFile: {
    id: string;
  } | null;
  organizationFacility?: {
    id: string;
  } | null;
  product?: {
    id: string;
  } | null;
}
