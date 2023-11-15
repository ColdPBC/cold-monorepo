import { Prisma } from '@prisma/client';

export class CreateActionsDto {
  action: Prisma.InputJsonValue;
  created_at: Date;
}
