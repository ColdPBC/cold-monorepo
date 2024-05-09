import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationComplianceNoteLinkDto } from './create-organization_compliance_note_link.dto';

export class UpdateOrganizationComplianceNoteLinkDto extends PartialType(CreateOrganizationComplianceNoteLinkDto) {}
