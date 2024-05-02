import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationComplianceResponsesController } from './organization_compliance_responses.controller';
import { OrganizationComplianceResponsesService } from './organization_compliance_responses.service';

describe('OrganizationComplianceResponsesController', () => {
  let controller: OrganizationComplianceResponsesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationComplianceResponsesController],
      providers: [OrganizationComplianceResponsesService],
    }).compile();

    controller = module.get<OrganizationComplianceResponsesController>(OrganizationComplianceResponsesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
