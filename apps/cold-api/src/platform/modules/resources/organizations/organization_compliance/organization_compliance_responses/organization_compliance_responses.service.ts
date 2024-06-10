import { Injectable } from '@nestjs/common';
import { BaseWorker, ComplianceResponsesRepository, IAuthenticatedUser } from '@coldpbc/nest';

@Injectable()
export class OrganizationComplianceResponsesService extends BaseWorker {
  constructor(readonly repository: ComplianceResponsesRepository) {
    super(OrganizationComplianceResponsesService.name);
  }

  upsert(orgId: string, name: string, sgId: string, sId: string, qId: string, complianceResponseData: any, req: any) {
    return this.repository.upsertComplianceResponse(orgId, name, sgId, sId, qId, req.user, complianceResponseData);
  }

  findAllByCompliance(orgId: string, name: string, user: IAuthenticatedUser) {
    return this.repository.getScoredComplianceQuestionByCompliance(orgId, name, user);
  }

  findAllBySectionId(orgId: string, name: string, csgId: string, csId: string, user: IAuthenticatedUser) {
    return this.repository.getScoredComplianceQuestionBySection(orgId, name, csgId, csId, user);
  }

  findAllByGroupId(orgId: string, name: string, csgId: string, user: IAuthenticatedUser) {
    return this.repository.getScoredComplianceQuestionBySectionGroup(orgId, name, csgId, user);
  }

  findAll(orgId: string, name: string, sgId: string, sId: string, qId: string, req) {
    return this.repository.getComplianceResponses(orgId, name, req.user);
  }

  findOne(id: number) {
    return `This action returns a #${id} organizationComplianceResponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizationComplianceResponse`;
  }
}
