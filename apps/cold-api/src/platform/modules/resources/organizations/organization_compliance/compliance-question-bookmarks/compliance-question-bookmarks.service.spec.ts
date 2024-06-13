import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceQuestionBookmarkService } from './compliance-question-bookmarks.service';

describe('OrganizationComplianceBookmarksService', () => {
  let service: ComplianceQuestionBookmarkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplianceQuestionBookmarkService],
    }).compile();

    service = module.get<ComplianceQuestionBookmarkService>(ComplianceQuestionBookmarkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
