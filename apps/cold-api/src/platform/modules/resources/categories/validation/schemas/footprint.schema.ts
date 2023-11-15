import { createZodDto } from '@abitia/zod-dto';
import { extendApi } from '@anatine/zod-openapi';
import * as z from 'zod';

export const FootprintSchema = extendApi(
  z.object({
    value: z.number().min(0).nullable().optional(),
    period_type: z.enum(['year', 'quarter']),
  }),
);

export type Footprint = z.infer<typeof FootprintSchema>;
export class FootprintDto extends createZodDto(FootprintSchema) {}
