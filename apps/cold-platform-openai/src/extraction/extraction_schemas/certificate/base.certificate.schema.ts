import z from 'zod';
import { effective_end_date, effective_start_date, summary, location, contact } from '../global.schema';

export const baseCertificateSchema = z.object({
	awarded_to: z.object({
		name: z
			.string()
			.describe('If the document type is a certificate then look for the name of the company the certificate is awarded to and place it here if found.  If not found, leave blank'),
		location: location.describe('If the content contains an applicant address, place the address here'),
		contact: contact.describe('If the content contains an applicant contact information, place it here'),
	}),
	certificate_number: z.string().describe('If the document type is a certificate then look for certificate number and place it here if found.  If not found, leave blank'),
	effective_start_date: effective_start_date,
	effective_end_date: effective_end_date,
	summary: summary,
});
