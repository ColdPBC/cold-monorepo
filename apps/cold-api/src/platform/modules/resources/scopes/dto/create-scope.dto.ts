export class CreateScopeDto {
  ghg_category: number;
  ghg_subcategory?: number | null;
  label: string;
  name: string;
  organization_id?: string;
}
