import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceAiResponsesRepository } from './compliance-ai-responses.repository';

describe('ComplianceAiresponsesService', () => {
  let service: ComplianceAiResponsesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplianceAiResponsesRepository],
    }).compile();

    service = module.get<ComplianceAiResponsesRepository>(ComplianceAiResponsesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
