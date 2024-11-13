import { z } from 'zod';

// Define the Zod schema for your input file
export const InputSchema = z.object({
		"Product Vendor Name": z.string(),
		"Product Name - Color": z.string(),
		'SKU': z.string(),
		"SUPPLIER NAME :": z.string().optional(), // "SUPPLIER NAME : COUNTRY : MATERIAL ITEM#"
		"MATERIAL ITEM DESCRIPTION :": z.string(),
		"FABRIC COLOR": z.string().optional(),
		"COUNTRY": z.string().optional(),
	})
	.transform(data => {
		return {
			productName: data['Product Name - Color'],
			upc: data['SKU'],
			seasonCode: 'DEFAULT', // Default value
			tier1SupplierName: data['Product Vendor Name'],
			materialName: data['MATERIAL ITEM DESCRIPTION :'],
			tier2SupplierName: data['SUPPLIER NAME :'] || 'Unknown Supplier',
			tier2SupplierCountry: data['COUNTRY'] || 'Unknown Country',
			blueSignMaterial: 'F', // Default value
		};
	});
