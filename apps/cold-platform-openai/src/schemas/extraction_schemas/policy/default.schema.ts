import z from 'zod';
import { basePolicySchema } from './base.policy.schema';

export const defaultPolicySchema = basePolicySchema.extend({
	name: z.string().describe('Look for policy name and place it here if found.  If not found, leave blank'),
});
