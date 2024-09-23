import z from 'zod';
import { baseCertificateSchema } from './base.certificate.schema';

export const defaultCertificateSchema = baseCertificateSchema.extend({
	name: z.string().describe('If the document type is a certificate then look for certificate name and place it here if found.  If not found, leave blank'),
});
