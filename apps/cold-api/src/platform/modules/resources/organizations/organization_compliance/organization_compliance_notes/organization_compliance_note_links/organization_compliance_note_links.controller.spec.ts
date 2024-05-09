import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationComplianceNoteLinksController } from './organization_compliance_note_links.controller';
import { OrganizationComplianceNoteLinksService } from './organization_compliance_note_links.service';

describe('OrganizationComplianceNoteLinksController', () => {
  let controller: OrganizationComplianceNoteLinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationComplianceNoteLinksController],
      providers: [OrganizationComplianceNoteLinksService],
    }).compile();

    controller = module.get<OrganizationComplianceNoteLinksController>(OrganizationComplianceNoteLinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
