import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceQuestionsService } from './compliance_questions.service';

describe('ComplianceQuestionsService', () => {
  let service: ComplianceQuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplianceQuestionsService],
    }).compile();

    service = module.get<ComplianceQuestionsService>(ComplianceQuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
