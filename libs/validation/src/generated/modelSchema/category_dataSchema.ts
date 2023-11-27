import { z } from 'zod';
import { InputJsonValue } from '../inputTypeSchemas/InputJsonValue'
import { CategoryDefinitionSchema } from '../../custom'

/////////////////////////////////////////
// CATEGORY DATA SCHEMA
/////////////////////////////////////////

/**
 * @namespace Categories
 * @erd category_definitions
 * @erd organizations
 */
export const category_dataSchema = z.object({
  id: z.string(),
  category_definition_id: z.string().uuid(),
  organization_id: z.string().uuid(),
  data: CategoryDefinitionSchema.optional(),
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
})

export type category_data = z.infer<typeof category_dataSchema>

/////////////////////////////////////////
// CATEGORY DATA CUSTOM VALIDATORS SCHEMA
/////////////////////////////////////////

export const category_dataCustomValidatorsSchema = category_dataSchema

export type category_dataCustomValidators = z.infer<typeof category_dataCustomValidatorsSchema>

export default category_dataSchema;
