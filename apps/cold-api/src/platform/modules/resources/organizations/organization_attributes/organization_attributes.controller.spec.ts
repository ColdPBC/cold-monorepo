import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationAttributesController } from './organization_attributes.controller';
import { OrganizationAttributesService } from './organization_attributes_service';

describe('ClaimsController', () => {
  let controller: OrganizationAttributesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationAttributesController],
      providers: [OrganizationAttributesService],
    }).compile();

    controller = module.get<OrganizationAttributesController>(OrganizationAttributesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
