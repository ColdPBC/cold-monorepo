import { component_definitions } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';
import { component_definition_types } from 'prisma/prisma-client';

export class ComponentDefinitionDto implements component_definitions {
  definition: JsonValue;
  description: string;
  type: component_definition_types;
  id: string;
  name: string;
  updated_at: Date;
  created_at: Date;
}
