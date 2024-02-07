export type Compliance = {
  id: string;
  name: string;
  title: string;
  logo_url: string;
  surveys: string[] | never[];
  created_at: string;
  updated_at: string;
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
