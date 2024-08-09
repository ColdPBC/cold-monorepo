import { rest } from 'msw';
import { getSidebarMock } from './sidebarMock';
import { getCategoriesDataMock, getFootprintDataMock } from './categoriesMock';
import {
  getDataGridCompaniesMock,
  getDataGridUsersMock,
  getDefaultFormDataGridMock,
  getDefaultFormDefinitionGridMock,
  getOrganizationMembersMock,
  getTeamMemberDataGridMock,
} from './datagridMock';
import { getSurveyFormDataByName, getSurveysMock } from './surveyDataMock';
import { getRoles } from './roleMock';
import { resolveAPIUrl } from '@coldpbc/fetchers';
import { getOrganizationMock, getOrganizationsMock } from './organizationMock';
import { getPoliciesSignedMock, getPolicyMockByName } from './policyMock';
import { auth0UserMock } from './userMock';
import { getNewsDefault } from './newsMock';
import { getActionMock, getActionsMock } from './action';
import { v4 as uuidv4 } from 'uuid';
import {
  getAllComplianceMocks,
  getComplianceCountsMock,
  getComplianceMock,
  getComplianceMockByName,
  getOrganizationComplianceMock,
  getOrganizationComplianceMockByName,
  getQuestionAIDetailsMock,
  getQuestionnaireContainerMock,
  getQuestionnaireSidebarComplianceMock,
} from './complianceMock';
import { getDocumentsListTableMock } from './componentMock';
import { getFilesWithCertificateClaimsMock } from './filesMock';
import { returnUpdatedSurvey } from './helpers';
import { ComplianceSurveyPayloadType } from '@coldpbc/interfaces';
import { getDefaultEmissionMock } from './emissionMocks';
import { getNotesMock } from './notesMock';
import { getClaimsMock, getSupplierClaimsMock } from './claimsMock';
import { getSupplierMockById, getSupplierWithCertificationClaimsMock } from './suppliersMock';
import { getMaterialsMock } from './materialsMock';

// Even if this uses vite as a bundler, it still uses the NODE_ENV variable
export const getApiUrl = (path: string) => {
  return `${resolveAPIUrl()}${path}`;
};

export const handlers = [
  /*
     How To Test Your Components Against The API:
     in order to test these requests against the actual api, you will need to run the api locally, and then change the
     url path of the mock below so that it doesn't match the url path you are requesting in your component.

     For example:
     if you are requesting '/components/sidebar_navigation', and you want to see that it works with the API
     then you will need to change the url path below to something like '/components/sidebar_navigations_disable'.
     then you can paste a valid accessToken in the textbox in storybook, and it should authenticate to the API and return the data.

     this is useful if you want to make sure your mocks match what the API is returning.
     */

  //Mock SideBar Request
  rest.get(getApiUrl('/components/sidebar_navigation'), (req, res, ctx) => {
    return res(ctx.json({ ...getSidebarMock() }));
  }),

  // Mock data for journey modules
  rest.get(getApiUrl('/organizations/:orgId/categories'), (req, res, ctx) => {
    return res(ctx.json({ ...getCategoriesDataMock() }));
  }),

  // Mock data for footprint modules
  rest.get(getApiUrl('/organizations/:orgId/categories/company_decarbonization'), (req, res, ctx) => {
    return res(ctx.json({ ...getFootprintDataMock() }));
  }),

  rest.get(getApiUrl('/company-users'), (req, res, ctx) => {
    return res(ctx.json(getDataGridUsersMock()));
  }),

  rest.get(getApiUrl('/components/team_member_table'), (req, res, ctx) => {
    return res(ctx.json(getTeamMemberDataGridMock()));
  }),

  rest.get(getApiUrl('/components/datagrid'), (req, res, ctx) => {
    return res(ctx.json(getDefaultFormDefinitionGridMock()));
  }),

  rest.get(getApiUrl('/data/datagrid'), (req, res, ctx) => {
    return res(ctx.json({ ...getDefaultFormDataGridMock() }));
  }),

  rest.post(getApiUrl('/invites'), (req, res, ctx) => {
    return res(ctx.json({}));
  }),

  rest.delete(getApiUrl('/invites/:id'), (req, res, ctx) => {
    return res(ctx.json({ ...getDefaultFormDataGridMock() }));
  }),

  rest.get(getApiUrl('/companies/:id'), (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.json({ ...getDataGridCompaniesMock(id as string) }));
  }),

  rest.get(getApiUrl('/organizations/:orgId'), (req, res, ctx) => {
    const { orgId } = req.params;
    return res(ctx.json({ ...getOrganizationMock() }));
  }),

  rest.get(getApiUrl('/organizations'), (req, res, ctx) => {
    return res(ctx.json(getOrganizationsMock()));
  }),

  rest.get(getApiUrl('/organizations/:orgId/members'), (req, res, ctx) => {
    const { orgId } = req.params;
    const mock = getOrganizationMembersMock();
    return res(ctx.json({ ...getOrganizationMembersMock() }));
  }),

  rest.put(getApiUrl('/organizations/:orgId/roles/:roleName/members/:userId'), async (req, res, ctx) => {
    const { orgId, roleName, userId } = req.params;
    return res(
      ctx.json({
        ...getOrganizationMembersMock(),
        members: getOrganizationMembersMock().members.map(member => {
          if (member.user_id === userId) {
            member.role = roleName as string;
          }
          return member;
        }),
      }),
    );
  }),

  rest.delete(getApiUrl('/organizations/:orgId/members'), async (req, res, ctx) => {
    return res(ctx.json({}));
  }),

  rest.delete(getApiUrl('/organizations/:orgId/invitations/:userId'), async (req, res, ctx) => {
    return res(ctx.json({}));
  }),

  rest.post(getApiUrl('/organizations/:orgId/invitation'), async (req, res, ctx) => {
    const data = req.body as {
      user_email: string;
      inviter_name: string;
      roleId: string;
    };
    const { orgId } = req.params;

    try {
      const { user_email, inviter_name, roleId } = data;
      return res(
        ctx.json({
          id: uuidv4(),
          client_id: 'i8rCPXsLq9b2YKOOWUTfvgUj0iYD7dE3',
          inviter: {
            name: inviter_name,
          },
          invitee: {
            email: user_email,
          },
          invitation_url: '',
          ticket_id: 'KpfUpW3PE6GwqgNsLUlLfwdkZS4373XO',
          created_at: new Date().toISOString(),
          expires_at: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          organization_id: orgId,
          roles: [roleId],
        }),
      );
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      return res(ctx.status(500), ctx.json({ message: message }));
    }
  }),

  rest.post(getApiUrl('/resources/:name'), async (req, res, ctx) => {
    return res(ctx.json({}));
  }),

  rest.get(getApiUrl('/roles'), async (req, res, ctx) => {
    return res(ctx.json(getRoles()));
  }),

  rest.get(getApiUrl('/organizations/:orgId/surveys/:name'), (req, res, ctx) => {
    const { name } = req.params;

    return res(ctx.json(getSurveyFormDataByName(name as string)));
  }),

  rest.put(getApiUrl('/organizations/:orgId/surveys/:name'), async (req, res, ctx) => {
    const response = await req.json();
    const surveys = getSurveysMock() as ComplianceSurveyPayloadType[];
    const updatedSurvey = returnUpdatedSurvey(response, surveys);
    return res(ctx.json(updatedSurvey));
  }),

  rest.patch(getApiUrl(`/members/:emailOrId`), (req, res, ctx) => {
    return res(ctx.json({}));
  }),

  rest.post(getApiUrl(`/organizations`), (req, res, ctx) => {
    const body = req.body as {
      name: string;
    };
    return res(ctx.json({}));
  }),

  rest.post(getApiUrl(`/policies/:id/signed`), (req, res, ctx) => {
    const body = req.body as {
      name: string;
    };
    return res(ctx.json({}));
  }),

  rest.get(getApiUrl('/policies/signed/user'), (req, res, ctx) => {
    return res(ctx.json(getPoliciesSignedMock()));
  }),

  rest.get(getApiUrl('/policies/:name'), (req, res, ctx) => {
    const name = req.params.name as string;
    return res(ctx.json(getPolicyMockByName(name)));
  }),

  rest.get(getApiUrl('/members/:emailOrId'), (req, res, ctx) => {
    return res(ctx.json(auth0UserMock));
  }),

  rest.get(getApiUrl('/news'), (req, res, ctx) => {
    return res(ctx.json(getNewsDefault()));
  }),

  rest.get(getApiUrl('/organizations/:orgId/actions'), (req, res, ctx) => {
    return res(ctx.json([...getActionsMock()]));
  }),

  rest.get(getApiUrl('/organizations/:orgId/actions/:id'), (req, res, ctx) => {
    return res(ctx.json({ ...getActionMock() }));
  }),

  rest.patch(getApiUrl('/organizations/:orgId/actions/:actionId'), (req, res, ctx) => {
    return res(ctx.json({}));
  }),

  rest.get(getApiUrl('/organizations/:orgId/surveys'), (req, res, ctx) => {
    return res(ctx.json(getSurveysMock()));
  }),

  rest.get(getApiUrl('/compliance_definitions'), (req, res, ctx) => {
    return res(ctx.json(getComplianceMock()));
  }),

  rest.get(getApiUrl('/compliance_definitions/organizations/:orgId'), (req, res, ctx) => {
    return res(ctx.json(getOrganizationComplianceMock()));
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

  rest.get(getApiUrl('/components/documents_list_table'), (req, res, ctx) => {
    return res(ctx.json(getDocumentsListTableMock()));
  }),

  rest.get(getApiUrl('/organizations/:orgId/files'), (req, res, ctx) => {
    return res(ctx.json(getFilesWithCertificateClaimsMock()));
  }),

  rest.post(getApiUrl('/organizations/:orgId/files'), (req, res, ctx) => {
    return res(ctx.json({}), ctx.status(201));
  }),

  rest.get(getApiUrl('/organizations/:orgId/footprints'), (req, res, ctx) => {
    return res(ctx.json(getDefaultEmissionMock()));
  }),

  rest.get(getApiUrl('/compliance/:complianceName/organizations/:orgId/section_groups/responses'), (req, res, ctx) => {
    return res(ctx.json(getQuestionnaireSidebarComplianceMock()));
  }),

  rest.get(getApiUrl('/compliance/:name/organizations/:orgId/section_groups/:sectionGroupId/sections/:sectionId/responses'), (req, res, ctx) => {
    // get query params from url
    const { name, orgId, sectionGroupId, sectionId } = req.params as {
      name: string;
      orgId: string;
      sectionGroupId: string;
      sectionId: string;
    };
    const responses = req.url.searchParams.get('responses') as string;
    const responsesBool = responses === 'true';
    return res(ctx.json(getQuestionnaireContainerMock(sectionGroupId, sectionId)));
  }),

  // delete compliance question bookmark
  rest.delete(getApiUrl('/compliance/:name/organizations/:orgId/questions/:id/bookmarks'), (req, res, ctx) => {
    // return 200 status code
    return res(ctx.status(200));
  }),

  // create compliance question bookmark
  rest.post(getApiUrl('/compliance/:name/organizations/:orgId/questions/:id/bookmarks'), (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  // answer compliance question in questionnaire
  rest.put(getApiUrl('/compliance/:name/organizations/:orgId/section_groups/:sectionGroupId/sections/:sectionId/questions/:id/responses'), (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get(getApiUrl('/compliance/:name/organizations/:orgId/questions/:id/notes'), (req, res, ctx) => {
    const { name, orgId, id } = req.params as { name: string; orgId: string; id: string };

    return res(ctx.json(getNotesMock(id)));
  }),

  // POST /compliance/${name}/organizations/${orgId}/questions/${focusQuestion?.key}/notes
  rest.post(getApiUrl('/compliance/:name/organizations/:orgId/questions/:id/notes'), (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  // PATCH /compliance/${name}/organizations/${orgId}/questions/${focusQuestion?.key}/notes/${firstNote.id}
  rest.patch(getApiUrl('/compliance/:name/organizations/:orgId/questions/:id/notes/:noteId'), (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  // delete compliance question response
  rest.delete(getApiUrl('/compliance/:name/organizations/:orgId/section_groups/:sectionGroupId/sections/:sectionId/questions/:id/responses'), (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get(getApiUrl('/compliance/:name/organizations/:orgId/responses/counts'), (req, res, ctx) => {
    return res(ctx.json(getComplianceCountsMock()));
  }),

  rest.get(getApiUrl('/compliance/all/organizations/:orgId'), (req, res, ctx) => {
    return res(ctx.json(getAllComplianceMocks()));
  }),

  rest.get(getApiUrl('/compliance/:name'), (req, res, ctx) => {
    const name = req.params.name as string;
    return res(ctx.json(getComplianceMockByName(name)));
  }),

  rest.get(getApiUrl('/compliance/:name/organizations/:orgId/section_groups/:sectionGroupId/sections/:sectionId/questions/:questionId/responses'), (req, res, ctx) => {
    const { name, orgId, sectionGroupId, sectionId, questionId } = req.params as {
      name: string;
      orgId: string;
      sectionGroupId: string;
      sectionId: string;
      questionId: string;
    };
    return res(ctx.json(getQuestionAIDetailsMock(sectionGroupId, sectionId, questionId)));
  }),

  rest.get(getApiUrl('/claims'), (req, res, ctx) => {
    return res(ctx.json(getClaimsMock()));
  }),

  rest.get(getApiUrl('/organizations/:orgId/suppliers'), (req, res, ctx) => {
    return res(ctx.json(getSupplierWithCertificationClaimsMock()));
  }),

  rest.get(getApiUrl('/organizations/:orgId/suppliers/claims/names'), (req, res, ctx) => {
    return res(ctx.json(getSupplierClaimsMock()));
  }),

  rest.get(getApiUrl('/organizations/:orgId/suppliers/:id'), (req, res, ctx) => {
    const { orgId, id } = req.params as { orgId: string; id: string };
    return res(ctx.json(getSupplierMockById(id)));
  }),

  rest.patch(getApiUrl('/organizations/:orgId/files/:fileId'), (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.delete(getApiUrl('/organizations/:orgId/files/:fileId'), (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.post(getApiUrl('/compliance/:name/organizations/:orgId'), (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get(getApiUrl('/organizations/:orgId/materials'), (req, res, ctx) => {
    return res(ctx.json(getMaterialsMock()));
  }),
];
