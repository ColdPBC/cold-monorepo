import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceNoteLinksRepository } from './compliance-note-links.repository';

describe('ComplianceNoteLinksService', () => {
  let service: ComplianceNoteLinksRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplianceNoteLinksRepository],
    }).compile();

    service = module.get<ComplianceNoteLinksRepository>(ComplianceNoteLinksRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
