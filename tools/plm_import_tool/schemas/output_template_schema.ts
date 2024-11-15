// Define the Zod schema for your output file
import { z } from 'zod';

export const ImportTemplateSchema = z.array(
	z.object({
		product_name: z.string().optional(),
		season_code: z.string().optional(),
		style_code: z.string().optional(),
		upc_code: z.string().optional(),
		brand_product_id: z.string().optional(),
		brand_product_sku: z.string().optional(),
		tier_1_supplier_product_id: z.string().optional(),
		product_category: z.string().optional(),
		product_sub_category: z.string().optional(),
		bom_section: z.string().optional(),
		placement: z.string().optional(),
		brand_material_id: z.string().optional(),
		material_name: z.string().optional(),
		material_category: z.string().optional(),
		material_sub_category: z.string().optional(),
		unit_of_measure: z.string().optional(),
		yield: z.number().optional(),
		tier_2_supplier_name: z.string().optional(),
		tier_2_supplier_material_id: z.string().optional(),
	}),
);

export type ImportTemplateType = z.infer<typeof ImportTemplateSchema>;
