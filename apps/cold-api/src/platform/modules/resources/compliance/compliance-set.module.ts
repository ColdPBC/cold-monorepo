import { Module } from '@nestjs/common';
import { ComplianceSectionsModule } from './compliance-definitions/section-groups/sections/compliance-sections.module';
import { ComplianceSectionGroupsModule } from './compliance-definitions/section-groups/compliance-section-groups.module';
import { ComplianceQuestionsModule } from './compliance-definitions/section-groups/sections/questions/compliance-questions.module';
import { ComplianceDefinitionModule } from './compliance-definitions/compliance-definitions.module';
import { ComplianceRepositoryModule } from '@coldpbc/nest';

@Module({
  imports: [ComplianceDefinitionModule, ComplianceQuestionsModule, ComplianceSectionsModule, ComplianceSectionGroupsModule, ComplianceRepositoryModule],
})
export class ComplianceSetModule {}
