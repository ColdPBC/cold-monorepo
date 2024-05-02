import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationComplianceAiResponseFilesService } from './organization_compliance_ai_response_files.service';

describe('OrganizationComplianceAiResponseFilesService', () => {
  let service: OrganizationComplianceAiResponseFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationComplianceAiResponseFilesService],
    }).compile();

    service = module.get<OrganizationComplianceAiResponseFilesService>(OrganizationComplianceAiResponseFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
