import { Injectable } from '@nestjs/common';
import { organization_compliance_note_links } from '@prisma/client';

@Injectable()
export class OrganizationComplianceNoteLinksService {
  create(compliance_note_links_data: organization_compliance_note_links) {
    return 'This action adds a new organizationComplianceNoteLink';
  }

  findAll() {
    return `This action returns all organizationComplianceNoteLinks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizationComplianceNoteLink`;
  }

  update(id: number, compliance_note_links_data: organization_compliance_note_links) {
    return `This action updates a #${id} organizationComplianceNoteLink`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizationComplianceNoteLink`;
  }
}
