import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationLocationsController } from './organization_locations.controller';

describe('OrganizationLocationsController', () => {
  let controller: OrganizationLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationLocationsController],
    }).compile();

    controller = module.get<OrganizationLocationsController>(OrganizationLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
