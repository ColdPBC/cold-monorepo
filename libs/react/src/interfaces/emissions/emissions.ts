export interface EmissionPayload {
  id: string;
  name: string;
  type: string;
  description: string;
  created_at: string;
  updated_at: string;
  definition: EmissionFacility[];
}

export interface EmissionFacility {
  facility_id: number;
  facility_name: string;
  periods: EmissionPeriod[];
}

export interface EmissionPeriod {
  type: string;
  value: number;
  emissions: EmissionCategory[];
}

export interface EmissionCategory {
  scope: {
    ghg_category: number;
    ghg_subcategory?: number;
  };
  activities: EmissionActivity[];
}

export interface EmissionActivity {
  name: string;
  tco2e: number;
}
