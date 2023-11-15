import { Prisma } from '@prisma/client';

export class UpdateCategoryDataDto {
  data?: Prisma.InputJsonValue;
  created_at?: Date;
}
