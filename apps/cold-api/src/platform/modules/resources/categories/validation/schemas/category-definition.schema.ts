/*"id": "34ec6d39-9f5f-44ac-b6b5-f0835cf06967",
  "name": "taxonomy",
  "description": "2023 Taxonomy",
  "created_at": "2023-09-18T16:15:26.678Z",
  "updated_at": "2023-09-18T16:15:26.682Z",
  "definition": {}
  */

import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import * as z from 'zod';

import { CategoriesSchema } from './categories.schema';

export const CategoryDefinitionSchema = extendApi(
  z
    .object({
      id: z.string().uuid(),
      name: z.string({
        required_error: 'name is required',
        invalid_type_error: 'name must be a string',
      }),
      description: z.string().optional().nullable(),
      definition: z.object({
        categories: CategoriesSchema,
      }),
    })
    .strip(),
);

export type CategoryDefinition = z.infer<typeof CategoryDefinitionSchema>;
export class CategoryDefinitionDto extends createZodDto(CategoryDefinitionSchema) {}
