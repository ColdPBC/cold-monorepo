import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationComplianceResponsesService } from './organization_compliance_responses.service';

describe('OrganizationComplianceResponsesService', () => {
  let service: OrganizationComplianceResponsesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationComplianceResponsesService],
    }).compile();

    service = module.get<OrganizationComplianceResponsesService>(OrganizationComplianceResponsesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
