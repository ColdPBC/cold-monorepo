export interface Claims {
	id: string;
	name: string;
	level: string;
	type: string;
}

export interface SuppliersClaimNamesPayload {
	claim_name: string | null;
}

export interface SuppliersClaimNames {
	claim_name: string;
}
