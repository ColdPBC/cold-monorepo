import { PartialType } from '@nestjs/mapped-types';
import { CreateComplianceSectionGroupDto } from './create-compliance_section_group.dto';

export class UpdateComplianceSectionGroupDto extends PartialType(CreateComplianceSectionGroupDto) {}
