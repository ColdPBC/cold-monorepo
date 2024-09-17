import z from 'zod';
import {
  address_line_1,
  address_line_2,
  city,
  country,
  effective_end_date,
  effective_start_date,
  email,
  phone,
  postal_code,
  state_province,
  summary,
  website,
} from '../global.schema';

export const bluesign = z.object({
  name: z.enum(['bluesign']),
  awarded_to: z.object({
    name: z.string().describe('Look for the name of the company the certificate is awarded to and place it here if found.  If not found, leave blank'),
    address_line_1: address_line_1,
    address_line_2: address_line_2,
    city: city,
    state_province: state_province,
    postal_code: postal_code,
    country: country,
    metadata: z.object({
      email: email,
      phone: phone,
      website: website,
    }),
  }),
  certificate_number: z.string().describe('If the document type is a certificate then look for certificate number and place it here if found.  If not found, leave blank'),
  effective_start_date: effective_start_date,
  effective_end_date: effective_end_date,
  systemPartner: z
    .boolean()
    .describe(
      `bluesign® SYSTEM PARTNERS are responsibly acting parties of the textile supply chain committed to applying the bluesign® SYSTEM. They aim to continuously improve their environmental performance and are focused on a sustainable future.  Is the supplier listed on the certificate a designated SYSTEM PARTNER?`,
    ),
  summary: summary,
});
