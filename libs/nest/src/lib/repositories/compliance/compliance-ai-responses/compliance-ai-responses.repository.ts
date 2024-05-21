import { Injectable } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { PrismaService } from '../../../prisma';

@Injectable()
export class ComplianceAiResponsesRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(ComplianceAiResponsesRepository.name);
  }

  async createAiResponses(organization: { name: any; id: any; display_name: any }, compliance: { compliance_definition_name: any; id: any }, aiResponses: any, user: any) {
    this.logger.info(`Creating ai_responses for ${organization.name}: ${compliance.compliance_definition_name}`, {
      user,
      ...compliance,
      organization: { id: organization.id, name: organization.name, display_name: organization.display_name },
    });

    await this.prisma.organization_compliance_ai_responses.createMany({
      data: aiResponses.map((aiResponse: any) => ({
        organization_id: organization.id,
        organization_compliance_id: compliance.id,
        ...aiResponse,
      })),
    });
  }
  async deleteAiResponses(organization: { name: any; id: any; display_name: any }, compliance: { compliance_definition_name: any; id: any }, user: any) {
    this.logger.info(`Clearing previous ai_responses for ${organization.name}: ${compliance.compliance_definition_name}`, {
      user,
      ...compliance,
      organization: { id: organization.id, name: organization.name, display_name: organization.display_name },
    });

    await this.prisma.organization_compliance_ai_responses.deleteMany({
      where: { organization_id: organization.id, organization_compliance_id: compliance.id },
    });
  }
}
