import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { Cuid2Generator, GuidPrefixes } from '../../../utility';
import { PrismaService } from '../../../prisma';
import { IAuthenticatedUser } from '../../../primitives';
import { OrganizationComplianceRepository } from '../organization-compliance';
import { organizations } from '@prisma/client';
import { CacheService } from '../../../cache';

@Injectable()
export class OrganizationComplianceStatusesRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService, readonly orgComRepository: OrganizationComplianceRepository, readonly cache: CacheService) {
    super(OrganizationComplianceStatusesRepository.name);
  }

  async getAllByOrgAndComplianceName(complianceName: string, user: IAuthenticatedUser, organization: organizations) {
    try {
      const orgComp = await this.orgComRepository.getOrgComplianceDefinitionByName(complianceName, user, organization);

      if (!orgComp) {
        throw new NotFoundException(
          {
            complianceName,
            user,
            organization,
          },
          `Organization Compliance Definition ${complianceName} not found for organization ${organization.id}`,
        );
      }

      return this.prisma.organization_compliance_statuses.findMany({
        where: {
          organization_compliance_id: orgComp.id,
        },
      });
    } catch (error) {
      this.logger.error(`Error getting all organization compliance statuses`, { error, organization, compliance: { name: complianceName }, user });
      throw error;
    }
  }

  async getOrganizationComplianceStatusById(orgComplianceId: string, statusId: string, user: IAuthenticatedUser, organization: organizations) {
    const compliance = await this.prisma.organization_compliance.findUnique({
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
      throw new NotFoundException({ user, organization_compliance_id: orgComplianceId, organization, status_id: statusId }, `Organization Compliance Status not found`);
    }

    return compliance;
  }

  async createOrganizationComplianceStatus(name: string, type: string, user: IAuthenticatedUser, organization: organizations) {
    const start = new Date();

    await this.cache.delete(`organizations:${organization.id}:compliance:${name}:status`, true);

    this.logger.info(`Creating Compliance Status`, { user, compliance_name: name, organization });
    const compliance_status = this.prisma.organization_compliance_statuses.create({
      // @ts-expect-error - This is a valid type
      data: {
        id: new Cuid2Generator(GuidPrefixes.OrganizationComplianceStatus).scopedId,
        type,
        email: user.coldclimate_claims.email,
      },
    });
    this.sendMetrics('organization.compliance.statuses', 'cold-nest', 'create', 'completed', {
      sendEvent: true,
      start,
      tags: { compliance_set: name, organization, user, compliance_status: compliance_status },
    });

    return compliance_status;
  }
}
