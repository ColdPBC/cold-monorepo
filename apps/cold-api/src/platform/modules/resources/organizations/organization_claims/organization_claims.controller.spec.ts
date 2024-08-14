import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationClaimsController } from './organization_claims.controller';
import { OrganizationClaimsService } from './organization_claims_service';

describe('ClaimsController', () => {
  let controller: OrganizationClaimsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationClaimsController],
      providers: [OrganizationClaimsService],
    }).compile();

    controller = module.get<OrganizationClaimsController>(OrganizationClaimsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
