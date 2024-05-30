import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { Cuid2Generator } from '../../../utility';
import { PrismaService } from '../../../prisma';
import { IAuthenticatedUser } from '../../../primitives';
import { OrganizationComplianceRepository } from '../organization-compliance';
import { survey_status_types } from '@prisma/client';

@Injectable()
export class OrganizationComplianceStatusesRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService, readonly orgComRepository: OrganizationComplianceRepository) {
    super(OrganizationComplianceStatusesRepository.name);
  }

  async getAllByOrgAndComplianceName(orgId: string, complianceName: string, user: IAuthenticatedUser) {
    try {
      const orgComp = await this.orgComRepository.getOrgComplianceDefinitionByName(orgId, complianceName, user);

      if (!orgComp) {
        throw new NotFoundException(`Organization Compliance Definition ${complianceName} not found for organization ${orgId}`);
      }

      return this.prisma.extended.organization_compliance_statuses.findMany({
        where: {
          organization_compliance_id: orgComp.id,
        },
      });
    } catch (error) {
      this.logger.error(`Error getting all organization compliance statuses`, { error, organization: { id: orgId }, compliance: { name: complianceName }, user });
      throw error;
    }
  }

  async getOrganizationComplianceStatusById(orgComplianceId: string, statusId: string, user: IAuthenticatedUser) {
    const compliance = await this.prisma.extended.organization_compliance.findUnique({
      where: {
        id: 'id',
      },
      select: {
        id: true,
        organization_id: true,
        statuses: {
          where: {
            id: statusId,
          },
        },
      },
    });

    if (!compliance) {
      throw new NotFoundException({ user, organization_compliance_id: orgComplianceId, status_id: statusId }, `Organization Compliance Status not found`);
    }

    return compliance;
  }

  async createOrganizationComplianceStatus(org_id: string, name: string, type: string, user: IAuthenticatedUser) {
    return this.prisma.extended.organization_compliance_statuses.create({
      // @ts-expect-error - This is a valid type
      data: {
        id: new Cuid2Generator('ocs').scopedId,
        type,
        email: user.coldclimate_claims.email,
      },
    });
  }

  async updateOrganizationComplianceStatus(statusId: string, type: survey_status_types, organization_compliance_id: string, user: IAuthenticatedUser) {
    const status = this.prisma.extended.organization_compliance_statuses.update({
      where: {
        id: statusId,
      },
      data: {
        type,
        email: user.coldclimate_claims.email,
        organization_compliance_id,
      },
    });

    if (!status) {
      throw new NotFoundException({ user, status_id: statusId }, `Organization Compliance Status not found`);
    }
  }

  async deleteOrganizationComplianceStatus(statusId: string, user: IAuthenticatedUser) {
    this.prisma.extended.organization_compliance_statuses.delete({
      where: {
        id: statusId,
      },
    });

    this.logger.info(`Organization Compliance Status deleted`, { user, status_id: statusId });
  }
}
