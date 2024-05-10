import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceQuestionsRepository } from './compliance-questions.repository';

describe('ComplianceQuestionsService', () => {
  let service: ComplianceQuestionsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplianceQuestionsRepository],
    }).compile();

    service = module.get<ComplianceQuestionsRepository>(ComplianceQuestionsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
