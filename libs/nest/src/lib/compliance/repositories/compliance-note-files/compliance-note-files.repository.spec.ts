import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceNoteFilesRepository } from './compliance-note-files.repository';

describe('ComplianceNoteFilesService', () => {
  let service: ComplianceNoteFilesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplianceNoteFilesRepository],
    }).compile();

    service = module.get<ComplianceNoteFilesRepository>(ComplianceNoteFilesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
