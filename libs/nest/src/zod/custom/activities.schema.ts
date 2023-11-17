import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import * as z from 'zod';
import { FootprintSchema } from './footprint.schema';

export const ActivitySchema = extendApi(
  z.object({
    activity_name: z.string(),
    activity_description: z.string(),
    footprint: z
      .record(z.string().regex(/^[0-9]{4}-?q?[1-4]?$/), FootprintSchema)
      .optional()
      .nullable(),
  }),
);

export class ZodActivityDto extends createZodDto(ActivitySchema) {}
export type ZodActivity = z.infer<typeof ActivitySchema>;
