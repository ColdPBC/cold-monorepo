export type Action = {
	title: string;
	overview: string;
	objective_description: string;
	process_description?: string;
	image_url: string;
	subcategory: string;
	assignee: Assignee | null;
	ready_to_execute: boolean;
	due_date?: string;
	steps: Step[];
	areas_of_impact: string[];
	dependent_surveys: DependentSurvey[];
	resources?: {
		title: string;
		url: string;
	}[];
};

export type Step = {
	assignee: Assignee | null;
	overview: string;
	description: string;
	complete: string | null;
};

export type Assignee = {
	email?: string;
	name?: string;
	given_name?: string;
	family_name?: string;
	picture?: string;
};

export type DependentSurvey = {
	name: string;
	title: string;
	submitted: boolean;
};

export type ActionPayload = {
	id: string;
	updated_at: string;
	action: Action;
};
