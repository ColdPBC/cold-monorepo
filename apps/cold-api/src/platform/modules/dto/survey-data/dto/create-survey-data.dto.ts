import { Prisma } from '@prisma/client';

export class CreateSurveyDataDto {
  data: Prisma.InputJsonValue;
  created_at: Date;
}
