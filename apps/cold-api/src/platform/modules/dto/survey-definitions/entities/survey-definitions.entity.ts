import { Prisma, survey_types } from '@prisma/client';
import { SurveyDataEntity } from '../../survey-data/entities/survey-data.entity';

export class SurveyDefinitionsEntity {
  id: string;
  name: string;
  type: survey_types;
  description: string;
  created_at: Date;
  updated_at: Date;
  definition: Prisma.JsonValue;
  survey_data?: SurveyDataEntity[];
}
