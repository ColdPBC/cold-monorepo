import { Prisma } from '@prisma/client';
import { ActionTemplatesEntity } from '../../action-templates/entities/action-templates.entity';
import { OrganizationsEntity } from '../../organizations/entities/organizations.entity';

export class ActionsEntity {
  id: string;
  action: Prisma.JsonValue;
  action_template_id: string;
  organization_id: string;
  action_template?: ActionTemplatesEntity;
  organization?: OrganizationsEntity;
  created_at: Date;
  updated_at: Date;
}
