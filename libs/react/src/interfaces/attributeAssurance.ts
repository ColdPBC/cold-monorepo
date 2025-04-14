import { AttributeAssuranceStatus, EntityLevel } from '@coldpbc/enums';

// This is intended to be the child of a SustainabilityAttribute
// and represents the aggregated status (in the case of multiple
// attribute assurances for the same entity / attribute).
export interface SustainabilityAttributeAssurance {
  effectiveEndDate?: Date | null;
  entity: {
    id: string;
    name: string;
    supplierName?: string;
  }
  status: AttributeAssuranceStatus;
  certificateId?: string | null;
}

// This is the structure of AttributeAssurances when queried from
// an entity (i.e. product, material, supplier, etc.). In this case,
// we grab the sustainability attribute as a child, but we'll remap
// the relationship before using it in components like the
// SustainabilityAttributeCard.
export interface EntityWithAttributeAssurances {
  id: string;
  name: string;
  organizationFacility?: { // not defined for suppliers
    id: string;
    name: string;
  } | null;
  attributeAssurances: EntityLevelAttributeAssuranceGraphQL[];
}

export interface EntityLevelAttributeAssuranceGraphQL {
  id: string;
  effectiveEndDate: string | null;
  organizationFile: {
    id: string;
    metadata: string | null;
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
    name: string;
  } | null;
  organization?: {
    id: string;
    name: string;
  } | null;
  organizationFile: {
    id: string;
    metadata: string | null;
  } | null;
  organizationFacility?: {
    id: string;
    name: string;
  } | null;
  product?: {
    id: string;
    name: string;
  } | null;
}

// Used for attribute assurance graphs
export interface AttributeAssuranceGraphData {
  activeCount: number;
  inactiveCount: number;
  notDocumentedCount: number;
}
