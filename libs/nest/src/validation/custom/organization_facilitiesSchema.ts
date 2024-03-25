import * as z from 'zod';

/////////////////////////////////////////
// ORGANIZATION LOCATIONS SCHEMA
/////////////////////////////////////////

export const organization_facilitiesSchema = z.object({
  id: z.string().refine(val => val.startsWith('ofac_'), { message: 'id must start with ofac_' }),
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

export type organization_facilities = z.infer<typeof organization_facilitiesSchema>;

export default organization_facilitiesSchema;
