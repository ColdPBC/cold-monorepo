import { Injectable } from '@nestjs/common';

@Injectable()
export class OrganizationComplianceNoteFilesService {
  create(createOrganizationComplianceNoteFileDto: any) {
    return 'This action adds a new organizationComplianceNoteFile';
  }

  findAll() {
    return `This action returns all organizationComplianceNoteFiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizationComplianceNoteFile`;
  }

  update(id: number, updateOrganizationComplianceNoteFileDto: any) {
    return `This action updates a #${id} organizationComplianceNoteFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizationComplianceNoteFile`;
  }
}
