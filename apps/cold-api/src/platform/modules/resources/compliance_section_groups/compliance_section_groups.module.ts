import { Module } from '@nestjs/common';
import { ComplianceSectionGroupsService } from './compliance_section_groups.service';
import { ComplianceSectionGroupsController } from './compliance_section_groups.controller';

@Module({
  controllers: [ComplianceSectionGroupsController],
  providers: [ComplianceSectionGroupsService],
})
export class ComplianceSectionGroupsModule {}
