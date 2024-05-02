import { Injectable } from '@nestjs/common';
import { CreateOrganizationComplianceNoteDto } from './dto/create-organization_compliance_note.dto';
import { UpdateOrganizationComplianceNoteDto } from './dto/update-organization_compliance_note.dto';

@Injectable()
export class OrganizationComplianceNotesService {
  create(createOrganizationComplianceNoteDto: CreateOrganizationComplianceNoteDto) {
    return 'This action adds a new organizationComplianceNote';
  }

  findAll() {
    return `This action returns all organizationComplianceNotes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizationComplianceNote`;
  }

  update(id: number, updateOrganizationComplianceNoteDto: UpdateOrganizationComplianceNoteDto) {
    return `This action updates a #${id} organizationComplianceNote`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizationComplianceNote`;
  }
}
