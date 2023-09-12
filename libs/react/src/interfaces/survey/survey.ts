export interface SurveySectionType {
  title: string;
  prompt: string;
  component: string | null;
  follow_up: SurveySectionFollowUpType[];
  image_url: string;
  category_idx: number;
  category_key: string;
  category_description: string;
  value: any | null;
}

export interface SurveySectionFollowUpType {
  idx: number;
  key: string;
  prompt: string;
  options: string[];
  tooltip: string;
  component: string;
  placeholder: string;
  value: any | null;
}

export interface SurveySectionsProgressSectionType {
  key: string;
  sectionIndex: number;
  height: number;
}

export interface SurveyFormDefinitionType {
  title: string;
  sections: SurveySectionType[];
  image_url: string;
  intro_markdown: string;
}
