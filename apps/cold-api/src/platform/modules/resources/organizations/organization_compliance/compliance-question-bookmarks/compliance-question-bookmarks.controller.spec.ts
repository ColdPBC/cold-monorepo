import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceQuestionBookmarkController } from './compliance-question-bookmark.controller';
import { ComplianceQuestionBookmarkService } from './compliance-question-bookmarks.service';

describe('OrganizationComplianceBookmarksController', () => {
  let controller: ComplianceQuestionBookmarkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComplianceQuestionBookmarkController],
      providers: [ComplianceQuestionBookmarkService],
    }).compile();

    controller = module.get<ComplianceQuestionBookmarkController>(ComplianceQuestionBookmarkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
