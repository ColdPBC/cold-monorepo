import { z } from 'zod';
import { baseProductSchema } from '../../products.schema';
import { baseSupplierSchema } from '../../supplier.schema';

export const PurchaseOrderMetadataSchema = z.object({
	shipTo: z.object({
		name: z.string().optional().describe('The name of the location where the product will be shipped.'),
		address_line_1: z.string().optional().describe('The first line of the supplier or vendor address.'),
		address_line_2: z.string().optional().describe('The second line of the supplier or vendor address.'),
		city: z.string().optional().describe('The city of the supplier or vendor.'),
		state_province: z.string().optional().describe('The state or province of the supplier or vendor.'),
		country: z.string().optional().describe('The country of the supplier or vendor.'),
	}),
	billTo: z.object({
		name: z.string().optional().describe('The name of the location where the bill should be sent'),
		address_line_1: z.string().optional().describe('The first line of the billing address'),
		address_line_2: z.string().optional().optional().describe('The second line of the billing address'),
		city: z.string().optional().describe('The city of the billing address'),
		state_province: z.string().optional().describe('The state or province of the billing address'),
		country: z.string().optional().describe('The country of the billing address'),
	}),
	memo: z.string().optional(),
	receiveBy: z.string().optional(),
	totalQuantity: z.number().optional(),
	items: z.array(
		z.object({
			itemNo: z.number().optional(),
			upc: z.string().optional(),
			description: z.string().optional(),
			styleCode: z.string().optional(),
			scheduleBNumber: z.string().optional(),
			expectedReceiptDate: z.string().optional(), // Inferred as date string
			quantityOrdered: z.number().optional(),
			unitPrice: z.number().optional(),
			amount: z.number().optional(),
		}),
	),
	totalAmount: z.number().optional(),
});

export const PurchaseOrderProductSchema = baseProductSchema.extend({
	metadata: PurchaseOrderMetadataSchema,
});

export const PoProductsSchema = z.object({
	products: z.array(baseProductSchema),
	metadata: PurchaseOrderMetadataSchema,
});

export default PoProductsSchema;
