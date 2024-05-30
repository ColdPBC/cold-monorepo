import { Injectable } from '@nestjs/common';
import { BaseWorker, OrganizationComplianceRepository } from '@coldpbc/nest';
import { organization_compliance } from '@prisma/client';

@Injectable()
export class OrganizationComplianceService extends BaseWorker {
  constructor(readonly repository: OrganizationComplianceRepository) {
    super(OrganizationComplianceService.name);
  }
  create(orgId: string, name: string, organizationCompliance: organization_compliance, req: any) {
    try {
      organizationCompliance.organization_id = orgId;
      organizationCompliance.compliance_definition_name = name;

      return this.repository.createOrgCompliance(name, orgId, organizationCompliance, req.user);
    } catch (error) {
      this.logger.error(`Error creating organization compliance`, { organizationCompliance, error });
      throw error;
    }
  }

  findAll(orgId: string, req: any) {
    try {
      return this.repository.getOrgComplianceDefinitions(orgId, req.user);
    } catch (error) {
      this.logger.error(`Error getting compliance definitions`, { organization: { id: orgId }, error });
      throw error;
    }
  }

  findOne(orgId: string, id: string, req: any) {
    try {
      return this.repository.getOrgComplianceDefinitionById(orgId, id, req.user);
    } catch (error) {
      this.logger.error(`Error getting compliance definition`, { id, error });
      throw error;
    }
  }

  findOneByName(orgId: string, name: string, req: any) {
    try {
      return this.repository.getOrgComplianceDefinitionByName(orgId, name, req.user);
    } catch (error) {
      this.logger.error(`Error getting compliance definition`, { organization: { id: orgId }, compliance: { name }, error });
      throw error;
    }
  }

  update(orgId: string, name: string, orgComplianceData: organization_compliance, req: any) {
    try {
      orgComplianceData.compliance_definition_name = name;
      orgComplianceData.organization_id = orgId;

      return this.repository.updateOrgComplianceDefinition(name, orgId, orgComplianceData, req.user);
    } catch (error) {
      this.logger.error(`Error updating organization compliance definition`, { organization: { id: orgId }, compliance: { name }, error });
      throw error;
    }
  }

  remove(orgId: string, name: string, req: any) {
    try {
      return this.repository.deleteOrgComplianceDefinition(orgId, name, req.user);
    } catch (error) {
      this.logger.error(`Error deleting organization compliance definition`, { organization: { id: orgId }, compliance: { name }, error });
      throw error;
    }
  }
}
