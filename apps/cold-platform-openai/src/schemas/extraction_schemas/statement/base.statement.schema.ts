import z from 'zod';
import { effective_end_date, effective_start_date, summary, version } from '../../global.schema';
// If not, and there is an effective start date, then insert a date 1 year from the effective start date, otherwise leave blank
export const baseStatementSchema = z.object({
	summary: summary,
	effective_start_date: effective_start_date,
	effective_end_date: effective_end_date,
	version: version,
});
