import { Prisma } from '@prisma/client';

export type CreateActionTemplatesDto = {
  template: Prisma.InputJsonValue;
  created_at: Date;
};
