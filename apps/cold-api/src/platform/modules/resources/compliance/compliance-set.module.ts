import { Module } from '@nestjs/common';
import { ComplianceSectionsModule } from './compliance_sections/compliance-sections.module';
import { ComplianceSectionGroupsModule } from './compliance-section-groups/compliance-section-groups.module';
import { ComplianceQuestionsModule } from './compliance_questions/compliance-questions.module';
import { ComplianceDefinitionModule } from './compliance-definitions/compliance-definitions.module';
import { ComplianceRepositoryModule } from '@coldpbc/nest';

@Module({
  imports: [ComplianceDefinitionModule, ComplianceQuestionsModule, ComplianceSectionsModule, ComplianceSectionGroupsModule, ComplianceRepositoryModule],
})
export class ComplianceSetModule {}
