import { Module } from '@nestjs/common';
import { ComplianceSectionGroupsService } from './compliance-section-groups.service';
import { ComplianceSectionGroupsController } from './compliance-section-groups.controller';
import { ComplianceRepositoryModule } from '@coldpbc/nest';
import { ComplianceQuestionsModule } from './sections/questions/compliance-questions.module';
import { ComplianceSectionsModule } from './sections/compliance-sections.module';

@Module({
  imports: [ComplianceRepositoryModule, ComplianceSectionsModule, ComplianceQuestionsModule],
  controllers: [ComplianceSectionGroupsController],
  providers: [ComplianceSectionGroupsService],
  exports: [ComplianceSectionGroupsService],
})
export class ComplianceSectionGroupsModule {}
