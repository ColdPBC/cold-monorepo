import { Module } from '@nestjs/common';
import { OrganizationComplianceAiResponseFilesService } from './organization_compliance_ai_response_files.service';
import { OrganizationComplianceAiResponseFilesController } from './organization_compliance_ai_response_files.controller';

@Module({
  controllers: [OrganizationComplianceAiResponseFilesController],
  providers: [OrganizationComplianceAiResponseFilesService],
  exports: [OrganizationComplianceAiResponseFilesService],
})
export class OrganizationComplianceAiResponseFilesModule {}
