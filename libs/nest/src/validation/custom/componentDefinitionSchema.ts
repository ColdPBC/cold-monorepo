import { createZodDto } from '@anatine/zod-nestjs';
import * as z from 'zod';

export const component_definition_typesSchema = z.enum(['UNKNOWN','FORM','NAVIGATION_SIDE','NAVIGATION_HEADER','NAVIGATION_FOOTER','DATAGRID','TEST']);

export type component_definition_typesType = `${z.infer<typeof component_definition_typesSchema>}`


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
  definition: z.any(),
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

export class component_definitionsDto extends createZodDto(component_definitionsSchema) {}
export default component_definitionsSchema;
