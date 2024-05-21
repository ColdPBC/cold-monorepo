import { PartialType } from '@nestjs/mapped-types';
import { CreateComplianceSectionGroupDto } from './create-compliance-section-group.dto';

export class UpdateComplianceSectionGroupDto extends PartialType(CreateComplianceSectionGroupDto) {}
