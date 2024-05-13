import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceSectionsRepository } from './compliance-sections.repository';

describe('ComplianceSectionsService', () => {
  let service: ComplianceSectionsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplianceSectionsRepository],
    }).compile();

    service = module.get<ComplianceSectionsRepository>(ComplianceSectionsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
