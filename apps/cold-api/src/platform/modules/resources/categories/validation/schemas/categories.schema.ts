import { createZodDto } from '@anatine/zod-nestjs';
import * as z from 'zod';
import { CategorySchema } from './category.schema';

export const CategoriesSchema = z.object({
  climate_leadership: CategorySchema,
  employee_engagement: CategorySchema,
  company_decarbonization: CategorySchema,
  cold_score: z
    .number({
      description: 'The cold score of the company',
    })
    .min(0)
    .nullable()
    .optional(),
});

export class CategoriesDto extends createZodDto(CategoriesSchema) {}
export type Categories = z.infer<typeof CategoriesSchema>;
