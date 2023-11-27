import { survey_definitions, survey_types } from '@prisma/client';
import { JsonObject } from '@prisma/client/runtime/library';

export class CreateSurveyDefinitionDto implements survey_definitions {
  id: string;
  name: string;
  type: survey_types;
  definition: JsonObject;
  description: string;
  created_at: Date;
  updated_at: Date;
}
