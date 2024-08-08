import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationClaimsService } from './organization_claims_service';

describe('ClaimsService', () => {
  let service: OrganizationClaimsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Organization_claimsService],
    }).compile();

    service = module.get<Organization_claimsService>(Organization_claimsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
