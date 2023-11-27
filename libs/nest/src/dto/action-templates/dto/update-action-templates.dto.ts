import { Prisma } from '@prisma/client';

export class UpdateActionTemplatesDto {
  template?: Prisma.InputJsonValue;
  created_at?: Date;
}
