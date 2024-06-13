import { Global, Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../../prisma';

import { CacheService, ColdCacheModule } from '../../cache';
import { ComplianceSectionsCacheRepository, ComplianceSectionsRepository } from './compliance-sections';
import { ComplianceSectionGroupsRepository } from './compliance-section-groups';
import { ComplianceResponsesRepository } from './compliance-responses';
import { ComplianceQuestionsRepository } from './compliance-questions';
import { ComplianceAiResponsesRepository } from './compliance-ai-responses';
import { ComplianceDefinitionsRepository } from './compliance-definitions';
import { OrganizationComplianceRepository } from './organization-compliance';
import { OrganizationComplianceStatusesRepository } from './organization-compliance-statuses';
import { ScoringModule } from '../scoring';
import { FilteringModule } from '../filtering';
import { ComplianceQuestionBookmarksRepository } from './compliance-question-bookmarks/compliance-question-bookmarks.repository';
import { ComplianceNotesRepository } from './compliance-notes/compliance-notes.repository';
import { ComplianceNoteLinksRepository } from './compliance-note-links/compliance-note-links.repository';
import { ComplianceNoteFilesRepository } from './compliance-note-files/compliance-note-files.repository';

@Global()
@Module({
  imports: [PrismaModule, ColdCacheModule.forRootAsync(), forwardRef(() => ScoringModule), forwardRef(() => FilteringModule)],
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
    ComplianceQuestionBookmarksRepository,
    ComplianceNotesRepository,
    ComplianceNoteLinksRepository,
    ComplianceNoteFilesRepository,
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
    ComplianceQuestionBookmarksRepository,
  ],
})
export class ComplianceRepositoryModule {}
