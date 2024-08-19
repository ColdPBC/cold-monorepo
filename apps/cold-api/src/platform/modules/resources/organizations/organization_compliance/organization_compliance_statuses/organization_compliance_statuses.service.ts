import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseWorker, IRequest, OrganizationComplianceRepository, OrganizationComplianceStatusesRepository } from '@coldpbc/nest';
import { survey_status_types } from '@prisma/client';

@Injectable()
export class OrganizationComplianceStatusesService extends BaseWorker {
  constructor(readonly repository: OrganizationComplianceStatusesRepository, readonly orgComplianceRepository: OrganizationComplianceRepository) {
    super(OrganizationComplianceStatusesService.name);
  }

  create(org_id: string, name: string, statusType: survey_status_types, req: IRequest) {
    try {
      const orgCompliance = this.orgComplianceRepository.getOrgComplianceDefinitionByName(name, req.user, req.organization);

      if (!orgCompliance) {
        throw new NotFoundException({ organization: { id: org_id }, compliance: { name }, statusType, user: req.user }, 'Organization not found');
      }

      return this.repository.createOrganizationComplianceStatus(name, statusType, req.user, req.organization);
    } catch (error) {
      this.logger.error(`Error creating organization compliance status`, { error });
      throw error;
    }
  }

  findByOrgComplianceName(name: string, req: IRequest) {
    try {
      return this.repository.getAllByOrgAndComplianceName(name, req.user, req.organization);
    } catch (error) {
      this.logger.error(`Error getting all organization compliance statuses`, { error });
      throw error;
    }
  }

  async findOne(name: string, id: string, req: IRequest) {
    try {
      const compliance = await this.orgComplianceRepository.getOrgComplianceDefinitionByName(name, req.user, req.organization);

      return this.repository.getOrganizationComplianceStatusById(compliance.id, id, req.user, req.organization);
    } catch (e) {
      this.logger.error(`Error getting organization compliance status`, { error: e, user: req.user, organization: req.organization });
      throw e;
    }
  }
}
