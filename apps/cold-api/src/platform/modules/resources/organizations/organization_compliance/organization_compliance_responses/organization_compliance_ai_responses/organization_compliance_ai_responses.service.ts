import { Injectable } from '@nestjs/common';
import { CreateOrganizationComplianceAiResponseDto } from './dto/create-organization_compliance_ai_response.dto';
import { UpdateOrganizationComplianceAiResponseDto } from './dto/update-organization_compliance_ai_response.dto';

@Injectable()
export class OrganizationComplianceAiResponsesService {
  create(createOrganizationComplianceAiResponseDto: CreateOrganizationComplianceAiResponseDto) {
    return 'This action adds a new organizationComplianceAiResponse';
  }

  findAll() {
    return `This action returns all organizationComplianceAiResponses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizationComplianceAiResponse`;
  }

  update(id: number, updateOrganizationComplianceAiResponseDto: UpdateOrganizationComplianceAiResponseDto) {
    return `This action updates a #${id} organizationComplianceAiResponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizationComplianceAiResponse`;
  }
}
