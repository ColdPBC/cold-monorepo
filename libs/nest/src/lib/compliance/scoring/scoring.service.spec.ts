import { organizations } from '@prisma/client';
import { ScoringService } from './scoring.service';
import { IAuthenticatedUser } from '../../primitives';
import { FilteringService } from '../filtering/filtering.service';
import { PrismaService } from '../../prisma/prisma.service';

// Scoring uses the real filter, but does not need tracing or metrics clients.
jest.mock('../../worker', () => ({
  BaseWorker: class {
    logger = { warn: jest.fn(), error: jest.fn(), info: jest.fn() };
  },
}));

const mockData = {
  id: 'org_liq0Z0GHUJ044liS',
  name: 'cold-climate-development',
  display_name: 'Cold Climate',
  organization_compliance: [
    {
      id: 'oc_ccsql9xefvqxtrw3',
      question_bookmarks: [],
      notes: [],
      compliance_definition: {
        id: 'cmpdef_srftck1ztt4l2dbt',
        name: 'b_corp_2024',
        compliance_section_groups: [
          {
            id: 'csg_rbl6dq4w4tl6w2ql',
            title: 'Governance',
            order: 27,
            deleted: false,
            compliance_sections: [
              {
                id: 'cs_bhm89le3hfhy5ml5',
                key: 'MSL',
                title: 'Mission Locked',
                order: 3,
                deleted: false,
                compliance_section_dependency_chains: {},
                compliance_questions: [
                  {
                    id: 'cq_k5prdx746aa5sjm4',
                    key: 'DTG-163',
                    order: 178,
                    component: 'yes_no',
                    rubric: { max_score: 0.79, score_map: { true: 0.79, false: 0 } },
                    options: {},
                    question_summary: 'Defining Outcomes',
                    compliance_responses: [
                      {
                        id: 15913,
                        org_response: {
                          value: false,
                        },
                        ai_response: {
                          id: 'ocair_omm9rr7y5aqoqill',
                          answer: true,
                          justification: '',
                        },
                      },
                    ],
                    max_score: 0.79,
                    score: 0,
                    ai_score: 0.79,
                  },
                  {
                    id: 'cq_ajrowa9wulgzq03g',
                    rubric: {
                      max_score: 12.63,
                      score_map: { '5%+ revenues': 12.63, '0-1.9% revenues': 0, '2-2.9% revenues': 7.58, '3-3.9% revenues': 8.84, '4-4.9% revenues': 10.11 },
                    },
                    compliance_responses: [
                      {
                        id: 15913,
                        org_response: {
                          value: ['5%+ revenues'],
                        },
                        ai_response: {
                          id: 'ocair_omm9rr7y5aqoqill',
                          answer: ['02-2.9% revenues'],
                          justification: '',
                        },
                        deleted: false,
                      },
                    ],
                    max_score: 12.63,
                    score: 12.63,
                    ai_score: 7.58,
                  },
                  {
                    id: 'cq_ojjhe3h855bx5dnp',
                    key: 'DTG-162',
                    order: 177,
                    component: 'multi_select',
                    tooltip: '',
                    placeholder: '',
                    rubric: {
                      score_map: {
                        'None of the above': 0,
                        'Company screens charitable partners based on their own criteria': 0.39,
                        'Play a leadership role with recipient charitable organizations (e.g. board or advisory board participation)': 0.79,
                        'Use a third-party screen to ensure that recipient organizations meet specific guidelines to qualify for donations': 0.79,
                        'Use a third-party screen to ensure that recipient organizations are efficiently allocating resources (e.g. Guidestar, Charity Navigator)': 0.79,
                      },
                    },
                    compliance_responses: [
                      {
                        id: 15936,
                        org_response: {
                          value: [
                            'Company screens charitable partners based on their own criteria',
                            'Play a leadership role with recipient charitable organizations (e.g. board or advisory board participation)',
                            'Use a third-party screen to ensure that recipient organizations meet specific guidelines to qualify for donations',
                            'Use a third-party screen to ensure that recipient organizations are efficiently allocating resources (e.g. Guidestar, Charity Navigator)',
                          ],
                        },
                        ai_response: {
                          id: 'ocair_q7j9enmxv0q02lwe',
                          answer: [
                            'Company screens charitable partners based on their own criteria',
                            'Play a leadership role with recipient charitable organizations (e.g. board or advisory board participation)',
                          ],
                          justification: '',
                        },
                        deleted: false,
                      },
                    ],
                    max_score: 1.58,
                    score: 1.58,
                    ai_score: 1.18,
                  },
                ],
                score: 14.21,
                ai_score: 10.87,
                max_score: 15,
              },
              {
                id: 'cs_a1o4lhm49g7knibt',
                key: 'ETH',
                title: 'Ethics & Transparency',
                order: 1,
                deleted: false,
                compliance_section_dependency_chains: {},
                compliance_questions: [
                  {
                    id: 'cq_k5prdx746aa5sjm4',
                    key: 'DTG-163',
                    order: 178,
                    component: 'yes_no',
                    rubric: { max_score: 0.79, score_map: { true: 0.79, false: 0 } },
                    options: {},
                    question_summary: 'Defining Outcomes',
                    compliance_responses: [
                      {
                        id: 15913,
                        org_response: {
                          value: 'true',
                        },
                        ai_response: {
                          id: 'ocair_omm9rr7y5aqoqill',
                          answer: null,
                          justification: '',
                        },
                      },
                    ],
                    max_score: 0.79,
                    score: 0,
                    ai_score: 0,
                  },
                  {
                    id: 'cq_ajrowa9wulgzq03g',
                    component: 'select',
                    rubric: {
                      max_score: 12.63,
                      score_map: { '5%+ revenues': 12.63, '0-1.9% revenues': 0, '2-2.9% revenues': 7.58, '3-3.9% revenues': 8.84, '4-4.9% revenues': 10.11 },
                    },
                    compliance_responses: [
                      {
                        id: 15913,
                        org_response: {
                          value: ['2-2.9% revenues', '3-3.9% revenues'],
                        },
                        ai_response: {
                          id: 'ocair_omm9rr7y5aqoqill',
                          answer: ['02-2.9% revenues', '4-4.9% revenues'],
                          justification: '',
                        },
                        deleted: false,
                      },
                    ],
                    max_score: 12.63,
                    score: 0,
                    ai_score: 0,
                  },
                  {
                    id: 'cq_ojjhe3h855bx5dnp',
                    key: 'DTG-162',
                    order: 177,
                    component: 'multi_select',
                    tooltip: '',
                    placeholder: '',
                    rubric: {
                      score_map: {
                        'None of the above': 0,
                        'Company screens charitable partners based on their own criteria': 0.39,
                        'Play a leadership role with recipient charitable organizations (e.g. board or advisory board participation)': 0.79,
                        'Use a third-party screen to ensure that recipient organizations meet specific guidelines to qualify for donations': 0.79,
                        'Use a third-party screen to ensure that recipient organizations are efficiently allocating resources (e.g. Guidestar, Charity Navigator)': 0.79,
                      },
                    },
                    compliance_responses: [
                      {
                        id: 15936,
                        org_response: {
                          value: 'Company screens charitable partners based on their own criteria',
                        },
                        ai_response: {
                          id: 'ocair_q7j9enmxv0q02lwe',
                          answer: [''],
                          justification: '',
                        },
                        deleted: false,
                      },
                    ],
                    max_score: 1.58,
                    score: 0,
                    ai_score: 0,
                  },
                ],
                score: 0,
                ai_score: 0,
                max_score: 15,
              },
            ],
            score: 14.21,
            ai_score: 10.87,
            max_score: 30,
          },
        ],
        score: 0,
        ai_score: 35.519999999999996,
        max_score: 223.89,
      },
      deleted: false,
    },
  ],
};

describe('ScoringService', () => {
  let service: ScoringService;
  let scoredCompliance;
  let scoredSectionGroup;
  let scoredSections: any[];
  const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

  beforeEach(async () => {
    const prisma = {} as PrismaService;
    service = new ScoringService(new FilteringService(prisma), prisma);
    const response = mockData.organization_compliance[0].compliance_definition;
    // Each scoring method mutates its input; never reuse a previously scored object.
    scoredCompliance = await service.scoreComplianceResponse(clone(response), {} as organizations, {} as IAuthenticatedUser);
    scoredSectionGroup = await service.scoreSectionGroup(clone(response.compliance_section_groups[0]), {} as organizations, {} as IAuthenticatedUser);
    scoredSections = await Promise.all(
      response.compliance_section_groups[0].compliance_sections.map(section => service.scoreSection(clone(section), {} as organizations, {} as IAuthenticatedUser)),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('scoreComplianceResponse', () => {
    it('should return a scored compliance response', async () => {
      expect(scoredCompliance).toBeDefined();
      // add more assertions based on your scoring logic
    });
    it('should have score property', () => {
      expect(scoredCompliance).toHaveProperty('score');
    });
    it('should have ai_score property', () => {
      expect(scoredCompliance).toHaveProperty('ai_score');
    });
    it('should have max_score property', () => {
      expect(scoredCompliance).toHaveProperty('max_score');
    });
  });

  describe('scoreSectionGroup', () => {
    it('should return a scored section group', async () => {
      expect(scoredSectionGroup).toBeDefined();
    });

    it('should have score property', () => {
      expect(scoredSectionGroup).toHaveProperty('score');
    });
    it('should have ai_score property', () => {
      expect(scoredSectionGroup).toHaveProperty('ai_score');
    });
    it('should have max_score property', () => {
      expect(scoredSectionGroup).toHaveProperty('max_score');
    });
  });

  describe('scoreSections', () => {
    // Declare cases from the static fixture, not data populated later by beforeEach.
    for (const [index, fixture] of mockData.organization_compliance[0].compliance_definition.compliance_section_groups[0].compliance_sections.entries()) {
      it(`should return scored section ${fixture.key}`, () => {
        expect(scoredSections[index]).toBeDefined();
      });
      it(`${fixture.key} should have score property`, () => {
        expect(scoredSections[index]).toHaveProperty('score');
      });
      it(`${fixture.key} should have ai_score property`, () => {
        expect(scoredSections[index]).toHaveProperty('ai_score');
      });
      it(`${fixture.key} should have max_score property`, () => {
        expect(scoredSections[index]).toHaveProperty('max_score');
      });
    }
  });

  describe('scoreQuestion', () => {
    it('scores an affirmative organization response and suppresses the AI score', async () => {
      const question = {
        component: 'yes_no',
        rubric: { max_score: 4, score_map: { true: 4, false: 0 } },
        compliance_responses: [{ org_response: { value: true }, ai_response: { answer: true } }],
      };
      const result = await service.scoreQuestion(question, {} as organizations, {} as IAuthenticatedUser);
      expect(result).toMatchObject({ score: 4, ai_score: 0, max_score: 4, counts: { org_answered: 1, ai_answered: 0, not_started: 0 } });
    });

    it('should return a scored question', async () => {
      const question = {}; // replace with a valid question
      const result = await service.scoreQuestion(question, {} as organizations, {} as IAuthenticatedUser);
      expect(result).toBeDefined();
      // add more assertions based on your scoring logic
    });
  });
});
