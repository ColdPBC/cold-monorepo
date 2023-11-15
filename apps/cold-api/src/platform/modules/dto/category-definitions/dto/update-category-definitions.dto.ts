import { Prisma } from '@prisma/client';

export class UpdateCategoryDefinitionsDto {
  name?: string;
  description?: string;
  created_at?: Date;
  definition?: Prisma.InputJsonValue;
}
