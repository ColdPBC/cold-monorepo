import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationComplianceAiResponsesController } from './organization_compliance_ai_responses.controller';
import { OrganizationComplianceAiResponsesService } from './organization_compliance_ai_responses.service';

describe('OrganizationComplianceAiResponsesController', () => {
  let controller: OrganizationComplianceAiResponsesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationComplianceAiResponsesController],
      providers: [OrganizationComplianceAiResponsesService],
    }).compile();

    controller = module.get<OrganizationComplianceAiResponsesController>(OrganizationComplianceAiResponsesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
