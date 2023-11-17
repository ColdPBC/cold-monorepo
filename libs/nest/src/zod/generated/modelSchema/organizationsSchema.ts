import { z } from 'zod';
import { NullableJsonValue } from '../inputTypeSchemas/NullableJsonValue'
import { InputJsonValue } from '../inputTypeSchemas/InputJsonValue'

/////////////////////////////////////////
// ORGANIZATIONS SCHEMA
/////////////////////////////////////////

/**
 * @namespace Categories
 * @erd category_data
 * @erd survey_data
 * @actions
 */
export const organizationsSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  enabled_connections: InputJsonValue,
  display_name: z.string(),
  branding: NullableJsonValue.optional(),
  phone: z.string().nullable(),
  email: z.string().email().nullable(),
  street_address: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  zip: z.string().nullable(),
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
  isTest: z.boolean(),
})

export type organizations = z.infer<typeof organizationsSchema>

export default organizationsSchema;
