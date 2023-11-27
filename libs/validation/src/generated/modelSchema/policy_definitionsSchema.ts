import { z } from 'zod';

/////////////////////////////////////////
// POLICY DEFINITIONS SCHEMA
/////////////////////////////////////////

/**
 * @namespace Policies
 * @describe Policy Definitions are a set of content policies (ie: Privacy & ToS)
 * @erd policy_data
 */
export const policy_definitionsSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  definition: z.string(),
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

export type policy_definitions = z.infer<typeof policy_definitionsSchema>

export default policy_definitionsSchema;
