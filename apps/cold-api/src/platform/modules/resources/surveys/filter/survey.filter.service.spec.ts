import { SurveyFilterService } from './survey.filter.service';
import { set } from 'lodash';
import { generateMockData } from './fixtures/mocks';
import jsonata from 'jsonata';

describe('SurveyFilterService', () => {
  let service: SurveyFilterService;

  beforeEach(async () => {
    service = new SurveyFilterService();
  });
  const complianceSets = ['rei_pia_2024', 'rei_pia_2023'];
  for (const complianceSet of complianceSets) {
    describe(`${complianceSet}: valid data`, () => {
      const valid_survey: any = Object.assign({}, generateMockData(complianceSet));
      Object.keys(valid_survey.definition.sections).forEach(sectionKey => {
        describe(`section: ${sectionKey}`, () => {
          const section = valid_survey.definition.sections[sectionKey];
          Object.keys(section.follow_up).forEach(followUpKey => {
            const followUp = section.follow_up[followUpKey];
            describe(`question: ${followUpKey}`, () => {
              if (followUp.dependency?.expression) {
                try {
                  it(`${followUpKey} should pass evaluation `, async () => {
                    let answer;

                    const conditions = followUp.dependency.conditions;

                    for (const condition of conditions) {
                      const depSectionKey = condition.question.split('-')[0];

                      if (valid_survey.definition.sections[depSectionKey].follow_up[condition.question].component === 'yes_no') {
                        answer = condition.values[0] === 'Yes';
                      } else {
                        answer = condition.values;
                      }

                      set(valid_survey.definition.sections[depSectionKey].follow_up, `${condition.question}.value`, answer);
                    }

                    const testX = jsonata(followUp.dependency.expression);
                    const result = await testX.evaluate(valid_survey.definition);
                    // replace `expectedResult` with the expected result of the expression
                    const expectedResult = true;
                    expect(result).toEqual(expectedResult);
                  });
                } catch (e) {
                  console.log(e);
                }
              }
            });
          });
        });
      });
    });
    describe(`${complianceSet}: invalid data`, () => {
      let invalid_survey: any = JSON.parse(JSON.stringify(Object.assign({}, generateMockData(complianceSet))));
      Object.keys(invalid_survey.definition.sections).forEach(sectionKey => {
        describe(`section: ${sectionKey}`, () => {
          const section = invalid_survey.definition.sections[sectionKey];
          Object.keys(section.follow_up).forEach(followUpKey => {
            const followUp = section.follow_up[followUpKey];
            describe(`question: ${followUpKey}`, () => {
              if (followUp.dependency?.expression) {
                try {
                  let answer;

                  const conditions = followUp.dependency.conditions;

                  for (const condition of conditions) {
                    const depSectionKey = condition.question.split('-')[0];

                    answer = 'xxxxxx';
                    set(invalid_survey.definition.sections[depSectionKey].follow_up, `${condition.question}.value`, answer);
                  }

                  it(`${followUpKey} should fail evaluation `, async () => {
                    const testX = jsonata(followUp.dependency.expression);
                    const result = await testX.evaluate(invalid_survey.definition);
                    // replace `expectedResult` with the expected result of the expression
                    const expectedResult = false;
                    expect(result).toEqual(expectedResult);
                  });
                } catch (e) {
                  console.log(e);
                }
              }
            });
          });
        });
      });
    });
  }
});
