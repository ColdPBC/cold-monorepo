import { Prisma, survey_types } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSurveyDefinitionsDto {
  name: string;
  @ApiProperty({ enum: survey_types })
  type: survey_types;
  description: string;
  created_at: Date;
  definition: Prisma.InputJsonValue;
}
