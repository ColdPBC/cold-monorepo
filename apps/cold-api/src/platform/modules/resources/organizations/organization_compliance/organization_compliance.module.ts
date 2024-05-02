import { Module } from '@nestjs/common';
import { OrganizationComplianceService } from './organization_compliance.service';
import { OrganizationComplianceController } from './organization_compliance.controller';
import { OrganizationComplianceResponsesModule } from './organization_compliance_responses/organization_compliance_responses.module';
import { OrganizationComplianceBookmarksModule } from './organization_compliance_bookmarks/organization_compliance_bookmarks.module';

@Module({
  imports: [OrganizationComplianceResponsesModule, OrganizationComplianceBookmarksModule],
  controllers: [OrganizationComplianceController],
  providers: [OrganizationComplianceService],
})
export class OrganizationComplianceModule {}
