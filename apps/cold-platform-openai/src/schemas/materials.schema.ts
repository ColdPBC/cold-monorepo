import { z } from 'zod';
import { baseSupplierSchema } from './supplier.schema';

export const baseMaterialSchema = z.object({
	name: z.string().describe('The name of the material.'),
	id: z.string().optional().describe('The id of the material.'),
	style_code: z.string().optional().describe('The product id of the material.  Style is often used as a synonym for product product_id.'),
	product_upc: z.string().optional().describe('The UPC of the product.'),
	supplier: baseSupplierSchema,
});

export const materialsSchema = z.object({
	materials: z
		.array(baseMaterialSchema)
		.describe(
			'Place each material you find in the json here.  If you are not able to find any materials, please leave this empty.  Do not add any materials that are not found in the json.',
		),
});
