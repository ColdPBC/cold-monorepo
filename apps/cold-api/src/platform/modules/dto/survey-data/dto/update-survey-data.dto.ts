import { Prisma } from '@prisma/client';

export class UpdateSurveyDataDto {
  data?: Prisma.InputJsonValue;
  created_at?: Date;
}
