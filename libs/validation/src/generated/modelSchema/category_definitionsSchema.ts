import { z } from 'zod';
import { InputJsonValue } from '../inputTypeSchemas/InputJsonValue'
import { CategoryDefinitionSchema } from '../../custom'

/////////////////////////////////////////
// CATEGORY DEFINITIONS SCHEMA
/////////////////////////////////////////

/**
 * @namespace Categories
 * @erd category_data
 * @erd organizations
 */
export const category_definitionsSchema = z.object({
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
  definition: CategoryDefinitionSchema,
})

export type category_definitions = z.infer<typeof category_definitionsSchema>

/////////////////////////////////////////
// CATEGORY DEFINITIONS CUSTOM VALIDATORS SCHEMA
/////////////////////////////////////////

export const category_definitionsCustomValidatorsSchema = category_definitionsSchema

export type category_definitionsCustomValidators = z.infer<typeof category_definitionsCustomValidatorsSchema>

export default category_definitionsSchema;
