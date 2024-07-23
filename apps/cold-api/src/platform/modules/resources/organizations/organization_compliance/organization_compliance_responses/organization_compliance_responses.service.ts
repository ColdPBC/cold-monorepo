import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker, ComplianceResponseOptions, ComplianceResponsesRepository } from '@coldpbc/nest';

@Injectable()
export class OrganizationComplianceResponsesService extends BaseWorker {
  constructor(readonly repository: ComplianceResponsesRepository) {
    super(OrganizationComplianceResponsesService.name);
  }

  upsert(name: string, sgId: string, sId: string, qId: string, complianceResponseData: any, req: any) {
    return this.repository.updateComplianceResponse(req.organization, name, sgId, sId, qId, req.user, complianceResponseData);
  }

  async findAllByCompliance(name: string, req: any, options?: ComplianceResponseOptions) {
    try {
      if (options) {
        options.take = options.take || 400;
        options.skip = options.skip || 0;
      }
      const response = await this.repository.getScoredComplianceQuestionsByName(req.organization, name, req.user, options);
      return response;
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundException) throw error;
      throw new UnprocessableEntityException({ organization: req.org, user: req.user, description: error.message, cause: error });
    }
  }

  getQuestionsBySectionId(name: string, sgId: string, sId: string, req: any, options?: ComplianceResponseOptions) {
    if (options) {
      options.take = options.take || 100;
      options.skip = options.skip || 0;
    }
    return this.repository.getScoredComplianceQuestionBySection(req.organization, name, sgId, sId, req.user, options);
  }

  getQuestionResponseById(name: string, sgId: string, sId: string, qId: string, req: any, options?: ComplianceResponseOptions) {
    if (options) {
      options.take = options.take || 100;
      options.skip = options.skip || 0;
    }

    return this.repository.getScoredComplianceQuestionById(req.organization, name, sgId, sId, qId, req.user, options);
  }

  findAllByGroupId(name: string, csgId: string, req: any, options?: ComplianceResponseOptions) {
    this.formatOptions(options, { responses: true, references: true, bookmarks: true });
    return this.repository.getScoredComplianceQuestionBySectionGroup(req.organization, name, csgId, req.user, options);
  }

  private formatOptions(options: undefined | ComplianceResponseOptions, defaults: ComplianceResponseOptions) {
    if (options) {
      if (options.take) {
        options.take = options.take < 0 ? 100 : options.take;
      }
      if (options.skip) {
        options.skip = options.skip < 0 ? 0 : options.skip;
      }
    }

    if (defaults) {
      options = { ...options, ...defaults };
    }

    return options;
  }

  findAll(orgId: string, name: string, sgId: string, sId: string, qId: string, req, options?: ComplianceResponseOptions) {
    options = this.formatOptions(options, { take: 100, skip: 0 });
    return this.repository.getComplianceResponses(req.organization, name, req.user, options);
  }

  findOne(name: string, id: number, req: any, options?: ComplianceResponseOptions) {
    if (options) {
      options.take = options.take || 100;
      options.skip = options.skip || 0;
    }
    return this.repository.getComplianceResponseById(req.organizations, name, req.user, +id, options);
  }

  deleteReponseByType(name: string, sgId: string, sId: string, qId: string, req: any, type) {
    return this.repository.deleteComplianceResponse(req.organization, name, sgId, sId, qId, req.user, type);
  }
  remove(id: number) {
    return `This action removes a #${id} organizationComplianceResponse`;
  }
}
