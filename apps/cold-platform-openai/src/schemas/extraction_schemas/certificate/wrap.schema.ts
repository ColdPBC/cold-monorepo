import z from 'zod';
import { baseCertificateSchema } from './base.certificate.schema';

export const wrap = baseCertificateSchema.extend({
	name: z.enum(['WRAP', 'Worldwide Responsible Accredited Production']),
	article_covered: z
		.string()
		.describe(
			'If the document type is a certificate that applies to a specific product range then look for product or article range covered and place it here if found.  If not found, leave blank',
		),
	sample_size: z.string().describe('If the document type is a certificate then look for sample size and place it here if found.  If not found, leave blank'),
	processes_covered: z
		.array(
			z.string().describe('If the document type is a certificate that applies to a specific process then look for processes covered and place it here.  If not found, leave blank'),
		)
		.describe('If the document type is a certificate that applies to a specific process then look for processes covered and place it here.  If not found, leave blank'),
	periods_reviewed: z.array(
		z.object({
			period: z.string().describe('If the document type is a certificate then look for periods reviewed and place it here if found.  If not found, leave blank'),
			hours: z.string().describe('If the document type is a certificate then look for hours reviewed and place it here if found.  If not found, leave blank'),
		}),
	),
});
