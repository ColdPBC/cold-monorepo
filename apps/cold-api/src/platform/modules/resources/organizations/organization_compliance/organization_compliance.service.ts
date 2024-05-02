import { Injectable } from '@nestjs/common';
import { CreateOrganizationComplianceDto } from './dto/create-organization_compliance.dto';
import { UpdateOrganizationComplianceDto } from './dto/update-organization_compliance.dto';

@Injectable()
export class OrganizationComplianceService {
  create(createOrganizationComplianceDto: CreateOrganizationComplianceDto) {
    return createOrganizationComplianceDto;
  }

  findAll() {
    return `This action returns all organizationCompliance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizationCompliance`;
  }

  update(id: number, updateOrganizationComplianceDto: UpdateOrganizationComplianceDto) {
    return updateOrganizationComplianceDto;
  }

  remove(id: number) {
    return `This action removes a #${id} organizationCompliance`;
  }
}
