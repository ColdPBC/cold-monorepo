import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceSectionsController } from './compliance_sections.controller';
import { ComplianceSectionsService } from './compliance_sections.service';

describe('ComplianceSectionsController', () => {
  let controller: ComplianceSectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComplianceSectionsController],
      providers: [ComplianceSectionsService],
    }).compile();

    controller = module.get<ComplianceSectionsController>(ComplianceSectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
