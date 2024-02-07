import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationFilesController } from './organization.files.controller';

describe('OrganizationFilesController', () => {
  let controller: OrganizationFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationFilesController],
    }).compile();

    controller = module.get<OrganizationFilesController>(OrganizationFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
