import { Test, TestingModule } from '@nestjs/testing';
import { OrgRolesController } from './roles.controller';

describe('RolesController', () => {
  let controller: OrgRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrgRolesController],
    }).compile();

    controller = module.get<OrgRolesController>(OrgRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
