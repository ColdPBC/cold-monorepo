import z from 'zod';
import { summary } from './global.schema';

export const classifySchema = z.object({
  type: z.enum(['test', 'certificate', 'policy', 'statement']).describe('The type of document being classified'),
  certificate_authority: z.enum(['bluesign', 'wrap', 'other']).describe('The type of certificate'),
  testing_company: z.enum(['intertek', 'tuvRheinland', 'SGS', 'other']).describe('The name of the testing company'),
  prompt: z
    .string()
    .describe('Generate a prompt to instruct the model on how to accurately extract data from the document.  The purpose of this prompt is to extract data from the document.'),
  summary: summary,
});
