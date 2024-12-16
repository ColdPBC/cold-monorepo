export interface BaseEntity {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  classificationId?: string;
  hasAttribute: boolean;
}
