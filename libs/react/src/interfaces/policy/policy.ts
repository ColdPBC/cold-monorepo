export interface PolicyType {
	id: number;
	name: string;
	definition: string;
	created_at: string;
	updated_at: string;
}

export interface PolicySignedDataType {
	id: number;
	name: string;
	definition: string;
	created_at: string;
	updated_at: string;
	policy_data: PolicyDataType[];
}

export interface PolicyDataType {
	id: string;
	organization_id: string;
	email: string;
	created_at: string;
}
