import { Injectable } from '@nestjs/common';
import { ComplianceSectionsRepository, IAuthenticatedUser } from '@coldpbc/nest';
import { compliance_sections } from '@prisma/client';

@Injectable()
export class ComplianceSectionsService {
  constructor(readonly repository: ComplianceSectionsRepository) {}
  create(sectionData: compliance_sections, user: IAuthenticatedUser) {
    return this.repository.createSection(sectionData, user);
  }

  findAll(name: string, groupId: string, user: IAuthenticatedUser, filter: boolean, questions: boolean) {
    return this.repository.getSectionListByGroup({ compliance_definition_name: name, compliance_section_group_id: groupId }, user, filter, questions);
  }

  findSectionsByComplianceAndGroup(compliance_definition_name: string, user: IAuthenticatedUser, groupId: string, filter?: boolean, questions?: boolean) {
    return this.repository.getSectionListByComplianceAndGroup(compliance_definition_name, groupId, user, filter, questions);
  }

  findSectionsByGroup(name: string, compliance_section_group_id: string, user: IAuthenticatedUser, filter?: boolean, questions?: boolean) {
    return this.repository.getSectionListByGroup({ compliance_definition_name: name, compliance_section_group_id }, user, filter, questions);
  }

  findOne(name: string, groupId: string, id: string, user: IAuthenticatedUser, filter?: boolean, questions?: boolean) {
    return this.repository.getSectionByComplianceAndId(name, groupId, id, user, filter, questions);
  }

  findOneByKey(name: string, groupId: string, key: string, user: IAuthenticatedUser, filter?: boolean, questions?: boolean) {
    return this.repository.getSectionByComplianceAndKey(name, groupId, key, user, filter, questions);
  }

  findOneByKeyAndName(groupId: string, compliance_definition_name: string, user: IAuthenticatedUser, key: string, filter?: boolean, questions?: boolean) {
    return this.repository.getSectionByComplianceAndKey(groupId, compliance_definition_name, key, user, filter, questions);
  }

  update(name: string, groupId: string, id: string, sectionData: compliance_sections, user: IAuthenticatedUser) {
    // Set sectionData properties to the provided values
    sectionData.compliance_definition_name = name;
    sectionData.id = id;

    return this.repository.updateSection(name, groupId, id, sectionData, user);
  }

  remove(id: string, name: string, sgId: string, user: IAuthenticatedUser) {
    return this.repository.deleteSection(name, sgId, id, user);
  }
}
