import z from 'zod';
import { contact, effective_start_date, location } from '../../global.schema';

export const intertek = z.object({
	effective_start_date: effective_start_date,
	testing_company: z
		.object({
			name: z.enum(['intertek']),
			location: location.describe('If the document is a test document, attempt to extract data for testing company address information'),
			contact: contact.describe('If the document is a test document, attempt to extract data for testing company contact information'),
		})
		.describe('If the document is a test document, attempt to extract data for testing company information'),
});
