import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker, ComplianceSectionGroupsRepository } from '@coldpbc/nest';
import { ComplianceSectionGroupsExtendedDto } from '@coldpbc/nest';

@Injectable()
export class ComplianceSectionGroupsService extends BaseWorker {
  constructor(readonly repository: ComplianceSectionGroupsRepository) {
    super(ComplianceSectionGroupsService.name);
  }

  create(sectionGroup: ComplianceSectionGroupsExtendedDto) {
    try {
      return this.repository.createSectionGroup(sectionGroup);
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  findGroupsByCompliance(compliance_definition_name: string, filter?: boolean, questions?: boolean) {
    return this.repository.getSectionGroupList({ compliance_definition_name }, filter, questions);
  }

  findAll(name: string, filter?: boolean, questions?: boolean) {
    return this.repository.getSectionGroupList({ compliance_definition_name: name }, filter, questions);
  }

  findOne(name: string, id: string, filter?: boolean, questions?: boolean) {
    return this.repository.getSectionGroup({ compliance_definition_name: name, id }, filter, questions);
  }

  remove(name: string, id: string) {
    try {
      return this.repository.deleteSectionGroup({ compliance_definition_name: name, id });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  update(name: string, id: string, data: ComplianceSectionGroupsExtendedDto) {
    try {
      return this.repository.updateSectionGroup({ compliance_definition_name: name, id }, data);
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}
