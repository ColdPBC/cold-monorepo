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
import { ComplianceQuestionBookmarksRepository } from './compliance-question-bookmarks';
import { ComplianceNotesRepository } from './compliance-notes';
import { ComplianceNoteLinksRepository } from './compliance-note-links';
import { ComplianceNoteFilesRepository } from './compliance-note-files';
import { OrganizationsRepository } from '../../organizations';
import { ProductsRepository } from './products';

@Global()
@Module({
  imports: [PrismaModule, ColdCacheModule.forRootAsync(), forwardRef(() => ScoringModule), forwardRef(() => FilteringModule)],
  providers: [
    OrganizationsRepository,
    ProductsRepository,
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
    OrganizationsRepository,
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
    ComplianceNotesRepository,
    ComplianceNoteLinksRepository,
    ComplianceNoteFilesRepository,
    ProductsRepository,
  ],
})
export class ComplianceRepositoryModule {}
