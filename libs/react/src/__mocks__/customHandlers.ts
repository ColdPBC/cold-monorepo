import { http, HttpResponse } from 'msw';
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
import { ActionPayload } from '@coldpbc/interfaces';
import { getOrganizationMembersMock } from './datagridMock';
import { getFilesWithCertificateClaimsMock } from './filesMock';
import { getApiUrl } from './_default/handlers';
import { getSingleYearsEmissionMock } from './emissionMocks';

export const getFootprintHandler = {
  default: http.get('*/organizations/:orgId/categories/company_decarbonization', ({ request, params, cookies }) => {
    return HttpResponse.json(getFootprintDataMock());
  }),
  handle404: http.get('*/organizations/:orgId/categories/company_decarbonization', ({ request, params, cookies }) => {
    return HttpResponse.json({}, { status: 404 });
  }),
  empty: http.get('*/organizations/:orgId/categories/company_decarbonization', ({ request, params, cookies }) => {
    return HttpResponse.json(getFootprintEmptyDataMock());
  }),
  getFootprintDataFacilitiesAllFootprintsNull: http.get('*/organizations/:orgId/categories/company_decarbonization', ({ request, params, cookies }) => {
    return HttpResponse.json(getFootprintDataFacilitiesAllFootprintsNull());
  }),
  fiveSubCats: http.get('*/organizations/:orgId/categories/company_decarbonization', ({ request, params, cookies }) => {
    return HttpResponse.json(getFootprintDataMockFiveSubCats());
  }),
  twoSubCats: http.get('*/organizations/:orgId/categories/company_decarbonization', ({ request, params, cookies }) => {
    return HttpResponse.json(getFootprintDataMockTwoSubCats());
  }),
  threeSubCats: http.get('*/organizations/:orgId/categories/company_decarbonization', ({ request, params, cookies }) => {
    return HttpResponse.json(getFootprintDataMockThreeSubCats());
  }),
  allNullFootprintValues: http.get('*/organizations/:orgId/categories/company_decarbonization', ({ request, params, cookies }) => {
    return HttpResponse.json(getFootprintAllNullFootprintValues());
  }),
};

export const getCategoriesHandler = {
  default: http.get('*/organizations/:orgId/categories', ({ request, params, cookies }) => {
    return HttpResponse.json(getCategoriesDataMock());
  }),
  handle404: http.get('*/organizations/:orgId/categories', ({ request, params, cookies }) => {
    return HttpResponse.json({}, { status: 404 });
  }),
  empty: http.get('*/organizations/:orgId/categories', ({ request, params, cookies }) => {
    return HttpResponse.json(getCategoriesEmptyDataMock());
  }),
};

export const getMembersHandler = {
  noInvitations: http.get('*/organizations/*/members', ({ request, params, cookies }) => {
    return HttpResponse.json(getMembersNoInvitations());
  }),
};

export const getNewsHandler = {
  default: http.get('*/news', ({ request, params, cookies }) => {
    return HttpResponse.json(getNewsDefault());
  }),
  empty: http.get('*/news', ({ request, params, cookies }) => {
    return HttpResponse.json([]);
  }),
  allMissingProperties: http.get('*/news', ({ request, params, cookies }) => {
    return HttpResponse.json(getNewsAllMissingProperties());
  }),
  someMissingProperties: http.get('*/news', ({ request, params, cookies }) => {
    return HttpResponse.json(getNewsSomeMissingProperties());
  }),
  fourNewsItems: http.get('*/news', ({ request, params, cookies }) => {
    return HttpResponse.json([...getNewsDefault(), ...getNewsDefault()]);
  }),
};

export const getActionHandler = {
  default: http.get('*/organizations/*/actions/*', ({ request, params, cookies }) => {
    return HttpResponse.json(getActionMock());
  }),
  noResources: http.get('*/organizations/*/actions/*', ({ request, params, cookies }) => {
    return HttpResponse.json(getActionMockNoResources());
  }),
  allStepsComplete: http.get('*/organizations/*/actions/*', ({ request, params, cookies }) => {
    return HttpResponse.json(getActionAllStepsComplete());
  }),
  subcategoryActionDetailsCard: [
    http.patch('*/organizations/*/actions/:actionId', ({ request, params, cookies }) => {
      return HttpResponse.json({});
    }),
  ],
  subCategoryActionsList: [
    http.patch('*/organizations/*/actions/:actionId', ({ request, params, cookies }) => {
      return HttpResponse.json({});
    }),
    http.get('*/organizations/*/actions', ({ request, params, cookies }) => {
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
      return HttpResponse.json(actions);
    }),
  ],
  noDueDateSet: http.get('*/organizations/*/actions/*', ({ request, params, cookies }) => {
    return HttpResponse.json(getActionNoDueDateSet());
  }),
  subCategoryActionsListActionsStarted: [
    http.patch('*/organizations/*/actions/:actionId', ({ request, params, cookies }) => {
      return HttpResponse.json({});
    }),
    http.get('*/organizations/*/actions', ({ request, params, cookies }) => {
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
      return HttpResponse.json(actions);
    }),
  ],
  usersAssigned: http.get('*/organizations/*/actions/*', ({ request, params, cookies }) => {
    // set action assignees and some step assignees
    const members = getOrganizationMembersMock().members;
    return HttpResponse.json({
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
    } as ActionPayload);
  }),
  subcategoryActionsOverviewCard: [
    http.get('*/organizations/*/actions', ({ request, params, cookies }) => {
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
      return HttpResponse.json(actions);
    }),
  ],
  actionsOverview: [
    http.get('*/organizations/*/actions', ({ request, params, cookies }) => {
      const actions = getActionsMock().map((actionPayload, index) => {
        // set all the surveys to submitted and ready to execute to true
        actionPayload.action.dependent_surveys.forEach(survey => {
          survey.submitted = true;
        });
        actionPayload.action.ready_to_execute = true;
        return actionPayload;
      });
      return HttpResponse.json(actions);
    }),
  ],
};

export const getDocumentListHandler = {
  default: [
    http.get(getApiUrl('/organizations/:orgId/files'), ({ request, params, cookies }) => {
      return HttpResponse.json(getFilesWithCertificateClaimsMock());
    }),

    http.post(getApiUrl('/organizations/:orgId/files'), ({ request, params, cookies }) => {
      return HttpResponse.json({}, { status: 201 });
    }),
  ],
  noFiles: [
    http.get(getApiUrl('/organizations/:orgId/files'), ({ request, params, cookies }) => {
      return HttpResponse.json([]);
    }),

    http.post(getApiUrl('/organizations/:orgId/files'), ({ request, params, cookies }) => {
      return HttpResponse.json({}, { status: 201 });
    }),
  ],
};

export const getEmissionsOverviewCardHandler = {
  empty: [
    http.get(getApiUrl('/organizations/:orgId/footprints'), ({ request, params, cookies }) => {
      return HttpResponse.json({}, { status: 404 });
    }),
  ],
  singleYear: [
    http.get(getApiUrl('/organizations/:orgId/footprints'), ({ request, params, cookies }) => {
      return HttpResponse.json(getSingleYearsEmissionMock());
    }),
  ],
};
