import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceSectionGroupsRepository } from './compliance-section-groups.repository';

describe('ComplianceSectionGroupsService', () => {
  let service: ComplianceSectionGroupsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplianceSectionGroupsRepository],
    }).compile();

    service = module.get<ComplianceSectionGroupsRepository>(ComplianceSectionGroupsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
