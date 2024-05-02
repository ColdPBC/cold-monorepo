import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceSectionsService } from './compliance_sections.service';

describe('ComplianceSectionsService', () => {
  let service: ComplianceSectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplianceSectionsService],
    }).compile();

    service = module.get<ComplianceSectionsService>(ComplianceSectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
