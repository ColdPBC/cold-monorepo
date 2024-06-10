import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { IAuthenticatedUser } from '../../../primitives';
import { PrismaService } from '../../../prisma';

@Injectable()
export class ComplianceAiResponseFilesRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(ComplianceAiResponseFilesRepository.name);
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

  async createAiResponseFile(orgId: string, complianceName: string, aiResponseId: string, aiResponseFileData: any, user: IAuthenticatedUser) {
    try {
      const org = await this.getOrg(orgId);

      return this.prisma.extended.organization_compliance_ai_response_files.create({
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
      this.logger.error(`Error creating file for compliance response ${aiResponseId}`, { orgId, complianceName, aiResponseId, user, error });

      throw new UnprocessableEntityException({ orgId, complianceName, aiResponseId, user }, `Error creating file for compliance response ${aiResponseId}`);
    }
  }

  async findAllAiResponseFiles(orgId: string, complianceName: string, aiResponseId: string, user: IAuthenticatedUser) {
    try {
      const org = await this.getOrg(orgId);

      const files = await this.prisma.extended.organization_compliance_ai_response_files.findMany({
        where: {
          organization_compliance_ai_response_id: aiResponseId,
          organization_compliance: {
            compliance_definition_name: complianceName,
            organization_id: org?.id,
          },
        },
      });

      this.logger.info(`Found ${files.length} files for compliance response ${aiResponseId}`, { orgId, complianceName, aiResponseId, user });

      return files;
    } catch (error) {
      this.logger.error(`Error creating file for compliance response ${aiResponseId}`, { orgId, complianceName, aiResponseId, user, error });

      throw new UnprocessableEntityException({ orgId, complianceName, aiResponseId, user }, `Error creating file for compliance response ${aiResponseId}`);
    }
  }

  async findOneAiResponseFile(orgId: string, complianceName: string, aiResponseId: string, id: string, user: IAuthenticatedUser) {
    try {
      const org = await this.getOrg(orgId);
      const file = await this.prisma.extended.organization_compliance_ai_response_files.findUnique({
        where: {
          organization_compliance_ai_response_id: aiResponseId,
          organization_compliance: {
            compliance_definition_name: complianceName,
            organization_id: org?.id,
          },
          id,
        },
      });

      this.logger.info(`Found file ${id} for compliance response ${aiResponseId}`, { orgId, complianceName, aiResponseId, id, user });

      return file;
    } catch (error) {
      this.logger.error(`Error finding file ${id} for compliance response ${aiResponseId}`, { orgId, complianceName, aiResponseId, id, user, error });

      throw new UnprocessableEntityException({ orgId, complianceName, aiResponseId, id, user }, `Error finding file ${id} for compliance response ${aiResponseId}`);
    }
  }

  async updateAiResponseFile(orgId: string, complianceName: string, aiResponseId: string, id: string, aiResponseFileData: any, user: IAuthenticatedUser) {
    try {
      const org = await this.getOrg(orgId);

      const file = await this.prisma.extended.organization_compliance_ai_response_files.update({
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

      this.logger.info(`Updated file ${id} for compliance response ${aiResponseId}`, { orgId, complianceName, aiResponseId, id, user });

      return file;
    } catch (error) {
      this.logger.error(`Error finding file ${id} for compliance response ${aiResponseId}`, { orgId, complianceName, aiResponseId, id, user, error });

      throw new UnprocessableEntityException({ orgId, complianceName, aiResponseId, id, user }, `Error finding file ${id} for compliance response ${aiResponseId}`);
    }
  }

  async removeAiResponseFile(orgId: string, complianceName: string, aiResponseId: string, id: string, user: IAuthenticatedUser) {
    try {
      const org = await this.getOrg(orgId);

      const file = await this.prisma.extended.organization_compliance_ai_response_files.delete({
        where: {
          organization_compliance_ai_response_id: aiResponseId,
          organization_compliance: {
            compliance_definition_name: complianceName,
            organization_id: org?.id,
          },
          id,
        },
      });

      this.logger.info(`Deleted file ${id} for compliance response ${aiResponseId}`, { orgId, complianceName, aiResponseId, id, user });

      return file;
    } catch (error) {
      this.logger.error(`Error finding file ${id} for compliance response ${aiResponseId}`, { orgId, complianceName, aiResponseId, id, user, error });

      throw new UnprocessableEntityException({ orgId, complianceName, aiResponseId, id, user }, `Error finding file ${id} for compliance response ${aiResponseId}`);
    }
  }
}
