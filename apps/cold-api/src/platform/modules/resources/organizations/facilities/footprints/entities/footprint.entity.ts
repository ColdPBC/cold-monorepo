import { Cuid2Generator } from '@coldpbc/nest';

export type emission_scope = {
  id: string;
  label: string;
  ghg_category: number;
  ghg_subcategory: number | null;
};

export type emissions_data = {
  scope: {
    ghg_category: number;
    ghg_subcategory?: number;
    label: string;
    subcategory_label?: string;
  };
  activities: Array<{ name: string; tco2e: number }>;
};

export class FacilityFootprint {
  id: string;
  facility_id: string;
  type: string;
  value: number;
  organization_id: string;
  emissions: Array<emissions_data>;

  constructor(data: { period: number; organization_id: string; facility_id: string; id: string; emissions: emissions_data[]; period_type: string }) {
    this.id = data.id || new Cuid2Generator('foot').scopedId;
    this.type = data.period_type;
    this.value = data.period;
    this.organization_id = data.organization_id;
    this.facility_id = data.facility_id;
    this.emissions = data.emissions;
  }

  static fromJSON(orgId: string, data: any) {
    return new FacilityFootprint({
      organization_id: orgId,
      id: data.id,
      facility_id: data.facility_id,
      period: data.value,
      period_type: data.type,
      emissions: data.emissions,
    });
  }
}
