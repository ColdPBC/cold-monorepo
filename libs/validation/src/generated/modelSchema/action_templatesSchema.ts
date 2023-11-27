import { z } from 'zod';
import { InputJsonValue } from '../inputTypeSchemas/InputJsonValue'
import { ActionTemplateSchema } from '../../custom'

/////////////////////////////////////////
// ACTION TEMPLATES SCHEMA
/////////////////////////////////////////

/**
 * @namespace Actions
 * @erd action_templates
 * @erd actions
 * @describe Action Templates are a way to define a set of actions that can be taken by a user in the app. Action Templates are then used to create Actions that are specific to an organization.
 */
export const action_templatesSchema = z.object({
  id: z.string().uuid(),
  template: ActionTemplateSchema,
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

export type action_templates = z.infer<typeof action_templatesSchema>

/////////////////////////////////////////
// ACTION TEMPLATES CUSTOM VALIDATORS SCHEMA
/////////////////////////////////////////

export const action_templatesCustomValidatorsSchema = action_templatesSchema

export type action_templatesCustomValidators = z.infer<typeof action_templatesCustomValidatorsSchema>

export default action_templatesSchema;
