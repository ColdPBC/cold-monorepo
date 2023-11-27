import { z } from 'zod';
import { InputJsonValue } from '../inputTypeSchemas/InputJsonValue'
import { SurveyDefinitionSchema } from '../../custom'

/////////////////////////////////////////
// SURVEY DATA SCHEMA
/////////////////////////////////////////

/**
 * @namespace Surveys
 * @erd organizations
 */
export const survey_dataSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  data: SurveyDefinitionSchema.optional(),
  /**
   * @DtoUpdateHidden
   */
  created_at: z.date().optional(),
  /**
   * @DtoUpdateHidden
   * @DtoCreateHidden
   * @DtoReadOnly
   */
  updated_at: z.date().optional(),
  survey_definition_id: z.string().uuid(),
})

export type survey_data = z.infer<typeof survey_dataSchema>

/////////////////////////////////////////
// SURVEY DATA CUSTOM VALIDATORS SCHEMA
/////////////////////////////////////////

export const survey_dataCustomValidatorsSchema = survey_dataSchema

export type survey_dataCustomValidators = z.infer<typeof survey_dataCustomValidatorsSchema>

export default survey_dataSchema;
