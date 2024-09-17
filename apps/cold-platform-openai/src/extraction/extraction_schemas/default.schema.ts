import z from 'zod';
import { summary } from './global.schema';
import { defaultPolicySchema } from './policy';
import { defaultCertificateSchema } from './certificate';
import { defaultTestSchema } from './test';
import { defaultStatementSchema } from './statement';

export const defaultExtractionSchema = z.object({
  type: z.enum(['certificate', 'test', 'policy', 'statement']).describe('The type of document'),
  test_details: defaultTestSchema.describe('If the document type is "test" then use this schema to extract the details, otherwise leave blank'),
  certificate_details: defaultCertificateSchema.describe('If the document type is "certificate" then use this schema to extract the details, otherwise leave blank'),
  policy_details: defaultPolicySchema.describe('If the document type is "policy" then use this schema to extract the details, otherwise leave blank'),
  statement_details: defaultStatementSchema.describe('If the document type is "statement" then use this schema to extract the details, otherwise leave blank'),
  summary: summary.describe('only provide a summary if the document type is not recognized'),
});
