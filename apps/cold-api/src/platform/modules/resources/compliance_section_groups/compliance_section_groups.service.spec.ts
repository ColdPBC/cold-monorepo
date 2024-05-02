import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceSectionGroupsService } from './compliance_section_groups.service';

describe('ComplianceSectionGroupsService', () => {
  let service: ComplianceSectionGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplianceSectionGroupsService],
    }).compile();

    service = module.get<ComplianceSectionGroupsService>(ComplianceSectionGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
