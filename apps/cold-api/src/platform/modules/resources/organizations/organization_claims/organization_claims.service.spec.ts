import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationClaimsService } from './organization_claims_service';

describe('ClaimsService', () => {
  let service: OrganizationClaimsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationClaimsService],
    }).compile();

    service = module.get<OrganizationClaimsService>(OrganizationClaimsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
