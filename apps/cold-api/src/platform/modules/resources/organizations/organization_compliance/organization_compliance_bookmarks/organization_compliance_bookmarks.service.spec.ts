import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationComplianceBookmarksService } from './organization_compliance_bookmarks.service';

describe('OrganizationComplianceBookmarksService', () => {
  let service: OrganizationComplianceBookmarksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationComplianceBookmarksService],
    }).compile();

    service = module.get<OrganizationComplianceBookmarksService>(OrganizationComplianceBookmarksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
