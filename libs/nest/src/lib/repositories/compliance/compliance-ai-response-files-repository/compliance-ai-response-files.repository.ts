import { Injectable } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { IAuthenticatedUser } from '../../../primitives';
import { PrismaService } from '../../../prisma';

@Injectable()
export class ComplianceAiResponseFilesRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(ComplianceAiResponseFilesRepository.name);
  }

  async createAiResponseFile(orgId: string, complianceName: string, aiResponseId: string, aiResponseFileData: any, user: IAuthenticatedUser) {
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
            organization_id: orgId,
          },
        },
        ...aiResponseFileData,
      },
    });
  }

  async findAllAiResponseFiles(orgId: string, complianceName: string, aiResponseId: string, user: IAuthenticatedUser) {
    const files = await this.prisma.extended.organization_compliance_ai_response_files.findMany({
      where: {
        organization_compliance_ai_response_id: aiResponseId,
        organization_compliance: {
          compliance_definition_name: complianceName,
          organization_id: orgId,
        },
      },
    });

    this.logger.info(`Found ${files.length} files for compliance response ${aiResponseId}`, { orgId, complianceName, aiResponseId, user });

    return files;
  }

  async findOneAiResponseFile(orgId: string, complianceName: string, aiResponseId: string, id: string, user: IAuthenticatedUser) {
    const file = await this.prisma.extended.organization_compliance_ai_response_files.findUnique({
      where: {
        organization_compliance_ai_response_id: aiResponseId,
        organization_compliance: {
          compliance_definition_name: complianceName,
          organization_id: orgId,
        },
        id,
      },
    });

    this.logger.info(`Found file ${id} for compliance response ${aiResponseId}`, { orgId, complianceName, aiResponseId, id, user });

    return file;
  }

  async updateAiResponseFile(orgId: string, complianceName: string, aiResponseId: string, id: string, aiResponseFileData: any, user: IAuthenticatedUser) {
    const file = await this.prisma.extended.organization_compliance_ai_response_files.update({
      where: {
        organization_compliance_ai_response_id: aiResponseId,
        organization_compliance: {
          compliance_definition_name: complianceName,
          organization_id: orgId,
        },
        id,
      },
      data: aiResponseFileData,
    });

    this.logger.info(`Updated file ${id} for compliance response ${aiResponseId}`, { orgId, complianceName, aiResponseId, id, user });

    return file;
  }

  async removeAiResponseFile(orgId: string, complianceName: string, aiResponseId: string, id: string, user: IAuthenticatedUser) {
    const file = await this.prisma.extended.organization_compliance_ai_response_files.delete({
      where: {
        organization_compliance_ai_response_id: aiResponseId,
        organization_compliance: {
          compliance_definition_name: complianceName,
          organization_id: orgId,
        },
        id,
      },
    });

    this.logger.info(`Deleted file ${id} for compliance response ${aiResponseId}`, { orgId, complianceName, aiResponseId, id, user });

    return file;
  }
}
