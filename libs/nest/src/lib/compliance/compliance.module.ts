import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from '../prisma';
import {
  ComplianceAiResponsesRepository,
  ComplianceQuestionsRepository,
  ComplianceResponsesRepository,
  ComplianceSectionGroupsRepository,
  ComplianceSectionsRepository,
} from './repository';
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
    CacheService,
  ],
  exports: [
    PrismaService,
    ComplianceSectionsRepository,
    ComplianceSectionGroupsRepository,
    ComplianceQuestionsRepository,
    ComplianceAiResponsesRepository,
    ComplianceResponsesRepository,
  ],
})
export class ComplianceModule {}
