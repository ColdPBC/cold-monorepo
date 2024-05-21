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
