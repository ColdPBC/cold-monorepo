import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import * as z from 'zod';
import { SubCategoriesSchema } from './subCategoriesSchema';

export const CategorySchema = extendApi(
  z.object({
    idx: z.number().int().min(0),
    category_name: z.string({
      required_error: 'category_name is required',
      invalid_type_error: 'category_name must be a string',
      description: 'The friendly name of the category',
    }),
    subcategories: SubCategoriesSchema,
    weighted_journey_score: z
      .number({
        description: 'The weighted journey score of the category',
      })
      .int()
      .min(0)
      .nullable()
      .optional(),
  }),
);

export class ZodCategoryDto extends createZodDto(CategorySchema) {}
export type ZodCategory = z.infer<typeof CategorySchema>;
