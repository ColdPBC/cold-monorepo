import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceQuestionBookmarksRepository } from './compliance-question-bookmarks.repository';

describe('ComplianceQuestionBookmarksService', () => {
  let service: ComplianceQuestionBookmarksRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplianceQuestionBookmarksRepository],
    }).compile();

    service = module.get<ComplianceQuestionBookmarksRepository>(ComplianceQuestionBookmarksRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
