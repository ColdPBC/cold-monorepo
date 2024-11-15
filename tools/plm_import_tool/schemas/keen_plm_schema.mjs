import { z } from 'zod';
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
			"placement": capitalizeWords(data['Placement']).replace(',', '').trim(),
			"brandMaterialId": data['Raw Material Code'].toUpperCase().replace(',', '').trim(),
			"materialName": capitalizeWords(data['Product']).replace(',', '').trim(),
			"materialCategory": capitalizeWords(data['Material Type']).replace(',', '').trim(),
			"materialSubcategory": capitalizeWords(data['Material SubType']).replace(',', '').trim(),
			"unitOfMeasure": data['UOM'].replace(',', '').trim(),
			"yield": data['Net Usage'],
			"tier2SupplierName": capitalizeWords(data['Supplier']).replace(',', '').trim() || undefined,
		};
	});
