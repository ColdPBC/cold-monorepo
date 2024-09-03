import { rest } from 'msw';
import { getCustomerWithOutSubscriptionMock, getCustomerWithSubscriptionMock, getPortalSessionMock, getStripeAPIUrl, getStripeProductsMock } from '@coldpbc/mocks';

export const getStripeHandlers = {
  DEFAULT: [
    rest.get(getStripeAPIUrl('/stripe_products'), (req, res, ctx) => {
      return res(ctx.json(getStripeProductsMock()));
    }),
    rest.get(getStripeAPIUrl('/customer_subscriptions/:orgId'), (req, res, ctx) => {
      return res(ctx.json(getCustomerWithSubscriptionMock()));
    }),
    rest.get(getStripeAPIUrl('/portal_session/:orgId'), (req, res, ctx) => {
      return res(ctx.json(getPortalSessionMock()));
    }),
  ],
  noSubscription: [
    rest.get(getStripeAPIUrl('/customer_subscriptions/:orgId'), (req, res, ctx) => {
      return res(ctx.json(getCustomerWithOutSubscriptionMock()));
    }),
  ],
};
