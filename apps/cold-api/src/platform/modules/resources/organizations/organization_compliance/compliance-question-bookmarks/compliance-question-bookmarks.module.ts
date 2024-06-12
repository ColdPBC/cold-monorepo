import { Module } from '@nestjs/common';
import { ComplianceQuestionBookmarkService } from './compliance-question-bookmarks.service';
import { ComplianceQuestionBookmarkController } from './compliance-question-bookmark.controller';
import { ComplianceRepositoryModule } from '@coldpbc/nest';

@Module({
  imports: [ComplianceRepositoryModule],
  controllers: [ComplianceQuestionBookmarkController],
  providers: [ComplianceQuestionBookmarkService],
  exports: [ComplianceQuestionBookmarkService],
})
export class OrganizationComplianceBookmarksModule {}
