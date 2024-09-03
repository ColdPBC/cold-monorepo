import { rest } from 'msw';
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
    rest.patch(`*/members/:emailOrId`, (req, res, ctx) => {
      return res(
        ctx.json({
          ...auth0UserMock,
          given_name: null,
          family_name: null,
        }),
      );
    }),
    rest.post(`*/organizations`, (req, res, ctx) => {
      const body = req.body as {
        display_name: string;
      };
      return res(
        ctx.json({
          ...getOrganizationMock(),
          display_name: body.display_name,
        }),
      );
    }),
    rest.post(`*/policies/:id/signed`, (req, res, ctx) => {
      const body = req.body as {
        name: string;
      };
      return res(ctx.json({}));
    }),
    rest.get('*/policies/signed/user', (req, res, ctx) => {
      return res(ctx.json(getEmptyPoliciesSignedMock()));
    }),
    rest.get('*/policies/:name', (req, res, ctx) => {
      const name = req.params.name as string;
      return res(ctx.json(getPolicyMockByName(name)));
    }),
    rest.get('*/members/:emailOrId', (req, res, ctx) => {
      const emailOrId = req.params.emailOrId as string;
      return res(
        ctx.json({
          ...auth0UserMock,
          given_name: null,
          family_name: null,
        }),
      );
    }),
  ],
  newCompanyAndUser: [
    rest.patch(`*/members/:emailOrId`, (req, res, ctx) => {
      return res(
        ctx.json({
          ...auth0UserMock,
          given_name: null,
          family_name: null,
        }),
      );
    }),
    rest.post(`*/organizations`, (req, res, ctx) => {
      const body = req.body as {
        display_name: string;
      };
      return res(
        ctx.json({
          ...getOrganizationMock(),
          display_name: body.display_name,
        }),
      );
    }),
    rest.post(`*/policies/:id/signed`, (req, res, ctx) => {
      const body = req.body as {
        name: string;
      };
      return res(ctx.json({}));
    }),
    rest.get('*/policies/signed/user', (req, res, ctx) => {
      return res(ctx.json(getEmptyPoliciesSignedMock()));
    }),
    rest.get('*/policies/:name', (req, res, ctx) => {
      const name = req.params.name as string;
      return res(ctx.json(getPolicyMockByName(name)));
    }),
    rest.get('*/members/:emailOrId', (req, res, ctx) => {
      const emailOrId = req.params.emailOrId as string;
      return res(
        ctx.json({
          ...auth0UserMock,
          given_name: 'null',
          family_name: 'null',
        }),
      );
    }),
  ],
  server500Error: [
    rest.patch(`*/members/:emailOrId`, (req, res, ctx) => {
      return res(
        ctx.json({
          ...auth0UserMock,
          given_name: 'null',
          family_name: 'null',
        }),
      );
    }),
    rest.post(`*/organizations`, (req, res, ctx) => {
      const body = req.body as {
        display_name: string;
      };
      return res(ctx.status(500));
    }),
    rest.post(`*/policies/:id/signed`, (req, res, ctx) => {
      const body = req.body as {
        name: string;
      };
      return res(ctx.status(500));
    }),
    rest.get('*/policies/signed/user', (req, res, ctx) => {
      return res(ctx.json(getEmptyPoliciesSignedMock()));
    }),
    rest.get('*/policies/:name', (req, res, ctx) => {
      const name = req.params.name as string;
      return res(ctx.json(getPolicyMockByName(name)));
    }),
    rest.get('*/members/:emailOrId', (req, res, ctx) => {
      const emailOrId = req.params.emailOrId as string;
      return res(
        ctx.json({
          ...auth0UserMock,
          given_name: null,
          family_name: null,
        }),
      );
    }),
  ],
};

export const getSignupHandlersForApplicationSignup = {
  DEFAULT: [
    [
      rest.get(getApiUrl('/components/sidebar_navigation'), (req, res, ctx) => {
        return res(ctx.json({ ...getSidebarMock() }));
      }),

      // Mock data for journey modules
      rest.get(getApiUrl('/categories'), (req, res, ctx) => {
        return res(ctx.json({ ...getCategoriesDataMock() }));
      }),

      // Mock data for footprint modules
      rest.get(getApiUrl('/categories/company_decarbonization'), (req, res, ctx) => {
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

      rest.get(getApiUrl('/organizations/:orgId/members'), (req, res, ctx) => {
        const { orgId } = req.params;
        const mock = getOrganizationMembersMock();
        return res(ctx.json({ ...getOrganizationMembersMock() }));
      }),

      rest.post(getApiUrl('/organizations/:orgId/members/:userId/role/:roleName'), async (req, res, ctx) => {
        const { orgId, userId, roleName } = req.params;
        await changeUserRoles(orgId as string, userId as string, roleName as string);
        return res(ctx.json({}));
      }),

      rest.delete(getApiUrl('/organizations/:orgId/member'), async (req, res, ctx) => {
        const { orgId } = req.params;
        let data: { members: string[] };
        if (req.body) {
          data = req.body as { members: string[] };
          await removeUserFromOrganization(data.members, orgId as string);
        }
        return res(ctx.json({}));
      }),

      rest.delete(getApiUrl('/organizations/:orgId/invitation'), async (req, res, ctx) => {
        let data: {
          org_id: string;
          user_email: string;
        };
        if (req.body) {
          data = req.body as {
            org_id: string;
            user_email: string;
          };
          await deleteUserInvitation(data.org_id, data.user_email);
        }
        return res(ctx.json({}));
      }),

      rest.post(getApiUrl('/organizations/:orgId/invitation'), async (req, res, ctx) => {
        const data = req.body as {
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
          return res(ctx.json({}));
        } catch (error) {
          let message;
          if (error instanceof Error) message = error.message;
          else message = String(error);
          return res(ctx.status(500), ctx.json({ message: message }));
        }
      }),

      rest.patch(getApiUrl('/organizations/:orgId/invitation'), async (req, res, ctx) => {
        const data = req.body as {
          org_id: string;
          user_email: string;
          inviter_name: string;
          roleId: string;
        };
        if (data) {
          const { org_id, user_email, inviter_name, roleId } = data;
          await resendInvitation(org_id, user_email);
        }
        return res(ctx.json({}));
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
        const { data } = await req.json();

        return res(ctx.json({}));
      }),
    ],
    getSignUpHandler.DEFAULT,
  ].flat(),
};
