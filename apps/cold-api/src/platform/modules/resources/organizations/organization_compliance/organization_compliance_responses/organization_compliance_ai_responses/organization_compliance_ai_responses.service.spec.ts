import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationComplianceAiResponsesService } from './organization_compliance_ai_responses.service';

describe('OrganizationComplianceAiResponsesService', () => {
  let service: OrganizationComplianceAiResponsesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationComplianceAiResponsesService],
    }).compile();

    service = module.get<OrganizationComplianceAiResponsesService>(OrganizationComplianceAiResponsesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
