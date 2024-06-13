import { Module } from '@nestjs/common';
import { ComplianceQuestionBookmarkService } from './compliance-question-bookmarks.service';
import { ComplianceQuestionBookmarkController } from './compliance-question-bookmark.controller';

@Module({
  imports: [],
  controllers: [ComplianceQuestionBookmarkController],
  providers: [ComplianceQuestionBookmarkService],
  exports: [ComplianceQuestionBookmarkService],
})
export class OrganizationComplianceBookmarksModule {}
