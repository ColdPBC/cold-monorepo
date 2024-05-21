import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceSectionGroupsController } from './compliance-section-groups.controller';
import { ComplianceSectionGroupsService } from './compliance-section-groups.service';

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
