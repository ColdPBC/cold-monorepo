
export interface SurveySectionType {
  title: string;
  prompt: string;
  component: string | null;
  follow_up: {
    [key: string] : SurveySectionFollowUpType;
  };
  image_url:  string;
  category_idx: number;
  category_description: string;
  value: any | null;
}


export interface SurveySectionFollowUpType {
  idx: number;
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
  image_url: string;
  intro_markdown: string;
  sections: {
    [key: string]: SurveySectionType
  };
}

export interface SurveyDataType {
  id: string;
  name: string;
  type: string;
  description: string;
  created_at: string;
  updated_at: string;
  definition: SurveyFormDefinitionType;
}

export interface SurveyActiveKeyType {
  value: string;
  isFollowUp: boolean;
}
