import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { PrismaService } from '../../../prisma';

@Injectable()
export class ComplianceAiResponsesRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(ComplianceAiResponsesRepository.name);
  }

  async createAiResponses(orgId: string, complianceName: string, responseData: any, user: any) {
    this.logger.info(`Creating ai_responses for ${orgId}: ${complianceName}`, {
      user,
      responseData,
      organization: { id: orgId },
    });

    await this.prisma.extended.organization_compliance_ai_responses.create({
      data: {
        organization_id: orgId,
        organization_compliance_id: complianceName,
        ...responseData,
      },
    });
  }

  async updateAiResponse(orgId: string, complianceName: string, id: string, responseData: any, user: any) {
    this.logger.info(`Updating ai_response for ${orgId}: ${complianceName}`, {
      user,
      id,
      responseData,
      organization: { id: orgId },
    });

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
          organization: { id: orgId },
        },
        `Compliance not found for ${orgId}: ${complianceName}`,
      );
    }

    await this.prisma.extended.organization_compliance_ai_responses.update({
      where: { id, organization_id: orgId, organization_compliance_id: compliance.id },
      data: responseData,
    });
  }
  async getAiResponse(orgId: string, complianceName: string, id: string, user: any) {
    this.logger.info(`Fetching ai_response for ${orgId}: ${complianceName}`, {
      user,
      id,
      compliance: { name: complianceName },
      organization: { id: orgId },
    });

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
          organization: { id: orgId },
        },
        `Compliance not found for ${orgId}: ${complianceName}`,
      );
    }

    return this.prisma.extended.organization_compliance_ai_responses.findUnique({
      where: { id, organization_id: orgId, organization_compliance_id: compliance.id },
    });
  }
  async getAiResponses(orgId: string, complianceName: string, user: any) {
    this.logger.info(`Fetching ai_responses for ${orgId}: ${complianceName}`, {
      user,
      compliance: { name: complianceName },
      organization: { id: orgId },
    });

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
          organization: { id: orgId },
        },
        `Compliance not found for ${orgId}: ${complianceName}`,
      );
    }

    return this.prisma.extended.organization_compliance_ai_responses.findMany({
      where: { organization_id: orgId, organization_compliance_id: compliance.id },
    });
  }
  async deleteAiResponses(orgId: string, complianceName: string, user: any) {
    this.logger.info(`Clearing previous ai_responses for ${orgId}: ${complianceName}`, {
      user,
      compliance: { name: complianceName },
      organization: { id: orgId },
    });

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
          organization: { id: orgId },
        },
        `Compliance not found for ${orgId}: ${complianceName}`,
      );
    }

    await this.prisma.extended.organization_compliance_ai_responses.deleteMany({
      where: { organization_id: orgId, organization_compliance_id: compliance.id },
    });
  }

  async deleteAiResponse(orgId: string, complianceName: string, id: string, user: any) {
    this.logger.info(`Clearing ai_response for ${orgId}: ${complianceName}`, {
      user,
      id,
      compliance: { name: complianceName },
      organization: { id: orgId },
    });

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
          organization: { id: orgId },
        },
        `Compliance not found for ${orgId}: ${complianceName}`,
      );
    }

    await this.prisma.extended.organization_compliance_ai_responses.delete({
      where: {
        id,
        organization_id: orgId,
        organization_compliance_id: compliance.id,
      },
    });
  }
}
