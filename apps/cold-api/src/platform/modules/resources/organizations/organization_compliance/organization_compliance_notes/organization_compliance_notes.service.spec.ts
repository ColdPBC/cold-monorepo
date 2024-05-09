import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationComplianceNotesService } from './organization_compliance_notes.service';

describe('OrganizationComplianceNotesService', () => {
  let service: OrganizationComplianceNotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationComplianceNotesService],
    }).compile();

    service = module.get<OrganizationComplianceNotesService>(OrganizationComplianceNotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
