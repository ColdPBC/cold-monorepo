import { Injectable } from '@nestjs/common';
import { organization_compliance_ai_responses, organizations } from '@prisma/client';
import { BaseWorker, ComplianceAiResponsesRepository, IAuthenticatedUser } from '@coldpbc/nest';

@Injectable()
export class OrganizationComplianceAiResponsesService extends BaseWorker {
  constructor(readonly complianceAiResponsesRepository: ComplianceAiResponsesRepository) {
    super(OrganizationComplianceAiResponsesService.name);
  }
  createAiResponse(orgId: string, complianceName: string, responseData: organization_compliance_ai_responses, user: IAuthenticatedUser) {
    return this.complianceAiResponsesRepository.createAiResponses(orgId, complianceName, responseData, user);
  }

  findAllAiResponses(orgId: string, complianceName: string, user: IAuthenticatedUser) {
    return this.complianceAiResponsesRepository.getAiResponses(orgId, complianceName, user);
  }

  findOneAiResponse(orgId: string, complianceName: string, id: string, user: IAuthenticatedUser) {
    return this.complianceAiResponsesRepository.getAiResponse(orgId, complianceName, id, user);
  }

  updateAiResponse(orgId: string, complianceName: string, id: string, responseData: organization_compliance_ai_responses, user: IAuthenticatedUser) {
    return this.complianceAiResponsesRepository.updateAiResponse(orgId, complianceName, id, responseData, user);
  }

  removeAllAiResponses(organization: organizations, complianceName: string, user: IAuthenticatedUser) {
    return this.complianceAiResponsesRepository.deleteAiResponses(organization, complianceName, user);
  }

  removeAiResponse(orgId: string, complianceName: string, id: string, user: IAuthenticatedUser) {
    return this.complianceAiResponsesRepository.deleteAiResponse(orgId, complianceName, id, user);
  }
}
