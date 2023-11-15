import { Prisma } from '@prisma/client';

export class CreateCategoryDefinitionsDto {
  name: string;
  description: string;
  created_at: Date;
  definition: Prisma.InputJsonValue;
}
