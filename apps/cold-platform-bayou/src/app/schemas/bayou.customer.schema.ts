import { external_id_schema } from './external_id_schema';
import { z } from 'zod';

export const bayou_customer_payload_schema = z.object({
  external_id: external_id_schema,
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  address_line_1: z.string(),
  address_line_2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zipcode: z.string(),
  utility: z.string(),
});

export type BayouCustomerPayload = z.infer<typeof bayou_customer_payload_schema>;
