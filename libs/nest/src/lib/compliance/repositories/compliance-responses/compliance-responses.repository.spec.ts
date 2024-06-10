import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceResponsesRepository } from './compliance-responses.repository';

describe('ComplianceResponsesService', () => {
  let service: ComplianceResponsesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplianceResponsesRepository],
    }).compile();

    service = module.get<ComplianceResponsesRepository>(ComplianceResponsesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
