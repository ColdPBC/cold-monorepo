import z from 'zod';

// contact information
export const address_line_1 = z.string().describe('If the content contains an applicant address, place the street address here here');
export const address_line_2 = z.string().describe('If the content contains an applicant address, place the unit/suite or "care of" information here');
export const city = z.string().describe('If the content contains an applicant address, place the city here');
export const state_province = z.string().describe('If the content contains an applicant address, place the state or province here');
export const postal_code = z.string().describe('If the content contains an applicant address, place the postal code here');
export const country = z.string().describe('If the content contains an applicant address, place the country here');
export const email = z.string().describe('If the content contains an applicant email, place it here');
export const phone = z.string().describe('If the content contains an applicant phone number, place it here');
export const website = z.string().describe('If the content contains an applicant website, place it here');

// dates
export const effective_start_date = z
  .string()
  .describe('Look for effective start date or date the document was signed and place it here as an ISO 8601 formatted dated.  If not found, leave blank');
export const effective_end_date = z.string().describe('Look for effective end date or expiration date and place it here as an ISO 8601 formatted date.  If not found, leave blank');

// content summary
export const summary = z
  .string()
  .describe('Summarize the content here, be sure to include any relevant information that may be useful for the user in identifying the purpose of the document');

export const version = z.string().describe('If the content has a version, place it here.  If not found, leave blank');
