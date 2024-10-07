import z from 'zod';
import {
	effective_end_date,
	effective_start_date,
	summary,
	location,
	contact,
	address_line_1,
	address_line_2,
	city,
	state_province,
	postal_code,
	country,
} from '../../global.schema';

export const baseCertificateSchema = z.object({
	supplier: z.object({
		name: z.string().describe('Look for the name of the company the certificate is awarded to and place it here if found.  If not found, leave blank'),
		address_line_1,
		address_line_2,
		city,
		state_province,
		postal_code,
		country,
	}),
	certificate_number: z.string().describe('If the document type is a certificate then look for certificate number and place it here if found.  If not found, leave blank'),
	effective_start_date: effective_start_date,
	effective_end_date: effective_end_date,
	summary: summary,
});
