import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseWorker, OrganizationComplianceRepository, OrganizationComplianceStatusesRepository } from '@coldpbc/nest';
import { survey_status_types } from '@prisma/client';

@Injectable()
export class OrganizationComplianceStatusesService extends BaseWorker {
  constructor(readonly repository: OrganizationComplianceStatusesRepository, readonly orgComplianceRepository: OrganizationComplianceRepository) {
    super(OrganizationComplianceStatusesService.name);
  }

  create(org_id: string, name: string, statusType: survey_status_types, req: any) {
    try {
      const orgCompliance = this.orgComplianceRepository.getOrgComplianceDefinitionByName(org_id, name, req.user);

      if (!orgCompliance) {
        throw new NotFoundException({ organization: { id: org_id }, compliance: { name }, statusType, user: req.user }, 'Organization not found');
      }

      return this.repository.createOrganizationComplianceStatus(org_id, name, statusType, req.user);
    } catch (error) {
      this.logger.error(`Error creating organization compliance status`, { error });
      throw error;
    }
  }

  findByOrgComplianceName(orgId: string, name: string, req: any) {
    try {
      return this.repository.getAllByOrgAndComplianceName(orgId, name, req.user);
    } catch (error) {
      this.logger.error(`Error getting all organization compliance statuses`, { error });
      throw error;
    }
  }

  async findOne(orgId: string, name: string, id: string, req: any) {
    try {
      const compliance = await this.orgComplianceRepository.getOrgComplianceDefinitionByName(orgId, name, req.user);

      return this.repository.getOrganizationComplianceStatusById(compliance.id, id, req.user);
    } catch (e) {
      this.logger.error(`Error getting organization compliance status`, { error: e, user: req.user, organization: { id: orgId } });
      throw e;
    }
  }
}
