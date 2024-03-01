import { Test, TestingModule } from '@nestjs/testing';
import { ScoringService } from './scoring.service';
import { generateMockData } from '../filter/fixtures/mocks';

describe('ScoringService', () => {
  let survey;

  let service: ScoringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoringService],
    }).compile();

    service = module.get<ScoringService>(ScoringService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const complianceSets = ['rei_pia_2024', 'rei_pia_2023'];
  for (const complianceSet of complianceSets) {
    describe(`${complianceSet}: valid data`, () => {
      it('should score the survey', async () => {
        const mockData = generateMockData(complianceSet);
        await service.scoreSurvey(mockData);
        
        expect(mockData).toBeDefined();
      });
    });
  }
});
