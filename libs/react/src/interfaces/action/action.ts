export type Action = {
  title: string;
  overview: string;
  objective_description: string;
  process_description?: string;
  image_url: string;
  subcategory: string;
  assignee?: Assignee;
  ready_to_execute: boolean;
  due_date?: Date;
  steps: Step[];
  areas_of_impact: string[];
  dependent_surveys: DependentSurvey[];
};

export type Step = {
  assignee?: Assignee;
  overview: string;
  description: string;
  complete?: string;
};

export type Assignee = {
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
  definition: Action;
};
