import z from 'zod';
import { effective_end_date, effective_start_date, summary, version } from '../global.schema';

export const defaultStatementSchema = z.object({
  name: z.string().describe('Look for the Title of the document and place it here if found.  If not found, leave blank'),
  summary: summary,
  effective_start_date: effective_start_date,
  effective_end_date: effective_end_date.describe(
    'If the document has an expiration date, place it here as an ISO 8601 formatted date.  If not, and there is an effective start date, then insert a date 1 year from the effective start date, otherwise leave blank',
  ),
  version: version,
});
