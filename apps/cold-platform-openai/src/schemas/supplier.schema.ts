import { z } from 'zod';
import { location } from './global.schema';

export const baseSupplierSchema = location.extend({
	name: z.string().describe('The company name of the supplier'),
	supplier: z.boolean().describe('Indicates if the entity is a supplier'),
	supplier_tier: z
		.number()
		.optional()
		.describe(
			'The tier of the supplier.  If the item the supplier is providing is a material or component, set this to the number 2.  If the supplier is providing a finished product, set this to the number 1.  If the supplier is providing a service, set this to the number 1.',
		),
	address_line_1: z.string().describe('The first line of the supplier or vendor address. If no supplier is found, leave this blank.'),
	address_line_2: z.string().optional().describe('The second line of the supplier or vendor address. If no supplier is found, leave this blank.'),
	city: z.string().optional().describe('The city of the supplier or vendor. If no supplier is found, leave this blank.'),
	state_province: z.string().optional().describe('The state or province of the supplier or vendor. If no supplier is found, leave this blank.'),
	country: z.string().optional().describe('The country of the supplier or vendor. If no supplier is found, leave this blank.'),
	postal_code: z.string().optional().describe('The postal code of the supplier or vendor. If no supplier is found, leave this blank.'),
});

export const suppliersSchema = z.object({
	suppliers: z.array(baseSupplierSchema).describe('The suppliers'),
});
