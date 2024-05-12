import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { ComplianceSectionsRepository } from './repository/compliance-sections/compliance-sections.repository';
import { ComplianceSectionGroupsRepository } from './repository/compliance-section-groups/compliance-section-groups.repository';
import { ComplianceQuestionsRepository } from './repository/compliance-questions/compliance-questions.repository';

@Module({
  providers: [PrismaService, ComplianceSectionsRepository, ComplianceSectionGroupsRepository, ComplianceQuestionsRepository],
  exports: [PrismaService, ComplianceSectionsRepository, ComplianceSectionGroupsRepository, ComplianceQuestionsRepository],
})
export class ComplianceModule {}
