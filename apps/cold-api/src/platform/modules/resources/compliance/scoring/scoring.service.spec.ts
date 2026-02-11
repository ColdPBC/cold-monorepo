import { generateMockData } from '../../surveys/filter/fixtures/mocks';
import { ScoringService } from './scoring.service';
describe('ScoringService', () => {
  let scoredSurvey: any;

  let service: ScoringService = new ScoringService();

  const complianceSets = ['rei_pia_2024', 'rei_pia_2023'];
  for (const complianceSet of complianceSets) {
    const mockData = generateMockData(complianceSet);
    scoredSurvey = service.scoreAssesment(mockData);

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should score survey', async () => {
      expect(scoredSurvey).toBeDefined();
    });

    describe(`${complianceSet}: valid data`, () => {
      Object.keys(scoredSurvey.definition.sections).forEach(sectionKey => {
        const section = scoredSurvey.definition.sections[sectionKey];
        describe(`section: ${sectionKey}`, () => {
          Object.keys(section.follow_up).forEach(followUpKey => {
            const followUp = section.follow_up[followUpKey];

            if (followUp.rubric?.score_map && followUp.value !== null) {
              console.log(followUpKey);
              it(`${followUpKey} should have correct score`, async () => {
                let expectedScore = 0;

                if (Array.isArray(followUp.value)) {
                  for (const value of followUp.value) {
                    if (followUp.rubric.score_map[value]) {
                      expectedScore += followUp.rubric.score_map[value];
                    }
                  }
                } else {
                  expectedScore = followUp.rubric.score_map[followUp.value];
                }

                if (followUp.rubric.max_score && expectedScore > followUp.rubric.max_score) {
                  expectedScore = followUp.rubric.max_score;
                }

                const actualScore = followUp.score;
                expect(actualScore).toEqual(expectedScore);
              });
            }
          });
        });
      });
    });
  }
});
