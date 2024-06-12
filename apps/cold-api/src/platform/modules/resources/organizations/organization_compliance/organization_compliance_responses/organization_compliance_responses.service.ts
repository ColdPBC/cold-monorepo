import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker, ComplianceResponseOptions, ComplianceResponsesRepository } from '@coldpbc/nest';

@Injectable()
export class OrganizationComplianceResponsesService extends BaseWorker {
  constructor(readonly repository: ComplianceResponsesRepository) {
    super(OrganizationComplianceResponsesService.name);
  }

  upsert(name: string, sgId: string, sId: string, qId: string, complianceResponseData: any, req: any) {
    return this.repository.upsertComplianceResponse(req.organization, name, sgId, sId, qId, req.user, complianceResponseData);
  }

  async findAllByCompliance(name: string, req: any, options?: ComplianceResponseOptions) {
    try {
      const response = await this.repository.getScoredComplianceQuestionsByName(req.organization, name, req.user, options);
      return response;
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundException) throw error;
      throw new UnprocessableEntityException({ organization: req.org, user: req.user, description: error.message, cause: error });
    }
  }

  findAllBySectionId(name: string, csgId: string, csId: string, req: any, options?: ComplianceResponseOptions) {
    return this.repository.getScoredComplianceQuestionBySection(req.organization, name, csgId, csId, req.user, options);
  }

  findAllByGroupId(name: string, csgId: string, req: any, options?: ComplianceResponseOptions) {
    return this.repository.getScoredComplianceQuestionBySectionGroup(req.organization, name, csgId, req.user, options);
  }

  findAll(orgId: string, name: string, sgId: string, sId: string, qId: string, req, options?: ComplianceResponseOptions) {
    return this.repository.getComplianceResponses(req.organization, name, req.user, options);
  }

  findOne(name: string, id: number, req: any, options?: ComplianceResponseOptions) {
    return this.repository.getComplianceResponseById(req.organizations, name, req.user, id, options);
  }

  remove(id: number) {
    return `This action removes a #${id} organizationComplianceResponse`;
  }
}
