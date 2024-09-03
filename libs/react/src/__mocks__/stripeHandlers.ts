import { rest } from 'msw';
import { getStripeAPIUrl } from './handlers';
import { getCustomerWithOutSubscriptionMock } from './stripe';

export const getStripeHandlers = {
  noSubscription: [
    rest.get(getStripeAPIUrl('/customer_subscriptions/:orgId'), (req, res, ctx) => {
      return res(ctx.json(getCustomerWithOutSubscriptionMock()));
    }),
  ],
};
