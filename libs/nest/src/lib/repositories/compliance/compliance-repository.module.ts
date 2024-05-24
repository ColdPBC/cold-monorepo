import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma';

import { CacheService, ColdCacheModule } from '../../cache';
import { ComplianceSectionsCacheRepository, ComplianceSectionsRepository } from './compliance-sections';
import { ComplianceSectionGroupsRepository } from './compliance-section-groups';
import { ComplianceResponsesRepository } from './compliance-responses';
import { ComplianceQuestionsRepository } from './compliance-questions';
import { ComplianceAiResponsesRepository } from './compliance-ai-responses';
import { ComplianceNoteLinksRepository } from './compliance-note-links';
import { ComplianceNoteFilesRepository } from './compliance-note-files';
import { ComplianceNotesRepository } from './compliance-notes';
import { ComplianceQuestionBookmarksRepository } from './compliance-question-bookmarks';
import { ComplianceDefinitionsRepository } from './compliance-definitions/compliance-definitions.repository';
import { OrganizationComplianceRepository } from './organization-compliance/organization-compliance.repository';
import { OrganizationComplianceStatusesRepository } from './organization-compliance-statuses/organization-compliance-statuses.repository';

@Module({
  imports: [ColdCacheModule.forRootAsync()],
  providers: [
    PrismaService,
    ComplianceSectionsRepository,
    ComplianceSectionGroupsRepository,
    ComplianceQuestionsRepository,
    ComplianceAiResponsesRepository,
    ComplianceResponsesRepository,
    ComplianceSectionsCacheRepository,
    CacheService,
    ComplianceNoteLinksRepository,
    ComplianceNoteFilesRepository,
    ComplianceNotesRepository,
    ComplianceQuestionBookmarksRepository,
    ComplianceDefinitionsRepository,
    OrganizationComplianceRepository,
    OrganizationComplianceStatusesRepository,
  ],
  exports: [
    PrismaService,
    ComplianceSectionsRepository,
    ComplianceSectionGroupsRepository,
    ComplianceQuestionsRepository,
    ComplianceAiResponsesRepository,
    ComplianceResponsesRepository,
    ComplianceSectionsCacheRepository,
  ],
})
export class ComplianceRepositoryModule {}
