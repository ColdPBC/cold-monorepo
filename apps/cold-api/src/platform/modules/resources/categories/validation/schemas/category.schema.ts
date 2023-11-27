import { createZodDto } from '@anatine/zod-nestjs';
import * as z from 'zod';
import { SubCategoriesSchema } from './sub-categories.schema';

export const CategorySchema = z.object({
  idx: z.number().min(0),
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
    .min(0)
    .nullable()
    .optional(),
});

export class CategoryDto extends createZodDto(CategorySchema) {}
export type Category = z.infer<typeof CategorySchema>;
