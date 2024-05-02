import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationComplianceNoteDto } from './create-organization_compliance_note.dto';

export class UpdateOrganizationComplianceNoteDto extends PartialType(CreateOrganizationComplianceNoteDto) {}
