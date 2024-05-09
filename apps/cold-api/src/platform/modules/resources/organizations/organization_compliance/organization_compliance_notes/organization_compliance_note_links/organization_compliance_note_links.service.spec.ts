import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationComplianceNoteLinksService } from './organization_compliance_note_links.service';

describe('OrganizationComplianceNoteLinksService', () => {
  let service: OrganizationComplianceNoteLinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationComplianceNoteLinksService],
    }).compile();

    service = module.get<OrganizationComplianceNoteLinksService>(OrganizationComplianceNoteLinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
