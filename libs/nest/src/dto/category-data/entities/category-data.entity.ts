import { Prisma } from '@prisma/client';
import { OrganizationsEntity } from '../../organizations';
import { CategoryDefinitionsEntity } from '../../category-definitions';

export type CategoryDataEntity = {
  id: string;
  category_definition_id: string;
  organization_id: string;
  data: Prisma.JsonValue;
  created_at: Date;
  updated_at: Date;
  organizations?: OrganizationsEntity;
  category_definition?: CategoryDefinitionsEntity;
};
