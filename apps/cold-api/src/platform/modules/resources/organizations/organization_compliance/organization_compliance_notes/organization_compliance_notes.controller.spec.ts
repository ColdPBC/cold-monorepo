import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationComplianceNotesController } from './organization_compliance_notes.controller';
import { OrganizationComplianceNotesService } from './organization_compliance_notes.service';

describe('OrganizationComplianceNotesController', () => {
  let controller: OrganizationComplianceNotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationComplianceNotesController],
      providers: [OrganizationComplianceNotesService],
    }).compile();

    controller = module.get<OrganizationComplianceNotesController>(OrganizationComplianceNotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
