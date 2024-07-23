import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { IAuthenticatedUser } from '../../../primitives';
import { PrismaService } from '../../../prisma';
import { CacheService } from '../../../cache';
import { organizations } from '@prisma/client';

@Injectable()
export class ComplianceAiResponseFilesRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService, readonly cache: CacheService) {
    super(ComplianceAiResponseFilesRepository.name);
  }

  private getCacheKey(org: organizations, complianceName: string) {
    return `organizations:${org.id}:compliance:${complianceName}:responses:ai_responses:files`;
  }

  async createAiResponseFile(org: organizations, complianceName: string, aiResponseId: string, aiResponseFileData: any, user: IAuthenticatedUser) {
    try {
      await this.cache.delete(this.getCacheKey(org, complianceName), true);

      return this.prisma.organization_compliance_ai_response_files.create({
        data: {
          organization_compliance_ai_response: {
            connect: {
              id: aiResponseId,
            },
          },
          organization_compliance: {
            connect: {
              name: complianceName,
              organization_id: org?.id,
            },
          },
          ...aiResponseFileData,
        },
      });
    } catch (error) {
      this.logger.error(`Error creating file for compliance response ${aiResponseId}`, { org, complianceName, aiResponseId, user, error });

      throw new UnprocessableEntityException({ org, complianceName, aiResponseId, user }, `Error creating file for compliance response ${aiResponseId}`);
    }
  }

  async findAllAiResponseFiles(org: organizations, complianceName: string, aiResponseId: string, user: IAuthenticatedUser) {
    try {
      const files = await this.prisma.organization_compliance_ai_response_files.findMany({
        where: {
          organization_compliance_ai_response_id: aiResponseId,
          organization_compliance: {
            compliance_definition_name: complianceName,
            organization_id: org?.id,
          },
        },
      });

      this.logger.info(`Found ${files.length} files for compliance response ${aiResponseId}`, { org, complianceName, aiResponseId, user });

      this.cache.set(this.getCacheKey(org, complianceName), files);

      return files;
    } catch (error) {
      this.logger.error(`Error creating file for compliance response ${aiResponseId}`, { org, complianceName, aiResponseId, user, error });

      throw new UnprocessableEntityException({ org, complianceName, aiResponseId, user }, `Error creating file for compliance response ${aiResponseId}`);
    }
  }

  async findOneAiResponseFile(org: organizations, complianceName: string, aiResponseId: string, id: string, user: IAuthenticatedUser) {
    try {
      const file = await this.prisma.organization_compliance_ai_response_files.findUnique({
        where: {
          organization_compliance_ai_response_id: aiResponseId,
          organization_compliance: {
            compliance_definition_name: complianceName,
            organization_id: org?.id,
          },
          id,
        },
      });

      this.logger.info(`Found file ${id} for compliance response ${aiResponseId}`, { org, complianceName, aiResponseId, id, user });

      this.cache.set(`${this.getCacheKey(org, complianceName)}:${id}`, file);
      return file;
    } catch (error) {
      this.logger.error(`Error finding file ${id} for compliance response ${aiResponseId}`, { org, complianceName, aiResponseId, id, user, error });

      throw new UnprocessableEntityException({ org, complianceName, aiResponseId, id, user }, `Error finding file ${id} for compliance response ${aiResponseId}`);
    }
  }

  async updateAiResponseFile(org: organizations, complianceName: string, aiResponseId: string, id: string, aiResponseFileData: any, user: IAuthenticatedUser) {
    try {
      await this.cache.delete(this.getCacheKey(org, complianceName), true);

      const file = await this.prisma.organization_compliance_ai_response_files.update({
        where: {
          organization_compliance_ai_response_id: aiResponseId,
          organization_compliance: {
            compliance_definition_name: complianceName,
            organization_id: org?.id,
          },
          id,
        },
        data: aiResponseFileData,
      });

      this.logger.info(`Updated file ${id} for compliance response ${aiResponseId}`, { org, complianceName, aiResponseId, id, user });

      return await this.findOneAiResponseFile(org, complianceName, aiResponseId, id, user);
    } catch (error) {
      this.logger.error(`Error finding file ${id} for compliance response ${aiResponseId}`, { org, complianceName, aiResponseId, id, user, error: { ...error } });

      throw new UnprocessableEntityException({ org, complianceName, aiResponseId, id, user }, `Error finding file ${id} for compliance response ${aiResponseId}`);
    }
  }

  async removeAiResponseFile(org: organizations, complianceName: string, aiResponseId: string, id: string, user: IAuthenticatedUser) {
    try {
      await this.cache.delete(this.getCacheKey(org, complianceName), true);

      const file = await this.prisma.organization_compliance_ai_response_files.delete({
        where: {
          organization_compliance_ai_response_id: aiResponseId,
          organization_compliance: {
            compliance_definition_name: complianceName,
            organization_id: org?.id,
          },
          id,
        },
      });

      this.logger.info(`Deleted file ${id} for compliance response ${aiResponseId}`, { org, complianceName, aiResponseId, id, user });

      return file;
    } catch (error) {
      this.logger.error(`Error finding file ${id} for compliance response ${aiResponseId}`, { org, complianceName, aiResponseId, id, user, ...error });

      throw new UnprocessableEntityException({ org, complianceName, aiResponseId, id, user }, `Error finding file ${id} for compliance response ${aiResponseId}`);
    }
  }
}
