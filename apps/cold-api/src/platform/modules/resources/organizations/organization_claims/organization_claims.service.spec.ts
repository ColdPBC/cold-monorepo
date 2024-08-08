import { Test, TestingModule } from '@nestjs/testing';
import { ClaimsService } from './organization_claims_service';

describe('ClaimsService', () => {
  let service: Organization_claimsService;

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
