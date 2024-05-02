import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationComplianceBookmarksController } from './organization_compliance_bookmarks.controller';
import { OrganizationComplianceBookmarksService } from './organization_compliance_bookmarks.service';

describe('OrganizationComplianceBookmarksController', () => {
  let controller: OrganizationComplianceBookmarksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationComplianceBookmarksController],
      providers: [OrganizationComplianceBookmarksService],
    }).compile();

    controller = module.get<OrganizationComplianceBookmarksController>(OrganizationComplianceBookmarksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
