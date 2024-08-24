import z from 'zod';
import { effective_end_date, effective_start_date, summary, version } from '../global.schema';

export const defaultPolicySchema = z.object({
  name: z.string().describe('Look for policy name and place it here if found.  If not found, leave blank'),
  summary: summary,
  effective_start_date: effective_start_date,
  effective_end_date: effective_end_date,
  version: version,
});
