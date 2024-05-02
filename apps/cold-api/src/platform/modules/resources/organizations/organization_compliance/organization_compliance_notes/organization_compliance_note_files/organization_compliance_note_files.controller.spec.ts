import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationComplianceNoteFilesController } from './organization_compliance_note_files.controller';
import { OrganizationComplianceNoteFilesService } from './organization_compliance_note_files.service';

describe('OrganizationComplianceNoteFilesController', () => {
  let controller: OrganizationComplianceNoteFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationComplianceNoteFilesController],
      providers: [OrganizationComplianceNoteFilesService],
    }).compile();

    controller = module.get<OrganizationComplianceNoteFilesController>(OrganizationComplianceNoteFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
