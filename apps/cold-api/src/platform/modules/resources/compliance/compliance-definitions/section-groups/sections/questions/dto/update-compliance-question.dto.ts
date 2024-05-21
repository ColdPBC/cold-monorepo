import { PartialType } from '@nestjs/mapped-types';
import { CreateComplianceQuestionDto } from './create-compliance-question.dto';

export class UpdateComplianceQuestionDto extends PartialType(CreateComplianceQuestionDto) {}
