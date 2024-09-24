import z from 'zod';
import { effective_end_date, effective_start_date, summary, version } from '../global.schema';

export const basePolicySchema = z.object({
	summary: summary,
	effective_start_date: effective_start_date,
	effective_end_date: effective_end_date,
	version: version,
});
