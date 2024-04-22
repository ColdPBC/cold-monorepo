import { Test, TestingModule } from '@nestjs/testing';
import { OrgSurveysService } from './orgSurveys.service';

describe('SurveysService', () => {
  let service: OrgSurveysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrgSurveysService],
    }).compile();

    service = module.get<OrgSurveysService>(OrgSurveysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
