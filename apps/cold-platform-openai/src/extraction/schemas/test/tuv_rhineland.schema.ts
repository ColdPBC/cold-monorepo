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

export const tuv_rhineland = z.object({
  testing_company: z
    .object({
      name: z.enum(['TÜVRheinland']),
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
  effective_start_date: effective_start_date,
  effective_end_date: effective_end_date,
  summary: summary,
  supplier: z.object({
    name: z.string().describe('If the document contains a client name, place it here'),
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
  report_number: z.string().describe('If the document contains a test number, place it here'),
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
  tests: z
    .array(
      z.object({
        name: z.string().describe('If the document contains a test name, place it here, otherwise leave it blank'),
        astm_number: z.string().describe('If the document contains an ASTM number, place it here, otherwise leave it blank'),
        astm_summary: z
          .string()
          .describe('If the document contains an ASTM number, summarize the test using what you already know about the test, and if necessary look up the test via the web.'),
        references: z.string().describe('If the document contains references, place it here, otherwise leave it blank'),
        tested_samples: z.array(z.string().describe('If the test contains a list of components or samples or compounds tested, place it here, otherwise leave it blank')),
        sample: z.array(
          z.object({
            sample_name: z
              .string()
              .describe('Place the name of the component or sample used for this specific test from the list of "tested_samples" here, otherwise leave it blank'),
            units: z
              .array(
                z.object({
                  unit: z.string().describe('If the test contains a unit of measurement, place it here, otherwise leave it blank'),
                  value: z.string().describe('If the test contains a unit value, place it here, otherwise leave it blank'),
                }),
              )
              .describe('If the test contains a unit of measurement, place it here, otherwise leave it blank'),
            compounds: z
              .array(
                z.object({
                  compound_name: z.string().describe('If the test contains a compound, place it here, otherwise leave it blank'),
                  compound_result: z.string().describe('If the test contains a compound test result, place it here, otherwise leave it blank'),
                  compound_result_unit: z.string().describe('If the test contains a compound test result unit, place it here, otherwise leave it blank'),
                }),
              )
              .describe('If the test contains a list of tested compounds, place it here, otherwise leave it blank'),
            result: z.string().describe('If the document contains a result, place it here, otherwise leave it blank'),
          }),
        ),
      }),
    )
    .describe('If the document type is "test", attempt to extract data from each of the tests.  If the document is not a test, leave blank'),
});
