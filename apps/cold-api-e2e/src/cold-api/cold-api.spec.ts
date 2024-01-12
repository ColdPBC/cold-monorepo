import { action_template_mock } from './mocks/action_template_mocks';
import { notPublishMock, publishMock } from './mocks/news_mock';
import Fakerator from 'fakerator';
import { set } from 'lodash';
import * as z from 'zod';
import { component_mock } from './mocks/component_mocks';
import { organizations } from '@prisma/client';
import { ActionTemplateSchema } from '@coldpbc/nest';

const axios = globalThis.auth0Axios;
const fakeUser = Fakerator().entity.user();

describe('API Tests', () => {
  describe('Unauthenticated Tests', () => {
    it('GET /v1 should return docs', async () => {
      const res = await axios.get(`/v1`);

      expect(res.status).toBe(200);
      expect(res.data).toMatchSnapshot();
    });

    it('GET /health should return health', async () => {
      const res = await axios.get(`/health`);

      expect(res.status).toBe(200);
      expect(res.data).toMatchSnapshot();
    });
  });

  describe('Authenticated Tests', () => {
    let action_template_id = '';
    const owner = fakeUser;
    owner.password = `ABC123-${fakeUser.password}`;
    owner.email = fakeUser.email.replace('hotmail.com', 'example.com').replace('yahoo.com', 'example.com').replace('gmail.com', 'example.com');
    let org: organizations;

    describe('News', () => {
      it('POST /news (not published)', async () => {
        try {
          const res = await axios.post(`/news`, notPublishMock);
          console.log('POST /news (not published)', res.data);
          expect(res.status).toBe(201);
          expect(res.data.image_url).toEqual(notPublishMock.image_url);
          expect(res.data.publish).toEqual(false);
          expect(res.data.source_name).toEqual(notPublishMock.source_name);
          expect(res.data.url).toEqual(notPublishMock.url);
        } catch (error) {
          console.log(error.message, error.response.data);
          throw error;
        }
      });
      it('POST /news', async () => {
        try {
          const res = await axios.post(`/news`, publishMock);
          console.log('POST /news', res.data);
          expect(res.status).toBe(201);
          expect(res.data.image_url).toEqual(publishMock.image_url);
          expect(res.data.publish).toEqual(publishMock.publish);
          expect(res.data.source_name).toEqual(publishMock.source_name);
          expect(res.data.url).toEqual(publishMock.url);
          expect(res.data.title).toEqual(publishMock.title);
        } catch (error) {
          console.log(error.message, error.response.data);
          throw error;
        }
      });
      it('GET /news?take=3&skip=0&bpc=true&publish=false', async () => {
        try {
          const res = await axios.get(`/news?take=3&skip=0&bpc=true&publish=false`);
          console.log('GET /news?take=3&skip=0&bpc=true&publish=false', res.data);
          expect(res.status).toBe(200);
          expect(res.data.length).toEqual(3);
        } catch (error) {
          console.log(error.message, error.response.data);
          throw error;
        }
      });
      it('GET /news?take=1&skip=0&bpc=true&publish=false', async () => {
        try {
          const res = await axios.get(`/news?take=1&skip=0&bpc=true&publish=false`);
          console.log('GET /news?take=3&skip=0&bpc=true&publish=false', res.data);
          expect(res.status).toBe(200);
          expect(res.data.length).toEqual(1);
        } catch (error) {
          console.log(error.message, error.response.data);
          throw error;
        }
      });
    });
    describe('Action Templates', () => {
      const itemSchema = z.object({
        id: z.string().uuid(),
        created_at: z.string().datetime(),
        updated_at: z.string().datetime(),
        template: ActionTemplateSchema,
      });
      it('POST /action-templates', async () => {
        try {
          const res = await axios.post(`/action-templates`, action_template_mock);
          console.log('POST /action-templates', res.data);
          expect(res.status).toBe(201);

          expect(() => itemSchema.parse(res.data)).not.toThrow();
          action_template_id = res.data.id;
        } catch (error) {
          if (error?.response?.data) {
            console.error(error?.reponse?.data?.message, error.response.data);
          } else {
            console.error(error.message, error?.issues);
          }
          throw error;
        }
      });

      it('GET /action-templates', async () => {
        try {
          const res = await axios.get(`/action-templates`);
          console.log('GET /action-templates', res.data);
          expect(res.status).toBe(200);
          expect(res.data.length).toBeGreaterThan(0);
          expect(() => z.array(itemSchema).parse(res.data)).not.toThrow();
        } catch (error) {
          if (error?.response?.data) {
            console.error(error?.reponse?.data?.message, error.response.data);
          } else {
            console.error(error.message, error?.issues);
          }
          throw error;
        }
      });
      it('GET /action-templates/:id', async () => {
        try {
          const res = await axios.get(`/action-templates/${action_template_id}`);
          console.log('GET /action-templates/:id', res.data);
          expect(res.status).toBe(200);
          expect(() => itemSchema.parse(res.data)).not.toThrow();
        } catch (error) {
          if (error?.response?.data) {
            console.error(error?.reponse?.data?.message, error.response.data);
          } else {
            console.error(error.message, error?.issues);
          }
          throw error;
        }
      });
    });
    describe('Categories', () => {
      it('GET /categories', async () => {
        try {
          const res = await axios.get(`/categories`);
          console.log('GET /cateogries', res.data);
          expect(res.status).toBe(200);
        } catch (error) {
          console.log(error.message, error.response.data);
          throw error;
        }
      });
    });
    describe('Components', () => {
      it('POST /components', async () => {
        try {
          const res = await axios.post(`/components`, component_mock);
          console.log('POST /components', res.data);
          expect(res.status).toBe(201);
        } catch (error) {
          console.log(error.message, error.response.data);
          throw error;
        }
      });

      it('PATCH /components', async () => {
        try {
          const res = await axios.patch(`/components/test_component`, {
            description: 'updated: incididunt dolore culpa do proident',
          });
          console.log('PATCH /components', res.data);
          expect(res.status).toBe(201);
          expect(res.data.description).toEqual('updated: incididunt dolore culpa do proident');
        } catch (error) {
          console.log(error.message, error.response.data);
          throw error;
        }
      });

      it('GET /components/enums/:type', async () => {
        try {
          const res = await axios.get(`/components/types/DATAGRID`);
          console.log('GET /components/enums/:type', res.data);
          expect(res.status).toBe(200);
        } catch (error) {
          console.log(error.message, error.response.data);
          throw error;
        }
      });
      it('GET /components/:name', async () => {
        try {
          const res = await axios.get(`/components/sidebar_navigation`);
          console.log('GET /components/:name', res.data);
          expect(res.status).toBe(200);
        } catch (error) {
          console.log(error.message, error.response.data);
          throw error;
        }
      });

      it('GET /components/darkly/testOrgs', async () => {
        try {
          const res = await axios.get(`/components/darkly/testOrgs`);
          console.log('GET /components/darkly/testOrgs', res.data);
          expect(res.status).toBe(200);
        } catch (error) {
          console.log(error.message, error.response.data);
          throw error;
        }
      });
    });
    describe('Members', () => {
      it('POST /members', async () => {
        try {
          const res = await axios.post(`/members`, {
            email: `${owner.email}`,
            password: `${owner.password}`,
            connection: 'cold-db',
          });

          console.log('POST /members', res.data);

          set(owner, 'user_id', res.data.user_id);

          console.log('***OWNER***', owner);
          expect(res.status).toBe(201);
        } catch (error) {
          console.log(error.message, error.response.data);
          throw error;
        }
      });

      it('PATCH /members/:email', async () => {
        try {
          const res = await axios.patch(`/members/${owner.email}`, {
            family_name: owner.lastName,
            given_name: owner.firstName,
            name: `${owner.firstName} ${owner.lastName}`,
            picture: owner.avatar,
          });

          console.log('POST /members', res.data);

          //set(owner, 'id', res.data.id);

          expect(res.status).toBe(200);
        } catch (error) {
          console.log(error.message, error.response.data);
          throw error;
        }
      });
      it('GET /members/:email?bpc=true', async () => {
        try {
          const res = await axios.get(`/members/${owner.email}`);

          console.log('GET /members/:email?bpc=true', res.data);

          expect(res.status).toBe(200);
        } catch (error) {
          console.log(error.message, error.response.data);
          throw error;
        }
      });
    });
    describe('Organizations', () => {
      const fakeOrg = Fakerator().entity.company();

      it('POST /organizations', async () => {
        try {
          const res = await axios.post(`/organizations`, {
            display_name: fakeOrg.name,
          });

          console.log('POST /organizations', res.data);

          org = res.data;

          expect(res.status).toBe(201);
        } catch (error) {
          console.log(error.message, error.response.data);
          throw error;
        }
      });

      it('PUT /organizations/:orgID/roles/:role/members/:userId', async () => {
        try {
          const res = await axios.put(`/organizations/${org.id}/roles/company:owner/members/${owner['user_id']}`);

          console.log('POST /organizations', res.data);

          org = res.data;

          expect(res.status).toBe(201);
        } catch (error) {
          console.log(error.message, error.response.data);
          throw error;
        }
      });

      it('POST /organizations/:orgID/invitation?suppressEmail=true', async () => {
        try {
          const res = await axios.post(`/organizations/${org.id}/invitations?suppressEmail=true`, {
            user_email: `test_company_admin@coldclimate.com`,
            inviter_name: `${owner.firstName} ${owner.lastName}`,
            roleId: 'company:admin',
          });

          console.log(`/organizations/${org.id}/invitations?suppressEmail=true`, res.data);

          expect(res.status).toBe(201);
        } catch (error) {
          console.log(error.message, error.response.data);
          throw error;
        }
      });

      it('GET /organizations/:orgId/members', async () => {
        try {
          const res = await axios.get(`/organizations/${org.id}/members`);

          console.log(`/organizations/${org.id}/members`, res.data);

          expect(res.status).toBe(200);
        } catch (error) {
          console.log(error.message, error.response.data);
          throw error;
        }
      });

      it('GET /organizations/:orgId', async () => {
        try {
          const res = await axios.get(`/organizations/${org.id}`);

          console.log(`/organizations/${org.id}`, res.data);

          expect(res.status).toBe(200);
        } catch (error) {
          console.log(error.message, error.response.data);
          throw error;
        }
      });

      it(`GET /organizations/:orgid/members/:userId/roles`, async () => {
        try {
          const res = await axios.get(`/organizations/${org.id}/members/${owner['user_id']}/roles`);

          console.log(`/organizations/${org.id}/members/${owner['user_id']}/roles`, res.data);

          expect(res.status).toBe(200);
        } catch (error) {
          console.log(error.message, error.response.data);
          throw error;
        }
      });
    });
  });
});
