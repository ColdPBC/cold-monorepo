import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationComplianceNoteFilesService } from './organization_compliance_note_files.service';

describe('OrganizationComplianceNoteFilesService', () => {
  let service: OrganizationComplianceNoteFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationComplianceNoteFilesService],
    }).compile();

    service = module.get<OrganizationComplianceNoteFilesService>(OrganizationComplianceNoteFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
