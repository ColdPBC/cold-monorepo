import { Prisma, component_definition_types } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateComponentDefinitionsDto {
  name: string;
  @ApiProperty({ enum: component_definition_types })
  type: component_definition_types;
  description: string;
  definition: Prisma.InputJsonValue;
  created_at: Date;
}
