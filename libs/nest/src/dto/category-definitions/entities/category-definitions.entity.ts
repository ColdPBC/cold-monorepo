import { Prisma } from '@prisma/client';
import { CategoryDataEntity } from '../../category-data';

export type CategoryDefinitionsEntity = {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  definition: Prisma.JsonValue;
  category_data?: CategoryDataEntity[];
};
