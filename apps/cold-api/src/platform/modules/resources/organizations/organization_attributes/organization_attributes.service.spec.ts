import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationAttributesService } from './organization_attributes_service';

describe('OrganizationAttributesService', () => {
  let service: OrganizationAttributesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationAttributesService],
    }).compile();

    service = module.get<OrganizationAttributesService>(OrganizationAttributesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
