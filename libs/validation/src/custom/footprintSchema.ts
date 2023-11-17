import { createZodDto } from '@abitia/zod-dto';
import { extendApi } from '@anatine/zod-openapi';
import * as z from 'zod';

export const FootprintSchema = extendApi(
  z.object({
    value: z.number().int().min(0).nullable().optional(),
    period_type: z.enum(['year', 'quarter']),
  }),
);

export type ZodFootprint = z.infer<typeof FootprintSchema>;
export class ZodFootprintDto extends createZodDto(FootprintSchema) {}
