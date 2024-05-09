import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationComplianceStatusesController } from './organization_compliance_statuses.controller';
import { OrganizationComplianceStatusesService } from './organization_compliance_statuses.service';

describe('OrganizationComplianceStatusesController', () => {
  let controller: OrganizationComplianceStatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationComplianceStatusesController],
      providers: [OrganizationComplianceStatusesService],
    }).compile();

    controller = module.get<OrganizationComplianceStatusesController>(OrganizationComplianceStatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
