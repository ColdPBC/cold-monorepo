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
		const [tier2SupplierName, tier2SupplierCountry] = data['Supplier Info'] ? data['Supplier Info'].split(' ').slice(0, 2) : ['Unknown Supplier', 'Unknown Country'];

		return {
			productName: data['Product Name - Color'],
			upc: data['SKU'],
			seasonCode: 'DEFAULT', // Default value
			tier1SupplierName: data['Product Vendor Name'],
			materialName: data['Material Description'],
			tier2SupplierName: data['Product Vendor Name'],
			tier2SupplierCountry,
			blueSignMaterial: 'F', // Default value
		};
	});
