import z from 'zod';
import { baseCertificateSchema } from './base.certificate.schema';

export const bluesignSchema = baseCertificateSchema.extend({
	name: z.enum(['bluesign']).describe('The name of the certificate.'),
});

export const bluesignProductSchema = bluesignSchema.extend({
	name: z.enum(['bluesign Product']).describe('The name of the bluesign product certificate.'),
});
