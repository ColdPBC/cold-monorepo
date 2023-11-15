import { z } from 'zod';
import { survey_typesSchema } from '../inputTypeSchemas/survey_typesSchema'
import { SurveyDefinitionSchema } from '../../custom'

/////////////////////////////////////////
// SURVEY DEFINITIONS SCHEMA
/////////////////////////////////////////

/**
 * @namespace Surveys
 * @erd survey_data
 * @erd organizations
 */
export const survey_definitionsSchema = z.object({
  /**
   * @z.enum()
   */
  type: survey_typesSchema,
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
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
  definition: SurveyDefinitionSchema,
})

export type survey_definitions = z.infer<typeof survey_definitionsSchema>

/////////////////////////////////////////
// SURVEY DEFINITIONS CUSTOM VALIDATORS SCHEMA
/////////////////////////////////////////

export const survey_definitionsCustomValidatorsSchema = survey_definitionsSchema

export type survey_definitionsCustomValidators = z.infer<typeof survey_definitionsCustomValidatorsSchema>

export default survey_definitionsSchema;
