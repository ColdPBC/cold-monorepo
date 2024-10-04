import { z } from 'zod';
import { baseSupplierSchema } from './supplier.schema';

export const baseProductSchema = z.object({
	name: z.string().describe('The name of the product.'),
	style_code: z
		.string()
		.optional()
		.describe(
			'The product id, product, or item number, or style code of the product as identified by the company that owns the product.  Style is often used as a synonym for product product_id.  It is important that you do extract this number exactly as it is shown in the document.',
		),
	supplier: baseSupplierSchema.optional().describe('The supplier of the product if found.  Otherwise leave blank.'),
	season_code: z
		.string()
		.optional()
		.describe(
			'If you can find a season code, please include it here, otherwise leave it blank.  It is important that you do extract this value exactly as it is shown in the document.',
		),
	upc_code: z
		.string()
		.optional()
		.describe('The UPC of the product.  It is important that you do extract this number exactly as it is shown in the document.  If you cannot find a UPC code leave it blank.  '),
});

export const baseProductsSchema = z.object({
	products: z.array(baseProductSchema).describe('If more than one product '),
});
