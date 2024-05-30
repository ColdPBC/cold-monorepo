import { Injectable } from '@nestjs/common';

@Injectable()
export class OrganizationComplianceNotesService {
  create(createOrganizationComplianceNoteDto: any) {
    return 'This action adds a new organizationComplianceNote';
  }

  findAll() {
    return `This action returns all organizationComplianceNotes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizationComplianceNote`;
  }

  update(id: number, updateOrganizationComplianceNoteDto: any) {
    return `This action updates a #${id} organizationComplianceNote`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizationComplianceNote`;
  }
}
