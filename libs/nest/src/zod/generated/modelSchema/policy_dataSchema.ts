import { z } from 'zod';

/////////////////////////////////////////
// POLICY DATA SCHEMA
/////////////////////////////////////////

/**
 * @namespace Policies
 * @describe Policy Definitions are a set of content policies (ie: Privacy & ToS)
 * @erd policy_definitions
 */
export const policy_dataSchema = z.object({
  email: z.string().email(),
  id: z.number().int().positive(),
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

export type policy_data = z.infer<typeof policy_dataSchema>

export default policy_dataSchema;
