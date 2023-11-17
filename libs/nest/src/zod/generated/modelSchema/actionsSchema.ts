import { z } from 'zod';
import { ActionTemplateSchema } from '../../custom'

/////////////////////////////////////////
// ACTIONS SCHEMA
/////////////////////////////////////////

/**
 * @namespace Actions
 * @erd organizations
 * @erd action_templates
 * @erd actions
 * @describe *Actions* are defined by an *Action Template* and are specific to an organization.
 */
export const actionsSchema = z.object({
  id: z.string().uuid(),
  action: ActionTemplateSchema,
  action_template_id: z.string().uuid(),
  organization_id: z.string().uuid(),
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

export type actions = z.infer<typeof actionsSchema>

/////////////////////////////////////////
// ACTIONS CUSTOM VALIDATORS SCHEMA
/////////////////////////////////////////

export const actionsCustomValidatorsSchema = actionsSchema

export type actionsCustomValidators = z.infer<typeof actionsCustomValidatorsSchema>

export default actionsSchema;
