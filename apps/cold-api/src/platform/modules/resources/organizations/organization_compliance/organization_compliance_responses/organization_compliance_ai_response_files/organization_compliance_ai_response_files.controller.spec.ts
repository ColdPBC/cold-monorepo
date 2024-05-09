import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationComplianceAiResponseFilesController } from './organization_compliance_ai_response_files.controller';
import { OrganizationComplianceAiResponseFilesService } from './organization_compliance_ai_response_files.service';

describe('OrganizationComplianceAiResponseFilesController', () => {
  let controller: OrganizationComplianceAiResponseFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationComplianceAiResponseFilesController],
      providers: [OrganizationComplianceAiResponseFilesService],
    }).compile();

    controller = module.get<OrganizationComplianceAiResponseFilesController>(OrganizationComplianceAiResponseFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
