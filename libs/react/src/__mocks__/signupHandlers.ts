import { rest } from 'msw';
import {
  getEmptyPoliciesSignedMock,
  getPoliciesSignedMock,
  getPolicyMockByName,
} from './policyMock';

export const getSignUpHandler = {
  DEFAULT: [
    rest.patch(`*/users/:emailOrId`, (req, res, ctx) => {
      return res(ctx.json({}));
    }),
    rest.post(`*/organizations`, (req, res, ctx) => {
      const body = req.body as {
        name: string;
      };
      return res(ctx.json({}));
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
  ],
};
