import { SurveyPayloadType } from './survey';

export type Compliance = {
  id: string;
  name: string;
  title: string;
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
