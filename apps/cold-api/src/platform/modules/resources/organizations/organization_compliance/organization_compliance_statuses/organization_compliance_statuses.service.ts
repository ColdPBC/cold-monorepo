import { Injectable } from '@nestjs/common';
import { CreateOrganizationComplianceStatusDto } from './dto/create-organization_compliance_status.dto';
import { UpdateOrganizationComplianceStatusDto } from './dto/update-organization_compliance_status.dto';

@Injectable()
export class OrganizationComplianceStatusesService {
  create(createOrganizationComplianceStatusDto: CreateOrganizationComplianceStatusDto) {
    return 'This action adds a new organizationComplianceStatus';
  }

  findAll() {
    return `This action returns all organizationComplianceStatuses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizationComplianceStatus`;
  }

  update(id: number, updateOrganizationComplianceStatusDto: UpdateOrganizationComplianceStatusDto) {
    return `This action updates a #${id} organizationComplianceStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizationComplianceStatus`;
  }
}
