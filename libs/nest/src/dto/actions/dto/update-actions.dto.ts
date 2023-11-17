import { Prisma } from '@prisma/client';

export class UpdateActionsDto {
  action?: Prisma.InputJsonValue;
  created_at?: Date;
}
