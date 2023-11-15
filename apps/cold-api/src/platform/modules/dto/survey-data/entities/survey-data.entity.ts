import { Prisma } from '@prisma/client';
import { OrganizationsEntity } from '../../organizations/entities/organizations.entity';
import { SurveyDefinitionsEntity } from '../../survey-definitions/entities/survey-definitions.entity';

export class SurveyDataEntity {
  id: string;
  survey_definition_id: string;
  organization_id: string;
  data: Prisma.JsonValue;
  created_at: Date;
  updated_at: Date;
  organizations?: OrganizationsEntity;
  survey_definition?: SurveyDefinitionsEntity;
}
