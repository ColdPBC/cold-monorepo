import * as z from 'zod';

/////////////////////////////////////////
// ORGANIZATION LOCATIONS SCHEMA
/////////////////////////////////////////

export const organization_locationsSchema = z.object({
  id: z.string().refine(val => val.startsWith('oloc_'), { message: 'id must start with oloc_' }),
  name: z.string().nullable().optional(),
  address: z.string(),
  address_line_2: z.string().nullable().optional(),
  city: z.string(),
  state: z.string(),
  postal_code: z.string(),
  country: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  organization_id: z.string().nullable(),
});

export type organization_locations = z.infer<typeof organization_locationsSchema>;

export default organization_locationsSchema;
