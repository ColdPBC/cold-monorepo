import * as z from 'zod';
import organization_facilitiesSchema from './organization_facilitiesSchema';

/**
 * @namespace Organizations
 * @erd category_data
 * @erd survey_data
 * @actions
 */
export const OrganizationsSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  enabled_connections: z.record(z.string(), z.boolean()),
  display_name: z.string(),
  branding: z
    .object({
      logo: z.string().url().optional(),
      colors: z
        .object({
          primary: z.string().optional(),
          secondary: z.string().optional(),
          tertiary: z.string().optional(),
        })
        .optional()
        .nullable(),
    })
    .optional(),
  locations: z.array(organization_facilitiesSchema).optional(),
  phone: z.string().nullable(),
  email: z.string().email().nullable(),
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
});

export type Organizations = z.infer<typeof OrganizationsSchema>;
export default OrganizationsSchema;
