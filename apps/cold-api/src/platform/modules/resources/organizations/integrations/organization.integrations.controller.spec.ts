import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationIntegrationsController } from './organization.integrations.controller';

describe('IntegrationsController', () => {
  let controller: OrganizationIntegrationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationIntegrationsController],
    }).compile();

    controller = module.get<OrganizationIntegrationsController>(OrganizationIntegrationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
