import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { PrismaService } from '../../../prisma';
import { organizations } from '@prisma/client';

@Injectable()
export class ComplianceAiResponsesRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(ComplianceAiResponsesRepository.name);
  }

  private async getOrg(idOrName) {
    let where;

    const byId = idOrName.startsWith('org_');
    if (byId) {
      where = { id: idOrName };
    } else {
      where = { name: idOrName };
    }

    const org = this.prisma.extended.organizations.findUnique({
      where,
    });

    if (!org) {
      throw new NotFoundException({ ...where }, `Organization not found: ${idOrName}`);
    }

    return org;
  }

  async createAiResponses(orgId: string, complianceName: string, responseData: any, user: any) {
    this.logger.info(`Creating ai_responses for ${orgId}: ${complianceName}`, {
      user,
      responseData,
      organization: { id: orgId },
    });

    try {
      const org = await this.getOrg(orgId);

      await this.prisma.extended.organization_compliance_ai_responses.create({
        data: {
          organization_id: org?.id,
          organization_compliance_id: complianceName,
          ...responseData,
        },
      });
    } catch (error) {
      this.logger.error(`Error creating ai_responses for ${orgId}: ${complianceName}`, { orgId, complianceName, user, error });

      throw new UnprocessableEntityException({ orgId, complianceName, user }, `Error creating ai_responses for ${orgId}: ${complianceName}`);
    }
  }

  async updateAiResponse(orgId: string, complianceName: string, id: string, responseData: any, user: any) {
    this.logger.info(`Updating ai_response for ${orgId}: ${complianceName}`, {
      user,
      id,
      responseData,
      organization: { id: orgId },
    });
    try {
      const org = await this.getOrg(orgId);

      if (!org) {
        throw new NotFoundException({ user, organization: orgId }, `Organization not found: ${orgId}`);
      }

      const compliance = await this.prisma.extended.organization_compliance.findUnique({
        where: {
          orgIdCompNameKey: {
            organization_id: orgId,
            compliance_definition_name: complianceName,
          },
        },
      });

      if (!compliance) {
        throw new NotFoundException(
          {
            user,
            compliance: { name: complianceName },
            organization: { id: org?.id },
          },
          `Compliance not found for ${orgId}: ${complianceName}`,
        );
      }

      await this.prisma.extended.organization_compliance_ai_responses.update({
        where: { id, organization_id: org.id, organization_compliance_id: compliance.id },
        data: responseData,
      });
    } catch (error) {
      this.logger.error(`Error updating ai_response for ${orgId}: ${complianceName}`, { orgId, complianceName, user, error });

      throw new UnprocessableEntityException({ orgId, complianceName, user }, `Error updating ai_response for ${orgId}: ${complianceName}`);
    }
  }

  async getAiResponse(orgId: string, complianceName: string, id: string, user: any) {
    this.logger.info(`Fetching ai_response for ${orgId}: ${complianceName}`, {
      user,
      id,
      compliance: { name: complianceName },
      organization: { id: orgId },
    });

    try {
      const org = await this.getOrg(orgId);

      if (!org) {
        throw new NotFoundException({ user, organization: orgId }, `Organization not found: ${orgId}`);
      }

      const compliance = await this.prisma.extended.organization_compliance.findUnique({
        where: {
          orgIdCompNameKey: {
            organization_id: org.id,
            compliance_definition_name: complianceName,
          },
        },
      });

      if (!compliance) {
        throw new NotFoundException(
          {
            user,
            compliance: { name: complianceName },
            organization: { id: org.id },
          },
          `Compliance not found for ${orgId}: ${complianceName}`,
        );
      }

      return this.prisma.extended.organization_compliance_ai_responses.findUnique({
        where: { id, organization_id: org.id, organization_compliance_id: compliance.id },
        include: {
          compliance_questions: true,
          files: {
            include: {
              file: true,
            },
          },
        },
      });
    } catch (error) {
      this.logger.error(`Error fetching ai_response for ${orgId}: ${complianceName}`, { orgId, complianceName, user, error });

      throw new UnprocessableEntityException({ orgId, complianceName, user }, `Error fetching ai_response for ${orgId}: ${complianceName}`);
    }
  }

  async getAiResponses(orgId: string, complianceName: string, user: any) {
    this.logger.info(`Fetching ai_responses for ${orgId}: ${complianceName}`, {
      user,
      compliance: { name: complianceName },
      organization: { id: orgId },
    });
    try {
      const org = await this.getOrg(orgId);

      if (!org) {
        throw new NotFoundException({ user, organization: orgId }, `Organization not found: ${orgId}`);
      }
      const compliance = await this.prisma.extended.organization_compliance.findUnique({
        where: {
          orgIdCompNameKey: {
            organization_id: org.id,
            compliance_definition_name: complianceName,
          },
        },
      });

      if (!compliance) {
        throw new NotFoundException(
          {
            user,
            compliance: { name: complianceName },
            organization: { id: org.id },
          },
          `Compliance not found for ${orgId}: ${complianceName}`,
        );
      }

      const response = this.prisma.extended.organization_compliance_ai_responses.findMany({
        where: { organization_id: org.id, organization_compliance_id: compliance.id },
        include: {
          compliance_questions: true,
          files: true,
        },
      });
      return response;
    } catch (error) {
      this.logger.error(`Error fetching ai_responses for ${orgId}: ${complianceName}`, { orgId, complianceName, user, error });
      if (error instanceof NotFoundException) throw error;

      throw new UnprocessableEntityException({ orgId, complianceName, user }, `Error fetching ai_responses for ${orgId}: ${complianceName}`);
    }
  }
  async deleteAiResponses(organization: organizations, complianceName: string, user: any) {
    this.logger.info(`Clearing previous ai_responses for ${organization.id}: ${complianceName}`, {
      user,
      compliance: { name: complianceName },
      organization: organization,
    });
    try {
      const compliance = await this.prisma.extended.organization_compliance.findUnique({
        where: {
          orgIdCompNameKey: {
            organization_id: organization.id,
            compliance_definition_name: complianceName,
          },
        },
      });

      if (!compliance) {
        throw new NotFoundException(
          {
            user,
            compliance: { name: complianceName },
            organization: organization,
          },
          `Compliance not found for ${organization.id}: ${complianceName}`,
        );
      }

      await this.prisma.extended.organization_compliance_ai_responses.deleteMany({
        where: { organization_id: organization.id, organization_compliance_id: compliance.id },
      });
    } catch (error) {
      this.logger.error(`Error clearing ai_responses for ${organization.id}: ${complianceName}`, { organization, complianceName, user, error });

      throw new UnprocessableEntityException({ organization, complianceName, user }, `Error clearing ai_responses for ${organization.id}: ${complianceName}`);
    }
  }

  async deleteAiResponse(orgId: string, complianceName: string, id: string, user: any) {
    this.logger.info(`Clearing ai_response for ${orgId}: ${complianceName}`, {
      user,
      id,
      compliance: { name: complianceName },
      organization: { id: orgId },
    });
    try {
      const org = await this.getOrg(orgId);

      if (!org) {
        throw new NotFoundException({ user, organization: orgId }, `Organization not found: ${orgId}`);
      }

      const compliance = await this.prisma.extended.organization_compliance.findUnique({
        where: {
          orgIdCompNameKey: {
            organization_id: org.id,
            compliance_definition_name: complianceName,
          },
        },
      });

      if (!compliance) {
        throw new NotFoundException(
          {
            user,
            compliance: { name: complianceName },
            organization: { id: org.id },
          },
          `Compliance not found for ${orgId}: ${complianceName}`,
        );
      }

      await this.prisma.extended.organization_compliance_ai_responses.delete({
        where: {
          id,
          organization_id: org.id,
          organization_compliance_id: compliance.id,
        },
      });
    } catch (error) {
      this.logger.error(`Error clearing ai_response for ${orgId}: ${complianceName}`, { orgId, complianceName, user, error });

      throw new UnprocessableEntityException({ orgId, complianceName, user }, `Error clearing ai_response for ${orgId}: ${complianceName}`);
    }
  }
}
