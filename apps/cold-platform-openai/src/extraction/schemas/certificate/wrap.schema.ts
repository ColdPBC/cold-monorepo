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

export const wrap = z.object({
  name: z.enum(['wrap']),
  awarded_to: z.object({
    name: z
      .string()
      .describe('If the document type is a certificate then look for the name of the company the certificate is awarded to and place it here if found.  If not found, leave blank'),
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
  article_covered: z
    .string()
    .describe(
      'If the document type is a certificate that applies to a specific product range then look for product or article range covered and place it here if found.  If not found, leave blank',
    ),
  sample_size: z.string().describe('If the document type is a certificate then look for sample size and place it here if found.  If not found, leave blank'),
  processes_covered: z
    .array(
      z.string().describe('If the document type is a certificate that applies to a specific process then look for processes covered and place it here.  If not found, leave blank'),
    )
    .describe('If the document type is a certificate that applies to a specific process then look for processes covered and place it here.  If not found, leave blank'),
  periods_reviewed: z.array(
    z.object({
      period: z.string().describe('If the document type is a certificate then look for periods reviewed and place it here if found.  If not found, leave blank'),
      hours: z.string().describe('If the document type is a certificate then look for hours reviewed and place it here if found.  If not found, leave blank'),
    }),
  ),
  certificate_number: z.string().describe('If the document type is a certificate then look for certificate number and place it here if found.  If not found, leave blank'),
  effective_start_date: effective_start_date,
  effective_end_date: effective_end_date,
  summary: summary,
});
