import { Module } from '@nestjs/common';
import { OrganizationComplianceAiResponsesService } from './organization_compliance_ai_responses.service';
import { OrganizationComplianceAiResponsesController } from './organization_compliance_ai_responses.controller';
import { ComplianceRepositoryModule } from '@coldpbc/nest';

@Module({
  imports: [ComplianceRepositoryModule],
  controllers: [OrganizationComplianceAiResponsesController],
  providers: [OrganizationComplianceAiResponsesService],
  exports: [OrganizationComplianceAiResponsesService],
})
export class OrganizationComplianceAiResponsesModule {}
