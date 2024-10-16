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
import { baseMaterialSchema } from '../../materials.schema';

export const baseCertificateSchema = z.object({
	/*material: baseMaterialSchema
		.optional()
		.describe('If the document type is a certificate then look for the material that this certificate if for and place it here if found.  If not found, leave blank'),*/
	certificate_number: z.string().describe('If the document type is a certificate then look for certificate number and place it here if found.  If not found, leave blank'),
	effective_start_date: effective_start_date,
	effective_end_date: effective_end_date,
	summary: summary,
});
