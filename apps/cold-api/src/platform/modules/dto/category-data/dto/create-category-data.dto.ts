import { Prisma } from '@prisma/client';

export class CreateCategoryDataDto {
  data: Prisma.InputJsonValue;
  created_at: Date;
}
