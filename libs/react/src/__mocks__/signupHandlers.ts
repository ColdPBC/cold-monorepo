import { http, HttpResponse } from 'msw';
import { getEmptyPoliciesSignedMock, getPolicyMockByName } from './policyMock';
import { getApiUrl } from './_default/handlers';
import { auth0UserMock } from './userMock';
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
import { getOrganizationMock } from './organizationMock';
import { changeUserRoles, deleteUserInvitation, removeUserFromOrganization, resendInvitation, sendInvitation } from './helpers/helper';
import { getRoles } from './roleMock';
import { getSurveyFormDataByName } from './surveyDataMock';

export const getSignUpHandler = {
  DEFAULT: [
    http.patch(`*/members/:emailOrId`, async ({ request, params, cookies }) => {
      return HttpResponse.json({
        ...auth0UserMock,
        given_name: null,
        family_name: null,
      });
    }),
    http.post(`*/organizations`, async ({ request, params, cookies }) => {
      const body = (await request.json()) as {
        display_name: string;
      };
      return HttpResponse.json({
        ...getOrganizationMock(),
        display_name: body.display_name,
      });
    }),
    http.post(`*/policies/:id/signed`, async ({ request, params, cookies }) => {
      const body = (await request.json()) as {
        name: string;
      };
      return HttpResponse.json({});
    }),
    http.get('*/policies/signed/user', async ({ request, params, cookies }) => {
      return HttpResponse.json(getEmptyPoliciesSignedMock());
    }),
    http.get('*/policies/:name', async ({ request, params, cookies }) => {
      const name = params.name as string;
      return HttpResponse.json(getPolicyMockByName(name));
    }),
    http.get('*/members/:emailOrId', async ({ request, params, cookies }) => {
      const emailOrId = params.emailOrId as string;
      return HttpResponse.json({
        ...auth0UserMock,
        given_name: null,
        family_name: null,
      });
    }),
  ],
  newCompanyAndUser: [
    http.patch(`*/members/:emailOrId`, async ({ request, params, cookies }) => {
      return HttpResponse.json({
        ...auth0UserMock,
        given_name: null,
        family_name: null,
      });
    }),
    http.post(`*/organizations`, async ({ request, params, cookies }) => {
      const body = (await request.json()) as {
        display_name: string;
      };
      return HttpResponse.json({
        ...getOrganizationMock(),
        display_name: body.display_name,
      });
    }),
    http.post(`*/policies/:id/signed`, async ({ request, params, cookies }) => {
      const body = (await request.json()) as {
        name: string;
      };
      return HttpResponse.json({});
    }),
    http.get('*/policies/signed/user', async ({ request, params, cookies }) => {
      return HttpResponse.json(getEmptyPoliciesSignedMock());
    }),
    http.get('*/policies/:name', async ({ request, params, cookies }) => {
      const name = params.name as string;
      return HttpResponse.json(getPolicyMockByName(name));
    }),
    http.get('*/members/:emailOrId', async ({ request, params, cookies }) => {
      const emailOrId = params.emailOrId as string;
      return HttpResponse.json({
        ...auth0UserMock,
        given_name: 'null',
        family_name: 'null',
      });
    }),
  ],
  server500Error: [
    http.patch(`*/members/:emailOrId`, async ({ request, params, cookies }) => {
      return HttpResponse.json({
        ...auth0UserMock,
        given_name: 'null',
        family_name: 'null',
      });
    }),
    http.post(`*/organizations`, async ({ request, params, cookies }) => {
      const body = (await request.json()) as {
        display_name: string;
      };
      return HttpResponse.json({}, { status: 500 });
    }),
    http.post(`*/policies/:id/signed`, async ({ request, params, cookies }) => {
      const body = (await request.json()) as {
        name: string;
      };
      return HttpResponse.json({}, { status: 500 });
    }),
    http.get('*/policies/signed/user', async ({ request, params, cookies }) => {
      return HttpResponse.json(getEmptyPoliciesSignedMock());
    }),
    http.get('*/policies/:name', async ({ request, params, cookies }) => {
      const name = params.name as string;
      return HttpResponse.json(getPolicyMockByName(name));
    }),
    http.get('*/members/:emailOrId', async ({ request, params, cookies }) => {
      const emailOrId = params.emailOrId as string;
      return HttpResponse.json({
        ...auth0UserMock,
        given_name: null,
        family_name: null,
      });
    }),
  ],
};

export const getSignupHandlersForApplicationSignup = {
  DEFAULT: [
    [
      http.get(getApiUrl('/components/sidebar_navigation'), async ({ request, params, cookies }) => {
        return HttpResponse.json({ ...getSidebarMock() });
      }),

      // Mock data for journey modules
      http.get(getApiUrl('/categories'), async ({ request, params, cookies }) => {
        return HttpResponse.json({ ...getCategoriesDataMock() });
      }),

      // Mock data for footprint modules
      http.get(getApiUrl('/categories/company_decarbonization'), async ({ request, params, cookies }) => {
        return HttpResponse.json({ ...getFootprintDataMock() });
      }),

      http.get(getApiUrl('/company-users'), async ({ request, params, cookies }) => {
        return HttpResponse.json(getDataGridUsersMock());
      }),

      http.get(getApiUrl('/components/team_member_table'), async ({ request, params, cookies }) => {
        return HttpResponse.json(getTeamMemberDataGridMock());
      }),

      http.get(getApiUrl('/components/datagrid'), async ({ request, params, cookies }) => {
        return HttpResponse.json(getDefaultFormDefinitionGridMock());
      }),

      http.get(getApiUrl('/data/datagrid'), async ({ request, params, cookies }) => {
        return HttpResponse.json({ ...getDefaultFormDataGridMock() });
      }),

      http.post(getApiUrl('/invites'), async ({ request, params, cookies }) => {
        return HttpResponse.json({});
      }),

      http.delete(getApiUrl('/invites/:id'), async ({ request, params, cookies }) => {
        return HttpResponse.json({ ...getDefaultFormDataGridMock() });
      }),

      http.get(getApiUrl('/companies/:id'), async ({ request, params, cookies }) => {
        const { id } = params;
        return HttpResponse.json({ ...getDataGridCompaniesMock(id as string) });
      }),

      http.get(getApiUrl('/organizations/:orgId'), async ({ request, params, cookies }) => {
        const { orgId } = params;
        return HttpResponse.json({ ...getOrganizationMock() });
      }),

      http.get(getApiUrl('/organizations/:orgId/members'), async ({ request, params, cookies }) => {
        const { orgId } = params;
        const mock = getOrganizationMembersMock();
        return HttpResponse.json({ ...getOrganizationMembersMock() });
      }),

      http.post(getApiUrl('/organizations/:orgId/members/:userId/role/:roleName'), async ({ request, params, cookies }) => {
        const { orgId, userId, roleName } = params;
        await changeUserRoles(orgId as string, userId as string, roleName as string);
        return HttpResponse.json({});
      }),

      http.delete(getApiUrl('/organizations/:orgId/member'), async ({ request, params, cookies }) => {
        const { orgId } = params;
        let data: { members: string[] };
        if (await request.json()) {
          data = (await request.json()) as { members: string[] };
          await removeUserFromOrganization(data.members, orgId as string);
        }
        return HttpResponse.json({});
      }),

      http.delete(getApiUrl('/organizations/:orgId/invitation'), async ({ request, params, cookies }) => {
        let data: {
          org_id: string;
          user_email: string;
        };
        const body = await request.json();
        if (body) {
          data = body as {
            org_id: string;
            user_email: string;
          };
          await deleteUserInvitation(data.org_id, data.user_email);
        }
        return HttpResponse.json({});
      }),

      http.post(getApiUrl('/organizations/:orgId/invitation'), async ({ request, params, cookies }) => {
        const data = (await request.json()) as {
          org_id: string;
          user_email: string;
          inviter_name: string;
          roleId: string;
        };
        try {
          if (data) {
            const { org_id, user_email, inviter_name, roleId } = data;
            await sendInvitation(org_id, user_email, inviter_name, roleId);
          }
          return HttpResponse.json({});
        } catch (error) {
          let message;
          if (error instanceof Error) message = error.message;
          else message = String(error);
          return HttpResponse.json({ message: message }, { status: 500 });
        }
      }),

      http.patch(getApiUrl('/organizations/:orgId/invitation'), async ({ request, params, cookies }) => {
        const data = (await request.json()) as {
          org_id: string;
          user_email: string;
          inviter_name: string;
          roleId: string;
        };
        if (data) {
          const { org_id, user_email, inviter_name, roleId } = data;
          await resendInvitation(org_id, user_email);
        }
        return HttpResponse.json({});
      }),

      http.post(getApiUrl('/resources/:name'), async ({ request, params, cookies }) => {
        return HttpResponse.json({});
      }),

      http.get(getApiUrl('/roles'), async ({ request, params, cookies }) => {
        return HttpResponse.json(getRoles());
      }),

      http.get(getApiUrl('/organizations/:orgId/surveys/:name'), async ({ request, params, cookies }) => {
        const { name } = params;

        return HttpResponse.json(getSurveyFormDataByName(name as string));
      }),

      http.put(getApiUrl('/organizations/:orgId/surveys/:name'), async ({ request, params, cookies }) => {
        return HttpResponse.json({});
      }),
    ],
    getSignUpHandler.DEFAULT,
  ].flat(),
};
