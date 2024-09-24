import z from 'zod';
import { baseStatementSchema } from './base.statement.schema';

export const defaultStatementSchema = baseStatementSchema.extend({
	name: z.string().describe('Look for the Title of the document and place it here if found.  If not found, leave blank'),
});
