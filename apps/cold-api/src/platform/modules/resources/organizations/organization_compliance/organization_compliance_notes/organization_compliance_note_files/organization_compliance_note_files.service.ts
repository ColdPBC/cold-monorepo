import { Injectable } from '@nestjs/common';
import { CreateOrganizationComplianceNoteFileDto } from './dto/create-organization_compliance_note_file.dto';
import { UpdateOrganizationComplianceNoteFileDto } from './dto/update-organization_compliance_note_file.dto';

@Injectable()
export class OrganizationComplianceNoteFilesService {
  create(createOrganizationComplianceNoteFileDto: CreateOrganizationComplianceNoteFileDto) {
    return 'This action adds a new organizationComplianceNoteFile';
  }

  findAll() {
    return `This action returns all organizationComplianceNoteFiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizationComplianceNoteFile`;
  }

  update(id: number, updateOrganizationComplianceNoteFileDto: UpdateOrganizationComplianceNoteFileDto) {
    return `This action updates a #${id} organizationComplianceNoteFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizationComplianceNoteFile`;
  }
}
