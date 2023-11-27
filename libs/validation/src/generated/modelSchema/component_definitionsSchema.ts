import { z } from 'zod';
import { InputJsonValue } from '../inputTypeSchemas/InputJsonValue'
import { component_definition_typesSchema } from '../inputTypeSchemas/component_definition_typesSchema'

/////////////////////////////////////////
// COMPONENT DEFINITIONS SCHEMA
/////////////////////////////////////////

/**
 * @namespace Component Definitions
 * @describe Component definitions describe how a component should be rendered in the UI
 */
export const component_definitionsSchema = z.object({
  type: component_definition_typesSchema,
  /**
   * @DtoReadOnly
   * #DtoHide
   */
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  definition: InputJsonValue,
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

export type component_definitions = z.infer<typeof component_definitionsSchema>

export default component_definitionsSchema;
