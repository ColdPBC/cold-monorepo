import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceSectionGroupsController } from './compliance_section_groups.controller';
import { ComplianceSectionGroupsService } from './compliance_section_groups.service';

describe('ComplianceSectionGroupsController', () => {
  let controller: ComplianceSectionGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComplianceSectionGroupsController],
      providers: [ComplianceSectionGroupsService],
    }).compile();

    controller = module.get<ComplianceSectionGroupsController>(ComplianceSectionGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
