import { JsonValue } from '@prisma/client/runtime/library';
import { component_definition_types } from 'prisma/prisma-client';
import { ComponentDefinitionDto } from './component-definition-dto';

export class CreateComponentDefinitionDto extends ComponentDefinitionDto {
  id: string;
  name: string;
  type: component_definition_types;
  definition: JsonValue;
  description: string;
  created_at: Date;
  updated_at: Date;
}
