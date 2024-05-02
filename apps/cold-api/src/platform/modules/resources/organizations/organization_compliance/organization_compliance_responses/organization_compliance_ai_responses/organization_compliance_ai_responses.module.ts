import { Module } from '@nestjs/common';
import { OrganizationComplianceAiResponsesService } from './organization_compliance_ai_responses.service';
import { OrganizationComplianceAiResponsesController } from './organization_compliance_ai_responses.controller';

@Module({
  controllers: [OrganizationComplianceAiResponsesController],
  providers: [OrganizationComplianceAiResponsesService],
})
export class OrganizationComplianceAiResponsesModule {}
