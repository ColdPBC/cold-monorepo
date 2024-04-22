import { Test, TestingModule } from '@nestjs/testing';
import { OrgSurveysController } from './orgSurveys.controller';

describe('OrgSurveysController', () => {
  let controller: OrgSurveysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrgSurveysController],
    }).compile();

    controller = module.get<OrgSurveysController>(OrgSurveysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
