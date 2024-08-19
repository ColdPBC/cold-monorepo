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
import { ActionPayload } from '@coldpbc/interfaces';
import { getOrganizationMembersMock } from './datagridMock';
import { getFilesWithCertificateClaimsMock } from './filesMock';
import { getApiUrl } from './handlers';
import { getSingleYearsEmissionMock } from './emissionMocks';

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
