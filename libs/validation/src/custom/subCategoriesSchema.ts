import { extendApi } from '@anatine/zod-openapi';
import * as z from 'zod';
import { ActivitySchema } from './activitiesSchema';
import { createZodDto } from '@anatine/zod-nestjs';

export const SubCategorySchema = extendApi(
  z.object({
    idx: z.number(),
    activities: extendApi(z.array(ActivitySchema)),
    journey_score: z.number().int().min(0).optional().nullable(),
    subcategory_name: z.string(),
  }),
);

export const SubCategoriesSchema = z.array(SubCategorySchema);

export type ZodSubCategory = z.infer<typeof SubCategorySchema>;
export type ZodSubCategories = z.infer<typeof SubCategoriesSchema>;
export class ZodSubCategoryDto extends createZodDto(SubCategorySchema) {}
export class ZodSubCategoriesDto extends createZodDto(SubCategoriesSchema) {}
