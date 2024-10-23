export type EmissionPayload = Array<EmissionFacility>;

export interface EmissionFacility {
	facility_id: string;
	facility_name: string;
	periods: EmissionPeriod[];
}

export interface EmissionPeriod {
	id: string;
	facility_id: string;
	organization_id: string;
	created_at: string;
	updated_at: string;
	type: string;
	value: number;
	emissions: EmissionCategory[];
}

export interface EmissionCategory {
	scope: {
		ghg_category: number;
		ghg_subcategory: number;
		ghg_subcategory_name?: string;
	};
	activities: EmissionActivity[];
}

export interface EmissionActivity {
	name: string;
	tco2e: number;
}
