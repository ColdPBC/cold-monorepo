import z from 'zod';
import { address_line_1, address_line_2, city, country, email, phone, postal_code, state_province, summary, website } from '../global.schema';

export const sgs = z.object({
  testing_company: z
    .object({
      name: z.enum(['SGS Vietnam Ltd.']),
      address_line_1: z.string().describe('If the document contains an applicant address, place the street address here here'),
      address_line_2: z.string().describe('If the document contains an applicant address, place the unit/suite or care of information here'),
      city: z.string().describe('If the document contains an applicant address, place the city here'),
      state_province: z.string().describe('If the document contains an applicant address, place the state or province here'),
      postal_code: z.string().describe('If the document contains an applicant address, place the postal code here'),
      country: z.string().describe('If the document contains an applicant address, place the country here'),
      metadata: z.object({
        email: z.string().describe('If the document contains an applicant email, place it here'),
        phone: z.string().describe('If the document contains an applicant phone number, place it here'),
        website: z.string().describe('If the document contains an applicant website, place it here'),
      }),
    })
    .describe('If the document is a test document, attempt to extract data for testing company information'),
  test_date: z.string().describe('If the document contains a test date, place it here'),
  test_number: z.string().describe('If the document contains a test number, place it here'),
  summary: summary,
  supplier: z.object({
    name: z.string().describe('If the document contains an applicant, place it here'),
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
  sample: z.object({
    description: z.string().describe('If the document contains a test sample description, place it here'),
    color: z.string().describe('If the document contains a test sample color, place it here'),
    number: z.string().describe('If the document contains a test sample number, place it here'),
    order_number: z.string().describe('If the document contains an order or PO number, place it here'),
    category: z.string().describe('If the document contains a category, place it here'),
    buyer_name: z.string().describe('If the document contains a buyer name, place it here'),
    style_number: z.string().describe('If the document contains a style number, place it here'),
    fiber_content: z.string().describe('If the document contains fabric content, place it here'),
    end_use: z.string().describe('If the document contains an end use, place it here'),
    article_number: z.string().describe('If the document contains an article number, place it here'),
    manufacture_name: z.string().describe('If the document contains a manufacturer name, place it here'),
    received_date: z.string().describe('If the document contains a received date, place it here'),
    confirmation_date: z.string().describe('If the document contains a confirmation date, place it here'),
  }),
  tests: z.array(
    z.object({
      name: z.string().describe('If the document contains a test name, place it here, otherwise leave it blank'),
      product_name: z.string().describe('If the document contains a product name, place it here, otherwise leave it blank'),
      product_style_number: z.string().describe('If the document contains a product style number, place it here, otherwise leave it blank'),
      product_color: z.string().describe('If the document contains a product color, place it here, otherwise leave it blank'),
      bom: z.string().describe('If the document contains a bill of materials, place it here, otherwise leave it blank'),
      buyer: z.string().describe('If the document contains a buyer, place it here, otherwise leave it blank'),
      manufacturer: z.string().describe('If the document contains a manufacturer, place it here, otherwise leave it blank'),
      country_of_origin: z.string().describe('If the document contains a country of origin, place it here, otherwise leave it blank'),
      country_of_destination: z.string().describe('If the document contains a country of destination, place it here, otherwise leave it blank'),
      product_weight: z.string().describe('If the document contains a product weight, place it here, otherwise leave it blank'),
      end_use: z.string().describe('If the document contains an end use, place it here, otherwise leave it blank'),
      test_samples: z.array(
        z.object({
          sample_number: z.string().describe('If the document contains a sample number, place it here, otherwise leave it blank'),
          component_description: z.string().describe('If the document contains a sample description, place it here, otherwise leave it blank'),
          group_number: z.string().describe('If the document contains a group number, place it here, otherwise leave it blank'),
        }),
      ),
      results: z.array(
        z.object({
          test_number: z.string().describe('If the document contains a test number, place it here, otherwise leave it blank'),
          substance_name: z.string().describe('If the document contains a substance name, place it here, otherwise leave it blank'),
          cas_ec_number: z.string().describe('If the document contains a CAS or EC number, place it here, otherwise leave it blank'),
          limit: z.string().describe('If the document contains an RL or reporting limit, place it here, otherwise leave it blank'),
          concentration_pct: z.string().describe('If the document contains a concentration percentage, place it here, otherwise leave it blank'),
        }),
      ),
    }),
  ),
});
