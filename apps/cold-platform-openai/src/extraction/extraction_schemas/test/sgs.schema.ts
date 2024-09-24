import z from 'zod';
import {
	address_line_1,
	address_line_2,
	city,
	contact,
	country,
	effective_start_date,
	email,
	location,
	phone,
	postal_code,
	state_province,
	summary,
	website,
} from '../global.schema';

export const sgs = z.object({
	effective_start_date: effective_start_date,
	testing_company: z
		.object({
			name: z.enum(['SGS Vietnam Ltd.']),
			location: location.describe('If the document is a test document, attempt to extract data for testing company address information'),
			contact: contact.describe('If the document is a test document, attempt to extract data for testing company contact information'),
		})
		.describe('If the document is a test document, attempt to extract data for testing company information'),
	tests: z.array(
		z.object({
			name: z.string().describe('Try to determine the name or title of the content and place it here.  If not found or the value is "/" then leave it blank.'),
			product_name: z.string().describe('If the document contains a product name, place it here.  If not found or the value is "/" then leave it blank.'),
			product_style_number: z.string().describe('If the document contains a product style number, place it here.  If not found or the value is "/" then leave it blank.'),
			product_color: z.string().describe('If the document contains a product color, place it here.  If not found or the value is "/" then leave it blank.'),
			bom: z.string().describe('If the document contains a bill of materials, place it here.  If not found or the value is "/" then leave it blank.'),
			buyer: z.string().describe('If the document contains a buyer, place it here.  If not found or the value is "/" then leave it blank.'),
			manufacturer: z.string().describe('If the document contains a manufacturer, place it here.  If not found or the value is "/" then leave it blank.'),
			country_of_origin: z.string().describe('If the document contains a country of origin, place it here.  If not found or the value is "/" then leave it blank.'),
			country_of_destination: z.string().describe('If the document contains a country of destination, place it here.  If not found or the value is "/" then leave it blank.'),
			product_weight: z.string().describe('If the document contains a product weight, place it here.  If not found or the value is "/" then leave it blank.'),
			end_use: z.string().describe('If the document contains an end use, place it here.  If not found or the value is "/" then leave it blank.'),
			test_samples: z.array(
				z.object({
					sample_number: z.string().describe('If the document contains a sample number, place it here, otherwise leave it blank'),
					component_description: z.string().describe('If the document contains a sample description, place it here, otherwise leave it blank'),
					group_number: z.string().describe('If the document contains a group number, place it here, otherwise leave it blank'),
				}),
			),
			results: z.array(
				z.object({
					test_number: z.string().describe('If the document contains a test number, place it here, otherwise leave it blank'),
					substance_name: z.string().describe('If the document contains a substance name, place it here, otherwise leave it blank'),
					cas_ec_number: z.string().describe('If the document contains a CAS or EC number, place it here, otherwise leave it blank'),
					limit: z.string().describe('If the document contains an RL or reporting limit, place it here, otherwise leave it blank'),
					concentration_pct: z.string().describe('If the document contains a concentration percentage, place it here, otherwise leave it blank'),
				}),
			),
		}),
	),
});
