import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import * as z from 'zod';
import { CategorySchema } from './category.schema';

export const CategoryDefinitionSchema = extendApi(
  z.object({
    climate_leadership: CategorySchema,
    employee_engagement: CategorySchema,
    company_decarbonization: CategorySchema,
    cold_score: z
      .number({
        description: 'The cold score of the company',
      })
      .int()
      .min(0)
      .nullable()
      .optional(),
  }),
);

export class ZodCategoryDefinitionDto extends createZodDto(CategoryDefinitionSchema) {}
export type ZodCategoryDefinition = z.infer<typeof CategoryDefinitionSchema>;
