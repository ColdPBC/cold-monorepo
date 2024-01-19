import { SurveyPayloadType } from './survey';

export type Compliance = {
  id: string;
  name: string;
  title: string;
  surveys: SurveyPayloadType[] | never[];
};
