import { Prisma } from '@prisma/client';
import { ActionsEntity } from '../../actions/entities/actions.entity';

export class ActionTemplatesEntity {
  id: string;
  template: Prisma.JsonValue;
  created_at: Date;
  updated_at: Date;
  actions?: ActionsEntity[];
}
