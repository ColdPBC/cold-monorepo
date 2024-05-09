import { PartialType } from '@nestjs/mapped-types';
import { CreateComplianceSectionDto } from './create-compliance_section.dto';

export class UpdateComplianceSectionDto extends PartialType(CreateComplianceSectionDto) {}
