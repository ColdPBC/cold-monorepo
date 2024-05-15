import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceSectionService } from './compliance-section.service';

describe('ComplianceSectionService', () => {
  let service: ComplianceSectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplianceSectionService],
    }).compile();

    service = module.get<ComplianceSectionService>(ComplianceSectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
