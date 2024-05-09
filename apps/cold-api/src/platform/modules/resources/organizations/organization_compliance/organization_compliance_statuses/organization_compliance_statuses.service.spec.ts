import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationComplianceStatusesService } from './organization_compliance_statuses.service';

describe('OrganizationComplianceStatusesService', () => {
  let service: OrganizationComplianceStatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationComplianceStatusesService],
    }).compile();

    service = module.get<OrganizationComplianceStatusesService>(OrganizationComplianceStatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
