import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from '../prisma';
import {
  ComplianceAiResponsesRepository,
  ComplianceQuestionsRepository,
  ComplianceResponsesRepository,
  ComplianceSectionGroupsRepository,
  ComplianceSectionsCacheRepository,
  ComplianceSectionsRepository,
} from './compliance';
import { CacheService, ColdCacheModule } from '../cache';

@Module({
  imports: [PrismaModule, ColdCacheModule.forRootAsync()],
  providers: [
    PrismaService,
    ComplianceSectionsRepository,
    ComplianceSectionGroupsRepository,
    ComplianceQuestionsRepository,
    ComplianceAiResponsesRepository,
    ComplianceResponsesRepository,
    ComplianceSectionsCacheRepository,
    CacheService,
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
