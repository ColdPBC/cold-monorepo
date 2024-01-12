import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationLocationsService } from './organization_locations.service';

describe('OrganizationLocationsService', () => {
  let service: OrganizationLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationLocationsService],
    }).compile();

    service = module.get<OrganizationLocationsService>(OrganizationLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
