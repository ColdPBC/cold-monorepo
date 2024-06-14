import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceNotesRepository } from './compliance-notes.repository';

describe('ComplianceNotesRepositoryService', () => {
  let service: ComplianceNotesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplianceNotesRepository],
    }).compile();

    service = module.get<ComplianceNotesRepository>(ComplianceNotesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
