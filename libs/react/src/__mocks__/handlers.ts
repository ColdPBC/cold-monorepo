import { rest } from "msw";
import { getSidebarMock } from "./sidebarMock";
import {getCategoriesDataMock, getFootprintDataMock} from './categoriesMock';
import {
  getDataGridCompaniesMock,
  getDataGridUsersMock,
  getDefaultFormDataGridMock,
  getDefaultFormDefinitionGridMock,
  getOrganizationMembersMock,
  getOrganizationMock,
  getTeamMemberDataGridMock,
} from "./datagridMock";
import {
  changeUserRoles,
  deleteUserInvitation,
  removeUserFromOrganization,
  resendInvitation,
  sendInvitation,
} from "./helper";
import {getFormDefinitionByName} from "./formDefinition";
import {getRoles} from './roleMock';
import {resolveAPIUrl} from "../fetchers/helper";

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
     if you are requesting '/form-definitions/sidebar_navigation', and you want to see that it works with the API
     then you will need to change the url path below to something like '/form-definitions/sidebar_navigations_disable'.
     then you can paste a valid accessToken in the textbox in storybook, and it should authenticate to the API and return the data.

     this is useful if you want to make sure your mocks match what the API is returning.
     */

  //Mock SideBar Request
  rest.get(
    getApiUrl("/form-definitions/sidebar_navigation"),
    (req, res, ctx) => {
      return res(ctx.json({ ...getSidebarMock() }));
    }
  ),

  // Mock data for journey modules
  rest.get(
    getApiUrl("/categories"),
    (req, res, ctx) => {
      return res(ctx.json({ ...getCategoriesDataMock() }));
    }
  ),

  // Mock data for footprint modules
  rest.get(
    getApiUrl("/categories/company_decarbonization"),
    (req, res, ctx) => {
      return res(ctx.json({ ...getFootprintDataMock() }));
    }
  ),

  rest.get(getApiUrl('/company-users'), (req, res, ctx) => {
    return res(ctx.json(getDataGridUsersMock()));
  }),

  rest.get(
    getApiUrl('/form-definitions/team_member_table'),
    (req, res, ctx) => {
      return res(ctx.json(getTeamMemberDataGridMock()));
    }
  ),

  rest.get(getApiUrl('/form-definitions/datagrid'), (req, res, ctx) => {
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

  rest.post(
    getApiUrl('/organizations/:orgId/members/:userId/role/:roleName'),
    async (req, res, ctx) => {
      const { orgId, userId, roleName } = req.params;
      await changeUserRoles(
        orgId as string,
        userId as string,
        roleName as string
      );
      return res(ctx.json({}));
    }
  ),

  rest.delete(
    getApiUrl('/organizations/:orgId/member'),
    async (req, res, ctx) => {
      const { orgId } = req.params;
      let data: { members: string[] };
      if (req.body) {
        data = req.body as { members: string[] };
        await removeUserFromOrganization(data.members, orgId as string);
      }
      return res(ctx.json({}));
    }
  ),

  rest.delete(
    getApiUrl('/organizations/invitation'),
    async (req, res, ctx) => {
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
    }
  ),

  rest.post(getApiUrl('/organizations/invitation'), async (req, res, ctx) => {
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
    } catch(error) {
      let message
      if (error instanceof Error) message = error.message
      else message = String(error)
      return res(
        ctx.status(500),
        ctx.json({ message: message })
      );
    }
  }),

  rest.patch(getApiUrl('/organizations/invitation'),
    async (req, res, ctx) => {
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
    }
  ),

  rest.post(getApiUrl('/resources/:name'), async (req, res, ctx) => {
    return res(ctx.json({}));
  }),

  rest.get(getApiUrl('/roles'), async (req, res, ctx) => {
    return res(
      ctx.json(getRoles())
    );
  }),

  rest.get(getApiUrl('/form-definitions/:name'), (req, res, ctx) => {
    const { name } = req.params;

    return res(ctx.json(getFormDefinitionByName(name as string)));
  }),

  rest.patch(getApiUrl('/form-definitions/:name'), async (req, res, ctx) => {
    const {data} = await req.json();

    return res(ctx.json({}));
  }),
];
