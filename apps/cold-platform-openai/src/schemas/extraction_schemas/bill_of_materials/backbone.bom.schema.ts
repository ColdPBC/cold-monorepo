import { z } from 'zod';
import { location } from '../../global.schema';
import { baseProductSchema } from '../../products.schema';

export const BomMetadataSchema = z.object({
	year: z.string().optional().describe('The year of the product.  If no year is found, leave this blank'),
	author: z.object({
		name: z.string().optional().describe('The name of the author of the document.  If no author is found, leave this blank'),
		email: z.string().optional().describe('The email of the author of the document.  If no email is found, leave this blank'),
	}),
	components: z.array(
		z.object({
			name: z.string().optional().describe('The name of the component.  If no name is found, leave this blank'),
			code: z.string().optional().describe('The code or number of the component.  If no code is found, leave this blank'),
			supplier: z.object({
				name: z.string().optional().describe('The name of the supplier of the component.  If no supplier is found, leave this blank'),
				code: z.string().optional().describe('The code or number of the supplier of the component.  If no code is found, leave this blank'),
				tier: z.string().optional().describe('The tier of the supplier of the component.  If no tier is found, leave this blank'),
			}),
			quantity: z.string().optional().describe('The quantity of the component.  If no quantity is found, leave this blank'),
			placement: z.string().optional().describe('The placement of the component.  If no placement is found, leave this blank'),
		}),
	),
	materials: z.array(
		z.object({
			name: z.string(),
			code: z.string(),
			supplier: z.object({
				name: z.string().optional().describe('The name of the supplier of the component.  If no supplier is found, leave this blank'),
				code: z.string().optional().describe('The code or number of the supplier of the component.  If no code is found, leave this blank'),
				tier: z.string().optional().describe('The tier of the supplier of the component.  If no tier is found, leave this blank'),
			}),
			colorCode: z.string(),
			colorDescription: z.string(),
			customCode: z.string(),
		}),
	),
	colorVariants: z.array(
		z.object({
			color: z.string(),
			customCode: z.string(),
			externalCode: z.string(),
		}),
	),
});

export const BillOfMaterialsSchema = z.object({
	products: z.array(
		baseProductSchema.extend({
			metadata: BomMetadataSchema,
		}),
	),
});

export default BillOfMaterialsSchema;
