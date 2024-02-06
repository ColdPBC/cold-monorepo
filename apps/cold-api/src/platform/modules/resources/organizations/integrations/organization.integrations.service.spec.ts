import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationIntegrationsService } from './organization.integrations.service';

describe('OrganizationIntegrationsService', () => {
  let service: OrganizationIntegrationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationIntegrationsService],
    }).compile();

    service = module.get<OrganizationIntegrationsService>(OrganizationIntegrationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
