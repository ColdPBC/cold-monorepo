import { ComplianceProgressStatus } from '@coldpbc/enums';

export type Compliance = {
  id: string;
  name: string;
  title: string;
  logo_url: string;
  image_url?: string;
  surveys: string[] | never[];
  created_at: string;
  updated_at: string;
  due_date?: string;
  term?: string;
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

export type OrgComplianceManager = {
  id: string;
  organization_id: string;
  compliance_id: string;
  created_at: string;
  updated_at: string;
  organization: any;
  compliance_definition: ComplianceManager;
};

export type ComplianceManager = {
  id: string;
  name: string;
  order: number;
  version: number;
  title: string;
  image_url: undefined | string;
  logo_url: string;
  metadata: any;
  visible: boolean;
  created_at: string;
  updated_at: string;
  compliance_section_groups: Array<ComplianceManagerSectionGroup>;
};

export type ComplianceManagerSectionGroup = {
  id: string;
  order: number;
  title: string;
  sections: Array<ComplianceManagerSection>;
};

export type ComplianceManagerSection = {
  id: string;
  order: number;
  title: string;
  _count: {
    compliance_questions: number;
  };
  questions: Array<ComplianceManagerQuestion>;
};

export type ComplianceManagerQuestion = {
  order: number;
  prompt: string;
  status: ComplianceProgressStatus;
};

export type MQTTComplianceManagerPayload = {
  compliance_section_groups: Array<MQTTComplianceManagerPayloadComplianceSectionGroup>;
  image_url: string;
  logo_url: string;
  metadata: any;
  name: string;
  title: string;
  version: number;
};

export type MQTTComplianceManagerPayloadComplianceSectionGroup = {
  id: string;
  order: number;
  title: string;
  metadata: any;
  compliance_definition_name: string;
  question_count: number;
  ai_answered_count: number;
  user_answered_count: number;
  bookmarked_count: number;
  not_started_count: number;
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
