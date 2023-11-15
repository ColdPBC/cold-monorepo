import { createZodDto } from '@abitia/zod-dto';
import * as z from 'zod';
import { ActivitySchema } from './activities.schema';

export const SubCategorySchema = z.object({
  idx: z.number(),
  activities: ActivitySchema,
  journey_score: z.number().nullable(),
  subcategory_name: z.string(),
});

export const SubCategoriesSchema = SubCategorySchema;

export type SubCategory = z.infer<typeof SubCategorySchema>;
export type SubCategories = z.infer<typeof SubCategoriesSchema>;
export class SubCategoryDto extends createZodDto(SubCategorySchema) {}
export class SubCategoriesDto extends createZodDto(SubCategoriesSchema) {}
