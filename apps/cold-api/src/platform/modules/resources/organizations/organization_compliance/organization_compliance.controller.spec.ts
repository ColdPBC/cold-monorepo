import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationComplianceController } from './organization_compliance.controller';
import { OrganizationComplianceService } from './organization_compliance.service';

describe('OrganizationComplianceController', () => {
  let controller: OrganizationComplianceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationComplianceController],
      providers: [OrganizationComplianceService],
    }).compile();

    controller = module.get<OrganizationComplianceController>(OrganizationComplianceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
