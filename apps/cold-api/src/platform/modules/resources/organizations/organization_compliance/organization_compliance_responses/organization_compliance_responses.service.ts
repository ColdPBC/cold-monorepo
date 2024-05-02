import { Injectable } from '@nestjs/common';
import { CreateOrganizationComplianceResponseDto } from './dto/create-organization_compliance_response.dto';
import { UpdateOrganizationComplianceResponseDto } from './dto/update-organization_compliance_response.dto';

@Injectable()
export class OrganizationComplianceResponsesService {
  create(createOrganizationComplianceResponseDto: CreateOrganizationComplianceResponseDto) {
    return 'This action adds a new organizationComplianceResponse';
  }

  findAll() {
    return `This action returns all organizationComplianceResponses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizationComplianceResponse`;
  }

  update(id: number, updateOrganizationComplianceResponseDto: UpdateOrganizationComplianceResponseDto) {
    return `This action updates a #${id} organizationComplianceResponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizationComplianceResponse`;
  }
}
