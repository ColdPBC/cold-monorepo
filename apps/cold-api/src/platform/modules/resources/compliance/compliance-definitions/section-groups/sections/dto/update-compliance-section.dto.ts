import { PartialType } from '@nestjs/mapped-types';
import { CreateComplianceSectionDto } from './create-compliance-section.dto';

export class UpdateComplianceSectionDto extends PartialType(CreateComplianceSectionDto) {}
