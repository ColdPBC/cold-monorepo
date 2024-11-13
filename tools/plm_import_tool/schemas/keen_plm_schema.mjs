import { z } from 'zod';
import * as _ from 'lodash';
import { capitalizeWords } from '../utility/string_utilities.mjs';

// Define the Zod schema for your input file
export const InputSchema = z.object({
	"__EMPTY": z.string(),
	"Placement": z.string(),
	"Bom Comment": z.string().optional(),
	"Raw Material Code": z.string(),
	"Product": z.string(),
	"Material Type": z.string(),
	"Material SubType": z.string(),
	"UOM": z.string(),
	"Net Usage": z.union([z.number(), z.string()]),
	"Supplier": z.string(),
})
	.transform(data => {
		return {
			"bomSection": capitalizeWords(data['__EMPTY']).replace(',', '').trim(),
			"placement": capitalizeWords(data['Placement']).replace(',', '').trim(), // Default value
			"brandMaterialId": data['Raw Material Code'].toUpperCase().replace(',', '').trim(),
			"materialName": capitalizeWords(data['Product']).replace(',', '').trim(),
			"materialCategory": capitalizeWords(data['Material Type']).replace(',', '').trim(), // Default value
			"materialSubcategory": capitalizeWords(data['Material SubType']).replace(',', '').trim(), // Default value
			"unitOfMeasure": data['UOM'].replace(',', '').trim(),
			"yield": data['Net Usage'],
			"tier2SupplierName": capitalizeWords(data['Supplier']).replace(',', '').trim()|| undefined,
		};
	});


// Define the Zod schema for your output file
export const OutputSchema = z.array(z.object({
	product_name: z.string(),
	bom_section: z.string(),
	placement: z.string(),
	brand_material_id: z.string(),
	material_name: z.string(),
	material_category: z.string(),
	material_sub_category: z.string(),
	unit_of_measure: z.string(),
	yield: z.number(),
	tier_2_supplier_name: z.string().optional(),
}));
