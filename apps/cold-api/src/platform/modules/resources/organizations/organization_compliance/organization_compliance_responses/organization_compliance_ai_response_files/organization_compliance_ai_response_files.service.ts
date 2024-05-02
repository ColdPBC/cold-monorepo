import { Injectable } from '@nestjs/common';
import { CreateOrganizationComplianceAiResponseFileDto } from './dto/create-organization_compliance_ai_response_file.dto';
import { UpdateOrganizationComplianceAiResponseFileDto } from './dto/update-organization_compliance_ai_response_file.dto';

@Injectable()
export class OrganizationComplianceAiResponseFilesService {
  create(createOrganizationComplianceAiResponseFileDto: CreateOrganizationComplianceAiResponseFileDto) {
    return 'This action adds a new organizationComplianceAiResponseFile';
  }

  findAll() {
    return `This action returns all organizationComplianceAiResponseFiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizationComplianceAiResponseFile`;
  }

  update(id: number, updateOrganizationComplianceAiResponseFileDto: UpdateOrganizationComplianceAiResponseFileDto) {
    return `This action updates a #${id} organizationComplianceAiResponseFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizationComplianceAiResponseFile`;
  }
}
