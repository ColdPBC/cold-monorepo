import { Prisma } from '@prisma/client';
import { ActionTemplatesEntity } from '../../action-templates';
import { OrganizationsEntity } from '../../organizations';

export type ActionsEntity = {
  id: string;
  action: Prisma.JsonValue;
  action_template_id: string;
  organization_id: string;
  action_template?: ActionTemplatesEntity;
  organization?: OrganizationsEntity;
  created_at: Date;
  updated_at: Date;
};
