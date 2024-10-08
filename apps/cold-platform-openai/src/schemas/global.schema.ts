import z from 'zod';

// contact information
export const address_line_1 = z
	.string()
	.optional()
	.describe('If the content contains an applicant address, place the street address here here.  If you are unable to find it, leave blank');
export const address_line_2 = z
	.string()
	.optional()
	.describe('If the content contains an applicant address, place the unit/suite or "care of" information here.  If you are unable to find it, leave blank');
export const city = z.string().optional().describe('If the content contains an applicant address, place the city here. If you are unable to find it, leave blank');
export const state_province = z
	.string()
	.optional()
	.describe('If the content contains an applicant address, place the state or province here. If you are unable to find it, leave blank');
export const postal_code = z.string().optional().describe('If the content contains an applicant address, place the postal code here. If you are unable to find it, leave blank');
export const country = z.string().optional().describe('If the content contains an applicant address, place the country here. If you are unable to find it, leave blank');
export const email = z.string().optional().describe('If the content contains an applicant email, place it here.  If you are unable to find it, leave blank');
export const phone = z.string().optional().describe('If the content contains an applicant phone number, place it here. If you are unable to find it, leave blank');
export const website = z.string().optional().describe('If the content contains an applicant website, place it here. If you are unable to find it, leave blank');

export const contact = z.object({
	email,
	phone,
	website,
});

// location
export const location = z.object({
	address_line_1,
	address_line_2,
	city,
	state_province,
	postal_code,
	country,
});

// dates
export const effective_start_date = z
	.string()
	.describe('Look for effective start date or date the document was signed and place it here as an ISO 8601 formatted dated.  If not found, leave blank');
export const effective_end_date = z
	.string()
	.optional()
	.describe('Look for effective end date or expiration date and place it here as an ISO 8601 formatted date.  If not found, leave blank');

// content summary
export const summary = z
	.string()
	.optional()
	.describe('Summarize the content here, be sure to include any relevant information that may be useful for the user in identifying the purpose of the document');

export const version = z.string().optional().describe('If the content has a version, place it here.  If not found, leave blank');
