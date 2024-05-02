import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationComplianceService } from './organization_compliance.service';

describe('OrganizationComplianceService', () => {
  let service: OrganizationComplianceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationComplianceService],
    }).compile();

    service = module.get<OrganizationComplianceService>(OrganizationComplianceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
