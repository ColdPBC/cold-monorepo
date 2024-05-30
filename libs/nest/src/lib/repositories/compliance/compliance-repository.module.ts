import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from '../../prisma';

import { CacheService, ColdCacheModule } from '../../cache';
import { ComplianceSectionsCacheRepository, ComplianceSectionsRepository } from './compliance-sections';
import { ComplianceSectionGroupsRepository } from './compliance-section-groups';
import { ComplianceResponsesRepository } from './compliance-responses';
import { ComplianceQuestionsRepository } from './compliance-questions';
import { ComplianceAiResponsesRepository } from './compliance-ai-responses';
import { ComplianceDefinitionsRepository } from './compliance-definitions';
import { OrganizationComplianceRepository } from './organization-compliance';
import { OrganizationComplianceStatusesRepository } from './organization-compliance-statuses';

@Module({
  imports: [PrismaModule, ColdCacheModule.forRootAsync()],
  providers: [
    ComplianceSectionsRepository,
    ComplianceSectionGroupsRepository,
    ComplianceQuestionsRepository,
    ComplianceAiResponsesRepository,
    ComplianceResponsesRepository,
    ComplianceSectionsCacheRepository,
    CacheService,
    ComplianceDefinitionsRepository,
    OrganizationComplianceRepository,
    OrganizationComplianceStatusesRepository,
  ],
  exports: [
    CacheService,
    ComplianceDefinitionsRepository,
    OrganizationComplianceRepository,
    OrganizationComplianceStatusesRepository,
    ComplianceSectionsRepository,
    ComplianceSectionGroupsRepository,
    ComplianceQuestionsRepository,
    ComplianceAiResponsesRepository,
    ComplianceResponsesRepository,
    ComplianceSectionsCacheRepository,
  ],
})
export class ComplianceRepositoryModule {}
