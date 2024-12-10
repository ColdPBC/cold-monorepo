export interface BaseEntity {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  hasAttribute: boolean;
  attributeAssuranceIds: string[];
}
