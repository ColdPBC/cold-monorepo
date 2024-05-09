import { Module } from '@nestjs/common';
import { OrganizationComplianceBookmarksService } from './organization_compliance_bookmarks.service';
import { OrganizationComplianceBookmarksController } from './organization_compliance_bookmarks.controller';

@Module({
  controllers: [OrganizationComplianceBookmarksController],
  providers: [OrganizationComplianceBookmarksService],
})
export class OrganizationComplianceBookmarksModule {}
