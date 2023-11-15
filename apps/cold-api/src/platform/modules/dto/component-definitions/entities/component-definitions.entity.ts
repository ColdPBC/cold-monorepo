import { Prisma, component_definition_types } from '@prisma/client';

export class ComponentDefinitionsEntity {
  id: string;
  name: string;
  type: component_definition_types;
  description: string;
  definition: Prisma.JsonValue;
  created_at: Date;
  updated_at: Date;
}
