import { Prisma } from '@prisma/client';

export class CreateActionTemplatesDto {
  template: Prisma.InputJsonValue;
  created_at: Date;
}
