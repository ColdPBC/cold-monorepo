import { rest } from 'msw';
import { getActionAllStepsComplete, getActionMock, getActionMockNoResources, getActionNoDueDateSet, getActionsMock } from './action';
import {
  getCategoriesDataMock,
  getCategoriesEmptyDataMock,
  getFootprintAllNullFootprintValues,
  getFootprintDataFacilitiesAllFootprintsNull,
  getFootprintDataMock,
  getFootprintDataMockFiveSubCats,
  getFootprintDataMockThreeSubCats,
  getFootprintDataMockTwoSubCats,
  getFootprintEmptyDataMock,
} from './categoriesMock';
import { getMembersNoInvitations } from './membersMock';
import { getNewsAllMissingProperties, getNewsDefault, getNewsSomeMissingProperties } from './newsMock';
import { ActionPayload, ComplianceSurveyPayloadType } from '@coldpbc/interfaces';
import { getOrganizationMembersMock } from './datagridMock';
import {
  getActivateOrgCompliancePageMock,
  getAssessmentsComplianceMock,
  getComplianceMock,
  getDefaultCompliancePageMock,
  getDefaultOrgCompliancePageMock,
  getOrganizationComplianceMock,
  getOrganizationComplianceMockByName,
} from './complianceMock';
import { getAllFilesMock, getFilesWithCertificateClaimsMock } from './filesMock';
import { getApiUrl } from './handlers';
import { getAssessmentSurveyWithProgressMock, getSurveyFormDataByName } from './surveyDataMock';
import { getSingleYearsEmissionMock } from './emissionMocks';
import { set } from 'lodash';
import { addDays } from 'date-fns';

export const getFootprintHandler = {
  default: rest.get('*/organizations/:orgId/categories/company_decarbonization', (req, res, ctx) => {
    return res(ctx.json(getFootprintDataMock()));
  }),
  handle404: rest.get('*/organizations/:orgId/categories/company_decarbonization', (req, res, ctx) => {
    return res(ctx.status(404));
  }),
  empty: rest.get('*/organizations/:orgId/categories/company_decarbonization', (req, res, ctx) => {
    return res(ctx.json(getFootprintEmptyDataMock()));
  }),
  getFootprintDataFacilitiesAllFootprintsNull: rest.get('*/organizations/:orgId/categories/company_decarbonization', (req, res, ctx) => {
    return res(ctx.json(getFootprintDataFacilitiesAllFootprintsNull()));
  }),
  fiveSubCats: rest.get('*/organizations/:orgId/categories/company_decarbonization', (req, res, ctx) => {
    return res(ctx.json(getFootprintDataMockFiveSubCats()));
  }),
  twoSubCats: rest.get('*/organizations/:orgId/categories/company_decarbonization', (req, res, ctx) => {
    return res(ctx.json(getFootprintDataMockTwoSubCats()));
  }),
  threeSubCats: rest.get('*/organizations/:orgId/categories/company_decarbonization', (req, res, ctx) => {
    return res(ctx.json(getFootprintDataMockThreeSubCats()));
  }),
  allNullFootprintValues: rest.get('*/organizations/:orgId/categories/company_decarbonization', (req, res, ctx) => {
    return res(ctx.json(getFootprintAllNullFootprintValues()));
  }),
};

export const getCategoriesHandler = {
  default: rest.get('*/organizations/:orgId/categories', (req, res, ctx) => {
    return res(ctx.json(getCategoriesDataMock()));
  }),
  handle404: rest.get('*/organizations/:orgId/categories', (req, res, ctx) => {
    return res(ctx.status(404));
  }),
  empty: rest.get('*/organizations/:orgId/categories', (req, res, ctx) => {
    return res(ctx.json(getCategoriesEmptyDataMock()));
  }),
};

export const getMembersHandler = {
  noInvitations: rest.get('*/organizations/*/members', (req, res, ctx) => {
    return res(ctx.json(getMembersNoInvitations()));
  }),
};

export const getNewsHandler = {
  default: rest.get('*/news', (req, res, ctx) => {
    return res(ctx.json(getNewsDefault()));
  }),
  empty: rest.get('*/news', (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  allMissingProperties: rest.get('*/news', (req, res, ctx) => {
    return res(ctx.json(getNewsAllMissingProperties()));
  }),
  someMissingProperties: rest.get('*/news', (req, res, ctx) => {
    return res(ctx.json(getNewsSomeMissingProperties()));
  }),
  fourNewsItems: rest.get('*/news', (req, res, ctx) => {
    return res(ctx.json([...getNewsDefault(), ...getNewsDefault()]));
  }),
};

export const getActionHandler = {
  default: rest.get('*/organizations/*/actions/*', (req, res, ctx) => {
    return res(ctx.json(getActionMock()));
  }),
  noResources: rest.get('*/organizations/*/actions/*', (req, res, ctx) => {
    return res(ctx.json(getActionMockNoResources()));
  }),
  allStepsComplete: rest.get('*/organizations/*/actions/*', (req, res, ctx) => {
    return res(ctx.json(getActionAllStepsComplete()));
  }),
  subcategoryActionDetailsCard: [
    rest.patch('*/organizations/*/actions/:actionId', (req, res, ctx) => {
      return res(ctx.json({}));
    }),
  ],
  subCategoryActionsList: [
    rest.patch('*/organizations/*/actions/:actionId', (req, res, ctx) => {
      return res(ctx.json({}));
    }),
    rest.get('*/organizations/*/actions', (req, res, ctx) => {
      const facilitiesActions = getActionsMock().filter(action => action.action.subcategory === 'facilities');
      facilitiesActions[0].action.dependent_surveys.forEach((survey, index) => {
        survey.submitted = index === 0;
      });
      facilitiesActions[1].action.dependent_surveys.forEach(survey => {
        survey.submitted = true;
      });
      facilitiesActions[1].action.ready_to_execute = false;
      const actions = getActionsMock().map((actionPayload, index) => {
        if (actionPayload.action.subcategory === 'facilities') {
          if (facilitiesActions[0].id === actionPayload.id) {
            return facilitiesActions[0];
          } else {
            return facilitiesActions[1];
          }
        } else {
          return actionPayload;
        }
      });
      return res(ctx.json(actions));
    }),
  ],
  noDueDateSet: rest.get('*/organizations/*/actions/*', (req, res, ctx) => {
    return res(ctx.json(getActionNoDueDateSet()));
  }),
  subCategoryActionsListActionsStarted: [
    rest.patch('*/organizations/*/actions/:actionId', (req, res, ctx) => {
      return res(ctx.json({}));
    }),
    rest.get('*/organizations/*/actions', (req, res, ctx) => {
      const facilitiesActions = getActionsMock().filter(action => action.action.subcategory === 'facilities');
      // set all facilities actions surveys to submitted and ready to execute to true
      facilitiesActions.forEach(action => {
        action.action.dependent_surveys.forEach(survey => {
          survey.submitted = true;
        });
        action.action.ready_to_execute = true;
      });
      const actions = getActionsMock().map((actionPayload, index) => {
        if (actionPayload.action.subcategory === 'facilities') {
          // return the facilities action that matches the id
          return facilitiesActions.find(facilityAction => facilityAction.id === actionPayload.id);
        } else {
          return actionPayload;
        }
      });
      return res(ctx.json(actions));
    }),
  ],
  usersAssigned: rest.get('*/organizations/*/actions/*', (req, res, ctx) => {
    // set action assignees and some step assignees
    const members = getOrganizationMembersMock().members;
    return res(
      ctx.json({
        ...getActionAllStepsComplete(),
        action: {
          ...getActionAllStepsComplete().action,
          assignee: {
            email: members[0].email,
            name: members[0].name,
            family_name: members[0].family_name,
            given_name: members[0].given_name,
            picture: members[0].picture,
          },
          steps: getActionAllStepsComplete().action.steps.map((step, index) => {
            if (index === 0) {
              return {
                ...step,
                assignee: {
                  email: members[0].email,
                  name: members[0].name,
                  family_name: members[0].family_name,
                  given_name: members[0].given_name,
                  picture: members[0].picture,
                },
                complete: null,
              };
            } else {
              return {
                ...step,
                complete: null,
              };
            }
          }),
        },
      } as ActionPayload),
    );
  }),
  subcategoryActionsOverviewCard: [
    rest.get('*/organizations/*/actions', (req, res, ctx) => {
      const facilitiesActions = getActionsMock().filter(action => action.action.subcategory === 'facilities');
      facilitiesActions[0].action.dependent_surveys.forEach((survey, index) => {
        survey.submitted = true;
      });
      facilitiesActions[1].action.dependent_surveys.forEach(survey => {
        survey.submitted = true;
      });
      facilitiesActions[0].action.ready_to_execute = true;
      facilitiesActions[1].action.ready_to_execute = false;
      const actions = getActionsMock().map((actionPayload, index) => {
        if (actionPayload.action.subcategory === 'facilities') {
          if (facilitiesActions[0].id === actionPayload.id) {
            return facilitiesActions[0];
          } else {
            return facilitiesActions[1];
          }
        } else {
          return actionPayload;
        }
      });
      return res(ctx.json(actions));
    }),
  ],
  actionsOverview: [
    rest.get('*/organizations/*/actions', (req, res, ctx) => {
      const actions = getActionsMock().map((actionPayload, index) => {
        // set all the surveys to submitted and ready to execute to true
        actionPayload.action.dependent_surveys.forEach(survey => {
          survey.submitted = true;
        });
        actionPayload.action.ready_to_execute = true;
        return actionPayload;
      });
      return res(ctx.json(actions));
    }),
  ],
};

export const getCompliancePageHandler = {
  default: [
    rest.get(getApiUrl('/compliance_definitions'), (req, res, ctx) => {
      return res(ctx.json(getDefaultCompliancePageMock()));
    }),
    rest.get(getApiUrl('/compliance_definitions/organizations/:orgId'), (req, res, ctx) => {
      return res(ctx.json(getDefaultOrgCompliancePageMock()));
    }),
    rest.post(getApiUrl('/compliance_definitions/:name/organizations/:orgId'), (req, res, ctx) => {
      const { name, orgId } = req.params;
      return res(
        ctx.json({
          ...getOrganizationComplianceMockByName(name as string),
          compliance_definition: undefined,
        }),
      );
    }),
  ],
  activate: [
    rest.get(getApiUrl('/compliance_definitions'), (req, res, ctx) => {
      const { name } = req.params;
      return res(ctx.json(getDefaultCompliancePageMock()));
    }),
    rest.get(getApiUrl('/compliance_definitions/organizations/:orgId'), (req, res, ctx) => {
      return res(ctx.json(getActivateOrgCompliancePageMock()));
    }),
    rest.post(getApiUrl('/compliance_definitions/:name/organizations/:orgId'), (req, res, ctx) => {
      const { name } = req.params;
      return res(
        ctx.json({
          ...getOrganizationComplianceMockByName(name as string),
          compliance_definition: undefined,
        }),
      );
    }),
  ],
};

export const getComplianceDetailPageHandler = {
  default: [
    rest.get(getApiUrl('/compliance_definitions/organizations/:orgId'), (req, res, ctx) => {
      const compliance = getOrganizationComplianceMock();
      return res(ctx.json(compliance));
    }),
    rest.get(getApiUrl('/organizations/:orgId/surveys/:name'), (req, res, ctx) => {
      const { name } = req.params;
      const survey = getSurveyFormDataByName(name as string);
      return res(ctx.json(survey));
    }),
  ],
  analyzing: [
    rest.get(getApiUrl('/compliance_definitions/organizations/:orgId'), (req, res, ctx) => {
      const compliance = getOrganizationComplianceMock();
      return res(ctx.json(compliance));
    }),
    rest.get(getApiUrl('/organizations/:orgId/surveys/:name'), (req, res, ctx) => {
      const { name } = req.params;
      let survey = getSurveyFormDataByName(name as string);
      if (name === 'rei_mfg_survey') {
        survey = {
          id: 'b5a544e8-c87e-48e2-9c92-d9352dcc2d33',
          name: 'rei_mfg_survey',
          type: 'TEST',
          description: "Introductory survey to gather information about a brand's manufacturing practices",
          created_at: '2024-01-17T17:36:53.231Z',
          updated_at: '2024-01-17T17:36:53.232Z',
          definition: {
            title: 'Manufacturing Code of Conduct',
            sections: {
              MFG: {
                title: 'Manufacturing Code of Conduct',
                prompt: '',
                component: null,
                follow_up: {
                  'MFG-1': {
                    idx: 0,
                    prompt: 'Does your brand have in place a code of conduct for factories that manufacture the products you supply to REI?',
                    options: [],
                    tooltip: '',
                    component: 'yes_no',
                    placeholder: '',
                    additional_context: {
                      prompt: "Please describe how your brand plans to align with REI's expectation in this area.",
                      operator: '==',
                      component: 'textarea',
                      comparison: false,
                      placeholder: '',
                    },
                    value: true,
                    skipped: false,
                    ai_attempted: true,
                    ai_response: {
                      justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                      answer: true,
                    },
                  },
                  'MFG-2': {
                    idx: 1,
                    prompt: 'Please indicate which of the following topics are included in your manufacturing code of conduct.',
                    options: [
                      'Transparency',
                      'Non-discrimination',
                      'Harassment and Abuse',
                      'Recruitment and Hiring',
                      'Freedom of Association & Collective Bargaining',
                      'Hours of Work',
                      'Compensation',
                      'Health & Safety',
                      'Environment',
                      'Community',
                      'Other',
                    ],
                    tooltip: 'Select all that apply.',
                    component: 'multi_select',
                    placeholder: '',
                    additional_context: {
                      prompt: 'Please enter other topics included in your code of conduct. If entering multiple, separate using commas',
                      operator: '==',
                      component: 'textarea',
                      comparison: ['Other'],
                      placeholder: '',
                    },
                    value: ['Transparency', 'Non-discrimination'],
                    skipped: false,
                    ai_attempted: true,
                    ai_response: {
                      justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                      answer: ['Transparency', 'Non-discrimination'],
                    },
                  },
                  'MFG-3': {
                    idx: 2,
                    prompt: 'To which tiers of your supply chain has your code of conduct been formally communicated and implemented?',
                    options: [
                      'Tier 1 (finished product manufacturers)',
                      'Tier 2 (finished material/subcomponent manufacturers)',
                      'Tier 3 (raw material processors)',
                      'Tier 4 (raw material suppliers)',
                    ],
                    tooltip: 'Select all that apply.',
                    component: 'multi_select',
                    placeholder: '',
                    value: ['Tier 1 (finished product manufacturers)', 'Tier 2 (finished material/subcomponent manufacturers)'],
                    skipped: false,
                    ai_attempted: true,
                    ai_response: {
                      justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                      answer: ['Tier 1 (finished product manufacturers)', 'Tier 2 (finished material/subcomponent manufacturers)'],
                    },
                  },
                  'MFG-4': {
                    idx: 3,
                    prompt: 'Is your brand’s manufacturing code of conduct publicly available?',
                    options: [],
                    tooltip: '',
                    component: 'yes_no',
                    placeholder: '',
                    additional_context: {
                      prompt: 'Provide the hyperlink',
                      operator: '==',
                      component: 'textarea',
                      comparison: true,
                      placeholder: '',
                      value: 'https://www.google.com',
                    },
                    value: true,
                    skipped: false,
                    ai_attempted: true,
                    ai_response: {
                      justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                      answer: true,
                    },
                  },
                  'MFG-5': {
                    idx: 4,
                    prompt:
                      'Does your brand have a means of ensuring that your manufacturing code of conduct is aligned with internationally recognized best practices (e.g., periodic benchmarking to the Ethical Trading Initiative Base Code)?',
                    options: [],
                    tooltip: '',
                    component: 'yes_no',
                    placeholder: '',
                    value: true,
                    skipped: false,
                    ai_attempted: true,
                    ai_response: {
                      justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                      answer: false,
                    },
                  },
                  'MFG-6': {
                    idx: 5,
                    prompt: 'Does your brand have a means of verifying compliance with your manufacturing code of conduct?',
                    options: [],
                    tooltip: '',
                    component: 'yes_no',
                    placeholder: '',
                    additional_context: {
                      prompt: 'Please Describe',
                      tooltip: 'Limit your response to 100 words or less.',
                      operator: '==',
                      component: 'textarea',
                      comparison: true,
                      placeholder: '',
                      value: 'We have a team of 10 people who do this',
                    },
                    value: true,
                    skipped: false,
                    ai_attempted: true,
                    ai_response: {
                      justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                      answer: false,
                    },
                  },
                  'MFG-7': {
                    idx: 6,
                    prompt:
                      'Approximately what percentage of your supply chain has undergone, during the last calendar year, a social and/or environmental audit aimed at verifying compliance with your manufacturing code of conduct?',
                    options: [],
                    tooltip: 'Calculate as an estimated percentage of either (a) total number of active factories or (b) total dollars of first-cost production.',
                    component: 'textarea',
                    placeholder: '',
                    ai_attempted: true,
                    ai_response: {
                      justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                      answer: '10%',
                    },
                  },
                  'MFG-8': {
                    idx: 7,
                    prompt: 'Does your brand routinely collaborate with other brands to conduct shared social and/or environmental audits of your suppliers?',
                    options: [],
                    tooltip: 'Calculate as an estimated percentage of either (a) total number of active factories or (b) total dollars of first-cost production.',
                    component: 'yes_no',
                    placeholder: '',
                    ai_attempted: true,
                    ai_response: {
                      justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                      answer: false,
                    },
                  },
                  'MFG-9': {
                    idx: 8,
                    prompt: 'Is your brand’s supplier list publicly available?',
                    options: [],
                    tooltip: '',
                    component: 'yes_no',
                    placeholder: '',
                    additional_context: {
                      prompt: 'Provide the hyperlink',
                      operator: '==',
                      component: 'textarea',
                      comparison: true,
                      placeholder: '',
                    },
                    ai_attempted: true,
                    ai_response: {
                      justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                      answer: true,
                    },
                  },
                  'MFG-10': {
                    idx: 9,
                    prompt: 'Please indicate which tiers of your supply chain are represented on your supplier list.',
                    options: [
                      'Tier 1 (finished product manufacturers)',
                      'Tier 2 (finished material/subcomponent manufacturers)',
                      'Tier 3 (raw material processors)',
                      'Tier 4 (raw material suppliers)',
                    ],
                    tooltip: 'Select all that apply.',
                    component: 'multi_select',
                    placeholder: '',
                  },
                  'MFG-11': {
                    idx: 10,
                    prompt: 'Does your brand have a formal process for utilizing social and/or environmental performance data in sourcing decisions?',
                    options: [],
                    tooltip: '',
                    component: 'yes_no',
                    placeholder: '',
                  },
                  'MFG-12': {
                    idx: 11,
                    prompt: 'Does your brand have an ongoing training program(s) for suppliers to promote improved sustainability performance within your supply chain?',
                    options: [],
                    tooltip: '',
                    component: 'yes_no',
                    placeholder: '',
                  },
                },
                image_url:
                  'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
                category_idx: 0,
                category_description:
                  'As part of the REI Product Impact Standards, REI expects each brand partner to have in place a code of conduct that outlines the social and environmental standards to be upheld within their supply chain.',
              },
            },
            image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/General.png',
            intro_markdown:
              'Please complete the REI Manufacturing Code of Conduct survey to the best of your ability. If you have any questions, please contact your REI Merchandising contact.',
          },
        };
      }
      return res(ctx.json(survey));
    }),
  ],
  surveyComplete: [
    rest.get(getApiUrl('/compliance_definitions/organizations/:orgId'), (req, res, ctx) => {
      const compliance = getOrganizationComplianceMock();
      return res(ctx.json(compliance));
    }),
    rest.get(getApiUrl('/organizations/:orgId/surveys/:name'), (req, res, ctx) => {
      const { name } = req.params;
      let survey = getSurveyFormDataByName(name as string);
      if (name === 'rei_pkg_survey') {
        survey = {
          id: 'e85c4fb2-12dd-4be0-9027-5117c993e07f',
          name: 'rei_pkg_survey',
          type: 'TEST',
          description: '',
          created_at: '2024-01-17T17:51:59.384Z',
          updated_at: '2024-01-17T17:51:59.386Z',
          definition: {
            title: 'Packaging - General',
            sections: {
              PKG: {
                title: 'Packaging - General',
                prompt: '',
                component: null,
                follow_up: {
                  'PKG-1': {
                    idx: 0,
                    prompt: 'Does your brand have a formal policy/target in place regarding the use of more sustainable product packaging?',
                    options: [],
                    tooltip: '',
                    component: 'textarea',
                    placeholder: '',
                    ai_attempted: true,
                    ai_response: {
                      justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                      answer: 'We have a team of 10 people who do this',
                    },
                    value: 'We have a team of 10 people who do this',
                    skipped: false,
                  },
                  'PKG-2': {
                    idx: 1,
                    prompt: 'Has your brand been able to phase out the use of single-use plastics across any noteworthy areas of primary or secondary product packaging?',
                    options: [],
                    tooltip: '',
                    component: 'yes_no',
                    placeholder: '',
                    additional_context: {
                      prompt: 'Please describe the type of packaging phased out, the product category impacted and the alternative packaging used that avoids single-use plastics.',
                      tooltip: '',
                      operator: '==',
                      component: 'textarea',
                      comparison: true,
                      placeholder: '',
                    },
                    ai_attempted: true,
                    ai_response: {
                      justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                      answer: false,
                    },
                    value: true,
                    skipped: false,
                  },
                  'PKG-3': {
                    idx: 2,
                    prompt: 'Are there other best sustainability practices for primary product packaging that you have in place that you’d like to share with REI?',
                    options: [],
                    tooltip: '',
                    component: 'yes_no',
                    placeholder: '',
                    additional_context: {
                      prompt: 'Please describe.',
                      tooltip: '',
                      operator: '==',
                      component: 'textarea',
                      comparison: true,
                      placeholder: '',
                    },
                    ai_attempted: true,
                    ai_response: {
                      justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                    },
                    value: true,
                    skipped: false,
                  },
                  'PKG-4': {
                    idx: 3,
                    prompt:
                      'Are there any key resources or tools your brand has used to avoid the use of individual polybags or implement other packaging sustainability best practices that might be useful for other brands?',
                    options: [],
                    tooltip: '',
                    component: 'yes_no',
                    placeholder: '',
                    additional_context: {
                      prompt: 'Please describe.',
                      tooltip: '',
                      operator: '==',
                      component: 'textarea',
                      comparison: true,
                      placeholder: '',
                    },
                    ai_attempted: true,
                    ai_response: {
                      justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
                    },
                    value: true,
                    skipped: false,
                  },
                },
                image_url:
                  'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
                category_idx: 0,
                category_description: '',
              },
            },
            image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/splash_images/General.png',
            intro_markdown:
              'Please complete the REI Packaging - General survey below. This survey is intended to help REI understand your brand’s current efforts to reduce the environmental impact of your product packaging. Please complete this survey by October 1, 2021.',
          },
        };
      }
      return res(ctx.json(survey));
    }),
  ],
};

export const getDocumentListHandler = {
  default: [
    rest.get(getApiUrl('/organizations/:orgId/files'), (req, res, ctx) => {
      return res(ctx.json(getFilesWithCertificateClaimsMock()));
    }),

    rest.post(getApiUrl('/organizations/:orgId/files'), (req, res, ctx) => {
      return res(ctx.json({}), ctx.status(201));
    }),
  ],
  noFiles: [
    rest.get(getApiUrl('/organizations/:orgId/files'), (req, res, ctx) => {
      return res(ctx.json([]));
    }),

    rest.post(getApiUrl('/organizations/:orgId/files'), (req, res, ctx) => {
      return res(ctx.json({}), ctx.status(201));
    }),
  ],
};

export const getAssessmentsHandler = {
  default: [
    rest.get(getApiUrl('/compliance_definitions/organizations/:orgId'), (req, res, ctx) => {
      const compliance = getAssessmentsComplianceMock();
      return res(ctx.json(compliance));
    }),
    rest.get(getApiUrl('/organizations/:orgId/surveys/:name'), (req, res, ctx) => {
      const { name } = req.params;
      const survey = getAssessmentSurveyWithProgressMock(name as string);

      if (name === 'rei_pia_2024_2') survey.name = 'rei_pia_2024_2';

      return res(ctx.json(survey));
    }),
  ],
  single: [
    rest.get(getApiUrl('/compliance_definitions/organizations/:orgId'), (req, res, ctx) => {
      const compliance = getAssessmentsComplianceMock();
      return res(ctx.json([compliance[0]]));
    }),
    rest.get(getApiUrl('/organizations/:orgId/surveys/:name'), (req, res, ctx) => {
      const { name } = req.params;
      const survey = getAssessmentSurveyWithProgressMock(name as string);

      if (name === 'rei_pia_2024_2') survey.name = 'rei_pia_2024_2';

      return res(ctx.json(survey));
    }),
  ],
  empty: [
    rest.get(getApiUrl('/compliance_definitions/organizations/:orgId'), (req, res, ctx) => {
      return res(ctx.json([]));
    }),
  ],
  scoreBasedCompliance: [
    rest.get(getApiUrl('/compliance_definitions/organizations/:orgId'), (req, res, ctx) => {
      const complianceSet = getOrganizationComplianceMockByName('b_corp_2024');

      return res(ctx.json([complianceSet]));
    }),
    rest.get(getApiUrl('/organizations/:orgId/surveys/:name'), (req, res, ctx) => {
      const { name } = req.params;

      const survey = getAssessmentSurveyWithProgressMock(name as string);

      return res(ctx.json(survey));
    }),
  ],
};

export const getEmissionsOverviewCardHandler = {
  empty: [
    rest.get(getApiUrl('/organizations/:orgId/footprints'), (req, res, ctx) => {
      // return 404
      return res(ctx.status(404));
    }),
  ],
  singleYear: [
    rest.get(getApiUrl('/organizations/:orgId/footprints'), (req, res, ctx) => {
      return res(ctx.json(getSingleYearsEmissionMock()));
    }),
  ],
};

export const getComplianceSetOverviewHandler = {
  notActive: [
    rest.get(getApiUrl('/compliance_definitions/organizations/:orgId'), (req, res, ctx) => {
      const complianceSets = getOrganizationComplianceMock();
      return res(ctx.json(complianceSets.filter(c => c.compliance_definition.name !== 'b_corp_2024')));
    }),
  ],
  inProgress: [
    rest.get(getApiUrl('/compliance_definitions/organizations/:orgId'), (req, res, ctx) => {
      const complianceSets = getOrganizationComplianceMock();
      return res(ctx.json(complianceSets));
    }),
    rest.get(getApiUrl('/organizations/:orgId/surveys/:name'), (req, res, ctx) => {
      const survey = getSurveyFormDataByName('b_corp_2024') as ComplianceSurveyPayloadType;
      return res(
        ctx.json({
          ...survey,
          progress: {
            ...survey.progress,
            questions_answered: 0,
          },
        }),
      );
    }),
  ],
  inProgress50Percent: [
    rest.get(getApiUrl('/compliance_definitions/organizations/:orgId'), (req, res, ctx) => {
      const complianceSets = getOrganizationComplianceMock();
      return res(ctx.json(complianceSets));
    }),
    rest.get(getApiUrl('/organizations/:orgId/surveys/:name'), (req, res, ctx) => {
      const survey = getSurveyFormDataByName('b_corp_2024') as ComplianceSurveyPayloadType;
      return res(
        ctx.json({
          ...survey,
          progress: {
            ...survey.progress,
            percentage: 50,
            questions_answered: 108,
            question_count: 216,
          },
        }),
      );
    }),
  ],
  inProgress100Percent: [
    rest.get(getApiUrl('/compliance_definitions/organizations/:orgId'), (req, res, ctx) => {
      const complianceSets = getOrganizationComplianceMock();
      return res(ctx.json(complianceSets));
    }),
    rest.get(getApiUrl('/organizations/:orgId/surveys/:name'), (req, res, ctx) => {
      const survey = getSurveyFormDataByName('b_corp_2024') as ComplianceSurveyPayloadType;
      return res(
        ctx.json({
          ...survey,
          progress: {
            ...survey.progress,
            questions_answered: survey.progress.question_count,
          },
        }),
      );
    }),
  ],
  submittedByUser: [
    rest.get(getApiUrl('/compliance_definitions/organizations/:orgId'), (req, res, ctx) => {
      const complianceSets = getOrganizationComplianceMock();
      return res(ctx.json(complianceSets));
    }),
    rest.get(getApiUrl('/organizations/:orgId/surveys/:name'), (req, res, ctx) => {
      const survey = getSurveyFormDataByName('b_corp_2024') as ComplianceSurveyPayloadType;
      set(survey, 'status.0', {
        name: 'user_submitted',
        date: '2024-01-17T17:36:53.231Z',
      });
      return res(
        ctx.json({
          ...survey,
          progress: {
            ...survey.progress,
            questions_answered: survey.progress.question_count,
          },
        }),
      );
    }),
  ],
  submittedByCold: [
    rest.get(getApiUrl('/compliance_definitions/organizations/:orgId'), (req, res, ctx) => {
      const complianceSets = getOrganizationComplianceMock();
      return res(ctx.json(complianceSets));
    }),
    rest.get(getApiUrl('/organizations/:orgId/surveys/:name'), (req, res, ctx) => {
      const survey = getSurveyFormDataByName('b_corp_2024') as ComplianceSurveyPayloadType;
      set(survey, 'status.0', {
        name: 'cold_submitted',
        date: '2024-01-17T17:36:53.231Z',
      });
      return res(
        ctx.json({
          ...survey,
          progress: {
            ...survey.progress,
            questions_answered: survey.progress.question_count,
          },
        }),
      );
    }),
  ],
  withDueDate: [
    rest.get(getApiUrl('/compliance_definitions'), (req, res, ctx) => {
      const complianceSets = getComplianceMock();
      // find rei_pia_2024 compliance set and set due date to 30 days from now
      const reiPia2024 = complianceSets.find(c => c.name === 'rei_pia_2024');
      if (reiPia2024) {
        set(reiPia2024, 'metadata.due_date', addDays(new Date(), 30).toString());
        const index = complianceSets.findIndex(c => c.name === 'rei_pia_2024');
        complianceSets[index] = reiPia2024;
      }
      return res(ctx.json(complianceSets));
    }),
    rest.get(getApiUrl('/organizations/:orgId/surveys/:name'), (req, res, ctx) => {
      const survey = getSurveyFormDataByName('b_corp_2024') as ComplianceSurveyPayloadType;
      return res(
        ctx.json({
          ...survey,
          progress: {
            ...survey.progress,
            questions_answered: survey.progress.question_count,
          },
        }),
      );
    }),
  ],
  withNearDueDate: [
    rest.get(getApiUrl('/compliance_definitions'), (req, res, ctx) => {
      const complianceSets = getComplianceMock();
      // find rei_pia_2024 compliance set and set due date to 30 days from now
      const reiPia2024 = complianceSets.find(c => c.name === 'rei_pia_2024');
      if (reiPia2024) {
        set(reiPia2024, 'metadata.due_date', addDays(new Date(), 5).toString());
        const index = complianceSets.findIndex(c => c.name === 'rei_pia_2024');
        complianceSets[index] = reiPia2024;
      }
      return res(ctx.json(complianceSets));
    }),
    rest.get(getApiUrl('/organizations/:orgId/surveys/:name'), (req, res, ctx) => {
      const survey = getSurveyFormDataByName('b_corp_2024') as ComplianceSurveyPayloadType;
      return res(
        ctx.json({
          ...survey,
          progress: {
            ...survey.progress,
            questions_answered: survey.progress.question_count,
          },
        }),
      );
    }),
  ],
  withNearDueDateButSubmitted: [
    rest.get(getApiUrl('/compliance_definitions'), (req, res, ctx) => {
      const complianceSets = getComplianceMock();
      const reiPia2024 = complianceSets.find(c => c.name === 'rei_pia_2024');
      if (reiPia2024) {
        set(reiPia2024, 'metadata.due_date', addDays(new Date(), 5).toString());
        const index = complianceSets.findIndex(c => c.name === 'rei_pia_2024');
        complianceSets[index] = reiPia2024;
      }
      return res(ctx.json(complianceSets));
    }),
    rest.get(getApiUrl('/organizations/:orgId/surveys/:name'), (req, res, ctx) => {
      const survey = getSurveyFormDataByName('b_corp_2024') as ComplianceSurveyPayloadType;
      set(survey, 'status.0', {
        name: 'cold_submitted',
        date: '2024-01-17T17:36:53.231Z',
      });
      return res(
        ctx.json({
          ...survey,
          progress: {
            ...survey.progress,
            percentage: 100,
          },
        }),
      );
    }),
  ],
};
