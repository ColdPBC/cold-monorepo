import { Injectable } from '@nestjs/common';
import { organization_compliance_ai_responses, organizations } from '@prisma/client';
import { BaseWorker, ComplianceAiResponsesRepository, IAuthenticatedUser } from '@coldpbc/nest';

@Injectable()
export class OrganizationComplianceAiResponsesService extends BaseWorker {
  constructor(readonly complianceAiResponsesRepository: ComplianceAiResponsesRepository) {
    super(OrganizationComplianceAiResponsesService.name);
  }
  createAiResponse(org: organizations, complianceName: string, responseData: organization_compliance_ai_responses, user: IAuthenticatedUser) {
    return this.complianceAiResponsesRepository.createAiResponses(org, complianceName, responseData, user);
  }

  findAllAiResponses(org: organizations, complianceName: string, user: IAuthenticatedUser) {
    return this.complianceAiResponsesRepository.getAiResponses(org, complianceName, user);
  }

  findOneAiResponse(org: organizations, complianceName: string, id: string, user: IAuthenticatedUser) {
    return this.complianceAiResponsesRepository.getAiResponse(org, complianceName, id, user);
  }

  updateAiResponse(org: organizations, complianceName: string, id: string, responseData: organization_compliance_ai_responses, user: IAuthenticatedUser) {
    return this.complianceAiResponsesRepository.updateAiResponse(org, complianceName, id, responseData, user);
  }

  removeAllAiResponses(organization: organizations, complianceName: string, user: IAuthenticatedUser) {
    return this.complianceAiResponsesRepository.deleteAiResponses(organization, complianceName, user);
  }

  removeAiResponse(org: organizations, complianceName: string, id: string, user: IAuthenticatedUser) {
    return this.complianceAiResponsesRepository.deleteAiResponse(org, complianceName, id, user);
  }
}
