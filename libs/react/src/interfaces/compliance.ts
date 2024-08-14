import { SurveyAdditionalContext } from './survey';

export type Compliance = {
  id: string;
  name: string;
  title: string;
  logo_url: string;
  image_url?: string;
  surveys: string[] | never[];
  created_at: string;
  updated_at: string;
  metadata: {
    [key: string]: any;
  };
  visible: boolean;
  order: number;
  version: number;
};

export type OrgCompliance = {
  id: string;
  organization_id: string;
  compliance_id: string;
  created_at: string;
  updated_at: string;
  organization: any;
  compliance_definition: Compliance;
};

export type ComplianceProgress = {
  totalQuestions: number;
  aiAttemptedQuestions: number;
  answeredQuestions: number;
  aiAnsweredQuestions: number;
  percentageAnswered: number;
  percentageAIAnswered: number;
};

export type MQTTComplianceManagerPayload = {
  compliance_definition: {
    compliance_section_groups: Array<MQTTComplianceManagerPayloadComplianceSectionGroup>;
    image_url: string;
    logo_url: string;
    metadata: any;
    name: string;
    title: string;
    version: number;
  };
  statuses: {
    id: string;
    email: string;
    type: string;
    created_at: string;
    updated_at: string;
  }[];
};

export type MQTTComplianceManagerPayloadComplianceSectionGroup = {
  id: string;
  order: number;
  title: string;
  metadata: any;
  compliance_definition_name: string;
};

export type MQTTComplianceManagerPayloadComplianceSection = {
  id: string;
  key: string;
  title: string;
  metadata: any;
  order: number;
  compliance_section_group_id: string;
  compliance_definition_name: string;
  _count: {
    compliance_questions: number;
  };
};

export type MQTTComplianceManagerPayloadComplianceQuestionList = {
  compliance_questions: Array<MQTTComplianceManagerPayloadComplianceQuestion> | undefined;
  counts: {
    total: number;
    not_started: number;
    ai_answered: number;
    user_answered: number;
    bookmarked: number;
  };
};

export type MQTTComplianceManagerPayloadComplianceQuestion = {
  id: string;
  prompt: string;
  order: number;
  key: string;
  organization_id: string;
  ai_answered: boolean;
  user_answered: boolean;
  bookmarked: boolean;
  not_started: boolean;
};

export type CurrentAIStatusPayload = CurrentAIStatusSection[];

export type CurrentAIStatusSection = {
  section: string;
  questions: string[];
};

export interface ComplianceNotePayload {
  id: string;
  note: string;
  created_at: string;
  updated_at: string;
  compliance_question_id: string;
  organization_compliance_id: string;
  deleted: string;
}

export interface ComplianceSidebarPayload {
  name: string;
  compliance_section_groups: ComplianceSidebarSectionGroup[];
}

export interface ComplianceSidebarSectionGroup {
  id: string;
  title: string;
  order: number;
  compliance_sections: ComplianceSidebarSection[];
}

export interface ComplianceSidebarSection {
  id: string;
  title: string;
  key: string;
  order: number;
  compliance_questions: ComplianceSidebarQuestion[];
}

export interface ComplianceSidebarQuestion {
  id: string;
  key: string;
  order: number;
  prompt: string;
  question_summary?: string;
  score?: number;
  ai_score?: number;
  max_score?: number;
  ai_answered: boolean;
  user_answered: boolean;
  not_started: boolean;
  bookmarked: boolean;
}

export interface QuestionnaireQuestion {
  id: string;
  key: string;
  order: number;
  prompt: string;
  bookmarked: boolean;
  user_answered: boolean;
  ai_answered: boolean;
  not_started: boolean;
  options: string[];
  component: string;
  placeholder: string;
  tooltip: string;
  additional_context?: SurveyAdditionalContext | null;
  ai_attempted?: boolean;
  score?: number;
  max_score?: number;
  ai_score?: number;
  question_summary?: string;
  corresponding_question?: string;
  compliance_responses: QuestionnaireQuestionComplianceResponse[];
  answer_score_map?: {
    [key: string]: number;
  };
}

export interface QuestionnaireQuestionComplianceResponse {
  org_response: {
    value: any;
  } | null;
  ai_response: {
    answer: any | null;
    justification: string;
    references: QuestionnaireQuestionComplianceReference[] | null;
  } | null;
}

export interface QuestionnaireQuestionComplianceReference {
  file?: string;
  url?: string;
  text?: string[] | string;
}

export interface QuestionnaireComplianceContainerPayLoad {
  name: string;
  compliance_section_groups: {
    id: string;
    title: string;
    order: number;
    compliance_sections: {
      id: string;
      title: string;
      key: string;
      order: number;
      compliance_questions: QuestionnaireQuestion[];
    }[];
  }[];
}

export interface ComplianceManagerCountsPayload {
  name: string;
  compliance_section_groups: ComplianceManagerCountsSectionGroup[];
  counts: {
    not_started: number;
    org_answered: number;
    ai_answered: number;
    bookmarked: number;
    total: number;
  };
  statuses: {
    id: string;
    email: string;
    type: string;
    created_at: string;
    updated_at: string;
  }[];
  score: number;
  ai_score: number;
  max_score: number;
  estimated_score: number;
}

export interface ComplianceManagerCountsSectionGroup {
  id: string;
  title: string;
  order: number;
  counts: {
    not_started: number;
    org_answered: number;
    ai_answered: number;
    bookmarked: number;
  };
  compliance_sections: ComplianceManagerCountsSection[];
  score: number;
  ai_score: number;
  max_score: number;
  estimated_score: number;
}

export interface ComplianceManagerCountsSection {
  id: string;
  key: string;
  title: string;
  order: number;
  score: number;
  ai_score: number;
  max_score: number;
  estimated_score: number;
  counts: {
    not_started: number;
    org_answered: number;
    ai_answered: number;
    bookmarked: number;
  };
}

export interface AIDetails {
  ai_answered?: boolean;
  ai_attempted?: boolean;
  value?: any;
  questionAnswerSaved: boolean;
  questionAnswerChanged: boolean;
  question: QuestionnaireQuestion;
  sectionId: string;
  sectionGroupId: string;
}

export type AllCompliance = {
  id: string;
  name: string;
  logo_url: string;
  title: string;
  visible: boolean;
  image_url: string | null;
  metadata: any | null;
  order: number;
  version: number | null;
  progress: number | null;
  statuses: ComplianceSetStatus[] | null;
};

export type ComplianceSetStatus = {
  type: string;
  created_at: string;
  updated_at: string;
};
