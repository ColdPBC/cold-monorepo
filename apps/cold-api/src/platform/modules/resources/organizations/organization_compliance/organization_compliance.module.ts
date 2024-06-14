import { Module } from '@nestjs/common';
import { OrganizationComplianceService } from './organization_compliance.service';
import { OrganizationComplianceController } from './organization_compliance.controller';
import { OrganizationComplianceResponsesModule } from './organization_compliance_responses/organization_compliance_responses.module';
import { OrganizationComplianceBookmarksModule } from './compliance-question-bookmarks/compliance-question-bookmarks.module';
import { OrganizationComplianceRepository } from '@coldpbc/nest';
import { OrganizationComplianceNotesModule } from './organization_compliance_notes/organization_compliance_notes.module';

@Module({
  imports: [OrganizationComplianceResponsesModule, OrganizationComplianceBookmarksModule, OrganizationComplianceNotesModule],
  controllers: [OrganizationComplianceController],
  providers: [OrganizationComplianceService, OrganizationComplianceRepository],
  exports: [OrganizationComplianceService],
})
export class OrganizationComplianceModule {}
