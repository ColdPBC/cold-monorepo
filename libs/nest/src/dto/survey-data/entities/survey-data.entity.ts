import { Prisma } from '@prisma/client';
import { OrganizationsEntity } from '../../organizations';
import { SurveyDefinitionsEntity } from '../../survey-definitions';

export type SurveyDataEntity = {
  id: string;
  survey_definition_id: string;
  organization_id: string;
  data: Prisma.JsonValue;
  created_at: Date;
  updated_at: Date;
  organizations?: OrganizationsEntity;
  survey_definition?: SurveyDefinitionsEntity;
};
