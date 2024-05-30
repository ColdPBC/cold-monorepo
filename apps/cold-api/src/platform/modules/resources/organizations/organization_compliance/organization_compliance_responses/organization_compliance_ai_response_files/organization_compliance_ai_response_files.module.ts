import { Module } from '@nestjs/common';
import { OrganizationComplianceAiResponseFilesService } from './organization_compliance_ai_response_files.service';
import { OrganizationComplianceAiResponseFilesController } from './organization_compliance_ai_response_files.controller';
import { ComplianceAiResponseFilesRepository } from '@coldpbc/nest';

@Module({
  controllers: [OrganizationComplianceAiResponseFilesController],
  providers: [OrganizationComplianceAiResponseFilesService, ComplianceAiResponseFilesRepository],
  exports: [OrganizationComplianceAiResponseFilesService],
})
export class OrganizationComplianceAiResponseFilesModule {}
