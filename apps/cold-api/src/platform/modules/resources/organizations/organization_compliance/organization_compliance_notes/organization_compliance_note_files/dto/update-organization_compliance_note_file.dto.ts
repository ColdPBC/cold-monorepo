import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationComplianceNoteFileDto } from './create-organization_compliance_note_file.dto';

export class UpdateOrganizationComplianceNoteFileDto extends PartialType(CreateOrganizationComplianceNoteFileDto) {}
