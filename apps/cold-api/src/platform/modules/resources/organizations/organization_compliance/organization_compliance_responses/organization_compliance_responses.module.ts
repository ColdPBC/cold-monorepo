import { Module } from '@nestjs/common';
import { OrganizationComplianceResponsesService } from './organization_compliance_responses.service';
import { OrganizationComplianceResponsesController } from './organization_compliance_responses.controller';
import { OrganizationComplianceAiResponsesModule } from './organization_compliance_ai_responses/organization_compliance_ai_responses.module';
import { OrganizationComplianceAiResponseFilesModule } from './organization_compliance_ai_response_files/organization_compliance_ai_response_files.module';

@Module({
  controllers: [OrganizationComplianceResponsesController],
  providers: [OrganizationComplianceResponsesService],
  imports: [OrganizationComplianceAiResponsesModule, OrganizationComplianceAiResponseFilesModule],
  exports: [OrganizationComplianceResponsesService],
})
export class OrganizationComplianceResponsesModule {}
