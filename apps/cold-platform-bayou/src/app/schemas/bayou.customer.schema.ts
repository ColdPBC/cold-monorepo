import { external_id_schema } from './external_id_schema';
import { z } from 'zod';

export const bayou_customer_payload_schema = z.object({
  external_id: external_id_schema,
  email: z.string().email(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  phone_number: z.string().optional(),
  address_line_1: z.string().optional(),
  address_line_2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipcode: z.string().optional(),
  utility: z.string(),
});

export type BayouCustomerPayload = z.infer<typeof bayou_customer_payload_schema>;
