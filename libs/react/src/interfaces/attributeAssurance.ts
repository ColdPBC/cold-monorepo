export interface AttributeAssurance {
  id: string;
  effectiveEndDate: string | null;
  material: {
    id: string;
  } | null;
  organization: {
    id: string;
  } | null;
  organizationFile: {
    id: string;
  } | null;
  organizationFacility: {
    id: string;
  } | null;
  product: {
    id: string;
  } | null;
}
