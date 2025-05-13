import { Test, TestingModule } from '@nestjs/testing';
import { EprSubmissionsController } from './epr_submissions.controller';

describe('EprSubmissionsController', () => {
  let controller: EprSubmissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EprSubmissionsController],
    }).compile();

    controller = module.get<EprSubmissionsController>(EprSubmissionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
