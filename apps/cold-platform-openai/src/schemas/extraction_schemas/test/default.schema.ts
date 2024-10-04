import z from 'zod';
import { baseTestSchema } from './base.test.schema';
import { contact, location } from '../../global.schema';

export const defaultTestSchema = baseTestSchema.extend({
	name: z.string().describe('Look for test name and place it here if found.  If not found, leave blank'),
	testing_company: z
		.object({
			name: z.string().describe('If the document contains an applicant, place it here'),
			location: location.describe('If the document is a test document, attempt to extract data for testing company address information'),
			contact: contact.describe('If the document is a test document, attempt to extract data for testing company contact information'),
		})
		.describe('If the document is a test document, attempt to extract data for testing company information'),
});
