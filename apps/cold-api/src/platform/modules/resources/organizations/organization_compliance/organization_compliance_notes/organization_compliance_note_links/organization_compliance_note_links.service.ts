import { Injectable } from '@nestjs/common';
import { CreateOrganizationComplianceNoteLinkDto } from './dto/create-organization_compliance_note_link.dto';
import { UpdateOrganizationComplianceNoteLinkDto } from './dto/update-organization_compliance_note_link.dto';

@Injectable()
export class OrganizationComplianceNoteLinksService {
  create(createOrganizationComplianceNoteLinkDto: CreateOrganizationComplianceNoteLinkDto) {
    return 'This action adds a new organizationComplianceNoteLink';
  }

  findAll() {
    return `This action returns all organizationComplianceNoteLinks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizationComplianceNoteLink`;
  }

  update(id: number, updateOrganizationComplianceNoteLinkDto: UpdateOrganizationComplianceNoteLinkDto) {
    return `This action updates a #${id} organizationComplianceNoteLink`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizationComplianceNoteLink`;
  }
}
