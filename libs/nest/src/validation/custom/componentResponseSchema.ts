import { createZodDto } from '@anatine/zod-nestjs';
import * as z from 'zod';
import component_definitionsSchema from '../generated/modelSchema/component_definitionsSchema';

export type ZodComponentResponse = z.infer<typeof component_definitionsSchema>;
export class ZodComponentResponseDto extends createZodDto(component_definitionsSchema) {}
