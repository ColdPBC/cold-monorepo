import { z } from 'zod';
import { capitalizeWords } from '../utility/string_utilities.mjs';

const getMaterialSubCategory = (materialType) => {
	if (materialType.includes('/')) {
		const parts = materialType.split('/');
		return {subCategory: parts.pop(), category: parts.join(' / ')};
	}
	
}
// Define the Zod schema for your input file
export const InputSchema = z.object({
	"Material": z.string(),
	"Material Code": z.string().optional(),
	"Material Description": z.string().optional(),
	"Material Type": z.string().optional(),
	"Material Content": z.string().optional()
})
	.transform(data => {
		return {
			"brandMaterialId": data['Material Code'].toUpperCase().replace(/,/g, '').trim(),
			"materialName": capitalizeWords(data['Material']).replace(/,/g, '').trim(),
			"materialCategory": capitalizeWords(getMaterialSubCategory(data['Material Type']).category).replace(/,/g, '').trim(),
			"description": data['Material Content'].replace(/,/g, ' &').trim() || undefined,
			"tier2SupplierName": capitalizeWords(data['Material Description']).replace(/,/g, '').trim() || undefined,
			"materialSubcategory": capitalizeWords(getMaterialSubCategory(data['Material Type']).subCategory).replace(/,/g, '').trim(),
		};
	});
