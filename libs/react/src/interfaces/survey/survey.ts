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
  ai_answered?: boolean;
  ai_response?: {
    justification?: string;
    answer?: string | boolean | number | Array<string>;
    what_we_need?: string;
  };
  score?: number;
  max_score?: number;
  saved?: boolean;
  document_link?: string | null;
  question_summary?: string;
  corresponding_question?: string;
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
  ai_attempted?: boolean;
  ai_answered?: boolean;
  ai_response?: {
    justification?: string;
    answer?: string | boolean | number | Array<string>;
    what_we_need?: string;
  };
}

export interface ComplianceSurveyPayloadType {
  id: string;
  name: string;
  type: string;
  definition: {
    title: string;
    image_url: string;
    intro_markdown: string;
    version?: string | number;
    sections: {
      [key: string]: ComplianceSurveySectionType;
    };
    submitted?: boolean;
    target_score?: number;
    compliance_type?: string;
  };
  progress: ComplianceSurveyProgressType;
  status?: ComplianceSurveyStatusType[];
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ComplianceSurveyProgressType {
  sections: Array<ComplianceSurveySectionProgressType>;
  total_score: number;
  total_max_score: number;
  total_review: number;
  question_count: number;
  percentage: number;
  questions_answered: number;
}

export interface ComplianceSurveyStatusType {
  name: string;
  date: string;
}

export interface ComplianceSurveySectionType extends SurveySectionType {
  section_type: string;
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
  title: string;
  total: number;
  section_score?: number;
  section_max_score?: number;
}

export interface ComplianceSurveyProgressQuestionType {
  ai_answered: boolean;
  user_answered: boolean;
  max_score?: number;
  score?: number;
}

export interface ComplianceSurveySavedQuestionType extends SurveySectionFollowUpType {
  sectionKey: string;
  sectionTitle: string;
  followUpKey: string;
  category: string;
}
