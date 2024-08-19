import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { PrismaService } from '../../../prisma';
import { organizations } from '@prisma/client';
import { CacheService } from '../../../cache';

@Injectable()
export class ComplianceAiResponsesRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService, readonly cache: CacheService) {
    super(ComplianceAiResponsesRepository.name);
  }

  private getCacheKey(org: organizations, complianceName: string) {
    return `organizations:${org.id}:compliance:${complianceName}:responses:ai_responses`;
  }

  async createAiResponses(org: organizations, complianceName: string, responseData: any, user: any) {
    const start = new Date();
    await this.cache.delete(this.getCacheKey(org, complianceName), true);

    this.logger.info(`Creating ai_responses for ${org.name}: ${complianceName}`, {
      user,
      responseData,
      organization: org,
    });

    try {
      const response = await this.prisma.organization_compliance_ai_responses.create({
        data: {
          organization_id: org?.id,
          organization_compliance_id: complianceName,
          ...responseData,
        },
      });

      if (!org.isTest) {
        const question = await this.prisma.compliance_questions.findUnique({
          where: {
            id: responseData.compliance_question_id,
          },
        });

        this.sendMetrics('organization.compliance.notes', 'cold-nest', 'update', 'completed', {
          sendEvent: false,
          start,
          tags: {
            key: question ? question.key : '',
            question_id: responseData.compliance_question_id,
            compliance: complianceName,
            organization_id: org.id,
            organization_name: org.name,
            email: user.coldclimate_claims.email,
            data: response,
          },
        });
      }
    } catch (error) {
      this.logger.error(`Error creating ai_responses for ${org.name}: ${complianceName}`, { organization: org, complianceName, user, error });

      throw new UnprocessableEntityException({ org, complianceName, user }, `Error creating ai_responses for ${org.name}: ${complianceName}`);
    }
  }

  async updateAiResponse(org: organizations, complianceName: string, id: string, responseData: any, user: any) {
    await this.cache.delete(this.getCacheKey(org, complianceName), true);

    this.logger.info(`Updating ai_response for ${org.name}: ${complianceName}`, {
      user,
      id,
      responseData,
      organization: org,
    });
    try {
      const compliance = await this.prisma.organization_compliance.findUnique({
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
            organization: { id: org?.id },
          },
          `Compliance not found for ${org.name}: ${complianceName}`,
        );
      }

      await this.prisma.organization_compliance_ai_responses.update({
        where: { id, organization_id: org.id, organization_compliance_id: compliance.id },
        data: responseData,
      });

      return this.getAiResponse(org, complianceName, id, user);
    } catch (error) {
      this.logger.error(`Error updating ai_response for ${org.name}: ${complianceName}`, { organization: org, complianceName, user, error });

      throw new UnprocessableEntityException({ organization: org, complianceName, user }, `Error updating ai_response for ${org.name}: ${complianceName}`);
    }
  }

  async getAiResponse(org: organizations, complianceName: string, id: string, user: any) {
    this.logger.info(`Fetching ai_response for ${org.name}: ${complianceName}`, {
      user,
      id,
      compliance: { name: complianceName },
      organization: org,
    });

    try {
      const compliance = await this.prisma.organization_compliance.findUnique({
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
          `Compliance not found for ${org.name}: ${complianceName}`,
        );
      }

      const aiResponse = await this.prisma.organization_compliance_ai_responses.findUnique({
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

      this.cache.set(`${this.getCacheKey(org, complianceName)}:${id}`, aiResponse);

      return aiResponse;
    } catch (error) {
      this.logger.error(`Error fetching ai_response for ${org.name}: ${complianceName}`, { organizations: org, complianceName, user, error });

      throw new UnprocessableEntityException({ organizations: org, complianceName, user }, `Error fetching ai_response for ${org.name}: ${complianceName}`);
    }
  }

  async getAiResponses(org: organizations, complianceName: string, user: any) {
    this.logger.info(`Fetching ai_responses for ${org.name}: ${complianceName}`, {
      user,
      compliance: { name: complianceName },
      organization: org,
    });
    try {
      const compliance = await this.prisma.organization_compliance.findUnique({
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
            organization: org,
          },
          `Compliance not found for ${org.name}: ${complianceName}`,
        );
      }

      const responses = this.prisma.organization_compliance_ai_responses.findMany({
        where: { organization_id: org.id, organization_compliance_id: compliance.id },
        include: {
          compliance_questions: true,
          files: true,
        },
      });

      this.cache.set(this.getCacheKey(org, complianceName), responses);

      return responses;
    } catch (error) {
      this.logger.error(`Error fetching ai_responses for ${org.name}: ${complianceName}`, { organizations: org, complianceName, user, error });
      if (error instanceof NotFoundException) throw error;

      throw new UnprocessableEntityException({ organizations: org, complianceName, user }, `Error fetching ai_responses for ${org.name}: ${complianceName}`);
    }
  }

  async deleteAiResponses(org: organizations, complianceName: string, user: any) {
    await this.cache.delete(this.getCacheKey(org, complianceName), true);

    this.logger.info(`Clearing previous ai_responses for ${org.name}: ${complianceName}`, {
      user,
      compliance: { name: complianceName },
      organization: org,
    });
    try {
      const compliance = await this.prisma.organization_compliance.findUnique({
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
            organization: org,
          },
          `Compliance not found for ${org.name}: ${complianceName}`,
        );
      }

      await this.prisma.organization_compliance_ai_responses.deleteMany({
        where: { organization_id: org.id, organization_compliance_id: compliance.id },
      });
    } catch (error) {
      this.logger.error(`Error clearing ai_responses for ${org.id}: ${complianceName}`, { organizations: org, complianceName, user, error });

      throw new UnprocessableEntityException({ organizations: org, complianceName, user }, `Error clearing ai_responses for ${org.name}: ${complianceName}`);
    }
  }

  async deleteAiResponse(org: organizations, complianceName: string, id: string, user: any) {
    await this.cache.delete(`${this.getCacheKey(org, complianceName)}:${id}`, true);

    this.logger.info(`Clearing ai_response for ${org.name}: ${complianceName}`, {
      user,
      id,
      compliance: { name: complianceName },
      organization: org,
    });
    try {
      const compliance = await this.prisma.organization_compliance.findUnique({
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
          `Compliance not found for ${org.name}: ${complianceName}`,
        );
      }

      await this.prisma.organization_compliance_ai_responses.delete({
        where: {
          id,
          organization_id: org.id,
          organization_compliance_id: compliance.id,
        },
      });
    } catch (error) {
      this.logger.error(`Error clearing ai_response for ${org.name}: ${complianceName}`, { organizations: org, complianceName, user, error });

      throw new UnprocessableEntityException({ organizations: org, complianceName, user }, `Error clearing ai_response for ${org.name}: ${complianceName}`);
    }
  }
}
