import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import * as z from 'zod';

import { CategoryDefinitionSchema } from './categoryDefinitionSchema';

export const CategoryResponseSchema = extendApi(
  z
    .object({
      id: z.string().uuid(),
      name: z.string({
        required_error: 'name is required',
        invalid_type_error: 'name must be a string',
      }),
      description: z.string(),
      definition: z.object({
        categories: CategoryDefinitionSchema,
      }),
      created_at: z.date(),
      updated_at: z.date(),
    })
    .strip(),
);

export type ZodCategoryResponse = z.infer<typeof CategoryResponseSchema>;
export class ZodCategoryResponseDto extends createZodDto(CategoryResponseSchema) {}
