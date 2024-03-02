export interface SurveyFormDefinitionPayloadType {
  id: string;
  name: string;
  type: string;
  description: string;
  created_at: string;
  updated_at: string;
  definition: SurveyFormDefinitionType;
}

export interface SurveyFormDefinitionType {
  title: string;
  image_url: string;
  intro_markdown: string;
  sections: SurveySectionsType;
}

export interface SurveySectionsProgressSectionType {
  key: string;
  sectionIndex: number;
  height: number;
}

export interface SurveyActiveKeyType {
  value: string;
  previousValue: string;
  isFollowUp: boolean;
}

export interface SurveyFormDataPayloadType {
  id: string;
  organization_id: string;
  form_name: string;
  created_at: string;
  updated_at: string;
  data: SurveyFormDataType;
}

export interface SurveyFormDataType {
  title: string;
  image_url: string;
  intro_markdown: string;
  sections: SurveySectionsType;
}

export interface SurveySectionsType {
  [key: string]: SurveySectionType;
}

export interface SurveySectionType {
  title: string;
  prompt: string;
  component: any | null;
  follow_up: SurveySectionFollowUpsType;
  image_url: string;
  category_idx: number;
  category_description: string;
  value?: any | null;
  skipped?: boolean;
  additional_context?: SurveyAdditionalContext;
  ai_attempted?: boolean;
  ai_response?: {
    justification?: string;
    answer?: string | boolean | number | Array<string>;
  };
}

export interface SurveySectionFollowUpsType {
  [key: string]: SurveySectionFollowUpType;
}

export interface SurveySectionFollowUpType {
  idx: number;
  prompt: string;
  options: string[];
  tooltip: string;
  component: string;
  placeholder: string;
  value?: any | null;
  skipped?: boolean;
  additional_context?: SurveyAdditionalContext;
  ai_attempted?: boolean;
  ai_response?: {
    justification?: string;
    answer?: string | boolean | number | Array<string>;
  };
}

export interface SurveyPayloadType {
  id: string;
  name: string;
  type: string;
  definition: SurveyDefinitionType;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface SurveyDefinitionType {
  title: string;
  image_url: string;
  intro_markdown: string;
  sections: SurveySectionsType;
  submitted?: boolean;
}

export interface SurveyAdditionalContext {
  prompt: string;
  component: string;
  placeholder: string;
  operator: string;
  comparison: any;
  value?: any | null;
  tooltip?: string;
}

export interface SurveyNextStep {
  name: string;
  title: string;
  started: boolean;
  surveyProgress: number;
}

export interface ComplianceSurveyPayloadType {
  id: string;
  name: string;
  type: string;
  definition: {
    title: string;
    image_url: string;
    intro_markdown: string;
    sections: {
      [key: string]: ComplianceSurveySectionType;
    };
    submitted?: boolean;
    progress: Array<ComplianceSurveySectionProgressType>;
  };
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ComplianceSurveySectionType extends SurveySectionType {
  category: string;
}

export interface ComplianceSurveyActiveKeyType extends SurveyActiveKeyType {
  category: string;
  section: string;
}

export interface ComplianceSurveySectionProgressType {
  answered: number;
  complete: boolean;
  questions: {
    [key: string]: ComplianceSurveyProgressQuestionType;
  };
  review: number;
  section: string;
  title: string;
  total: number;
}

export interface ComplianceSurveyProgressQuestionType {
  ai_answered: boolean;
  user_answered: boolean;
}
