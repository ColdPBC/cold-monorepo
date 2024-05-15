import { Injectable } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { PrismaService } from '../../../prisma';

@Injectable()
export class ComplianceAiResponsesRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(ComplianceAiResponsesRepository.name);
  }

  async deleteAiResponses(organization, compliance, user) {
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
