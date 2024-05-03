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
  title: string;
  sections: Array<ComplianceManagerSection>;
};

export type ComplianceManagerSection = {
  title: string;
  questions: Array<ComplianceManagerQuestion>;
};

export type ComplianceManagerQuestion = {
  prompt: string;
  status: ComplianceProgressStatus;
};
