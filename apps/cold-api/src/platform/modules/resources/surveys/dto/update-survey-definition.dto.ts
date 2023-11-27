import { PartialType } from '@nestjs/swagger';
import { CreateSurveyDefinitionDto } from './create-survey-definition.dto';

export class UpdateSurveyDefinitionDto extends PartialType(CreateSurveyDefinitionDto) {}
