import { Module } from '@nestjs/common';
import { ComplianceSectionsService } from './compliance_sections.service';
import { ComplianceSectionsController } from './compliance_sections.controller';

@Module({
  controllers: [ComplianceSectionsController],
  providers: [ComplianceSectionsService],
  exports: [ComplianceSectionsService],
})
export class ComplianceSectionsModule {}
