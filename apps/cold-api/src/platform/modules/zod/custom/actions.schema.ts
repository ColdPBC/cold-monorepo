import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { ActionTemplateSchema } from './action_templates.schema';

export const CreateActionItemSchema = z.object({
  id: z.string().uuid().optional(),
  template: ActionTemplateSchema,
  action_template_id: z.string().uuid(),
  organization_id: z.string().uuid(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export class ZodCreateActionDto extends createZodDto(CreateActionItemSchema) {}

export const ActionSchema = CreateActionItemSchema.extend({
  id: z
    .string({
      required_error: 'id is required',
      invalid_type_error: 'id must be a valid UUID string',
    })
    .uuid(),
  created_at: z
    .string({
      required_error: 'created_at is required',
      invalid_type_error: 'created_at must be a valid ISO 8601 datetime string',
    })
    .datetime(),
  updated_at: z
    .string({
      invalid_type_error: 'updated_at must be a valid ISO 8601 datetime string',
    })
    .datetime()
    .optional(),
});

export class ZodActionAssignmentDto extends createZodDto(ActionSchema) {}
