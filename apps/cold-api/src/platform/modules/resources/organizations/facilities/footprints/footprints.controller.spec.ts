import { Test, TestingModule } from '@nestjs/testing';
import { FootprintsController } from './footprints.controller';
import { FootprintsService } from './footprints.service';

describe('FootprintsController', () => {
  let controller: FootprintsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FootprintsController],
      providers: [FootprintsService],
    }).compile();

    controller = module.get<FootprintsController>(FootprintsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
