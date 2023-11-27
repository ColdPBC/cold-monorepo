import { PartialType } from '@nestjs/swagger';
import { CreateComponentDefinitionDto } from './create-component-definition.dto';

export class UpdateComponentDefinitionDto extends PartialType(CreateComponentDefinitionDto) {}
