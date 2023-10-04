export interface ActionType {
  id: string;
  title: string;
  overview: string;
  objective_description: string;
  process_description?: string;
  image_url: string;
  subcategory: string;
  assignee?: string;
  ready_to_execute: boolean;
  due_date?: Date;
  steps: StepType[];
  areas_of_impact: string[];
  dependent_surveys: {
    name: string;
    title: string;
    submitted: boolean;
  }[];
}

export interface StepType {
  id: string;
  assignee?: string;
  overview: string;
  description: string;
  complete: boolean;
}
