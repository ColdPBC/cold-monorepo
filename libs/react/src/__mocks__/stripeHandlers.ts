import { rest } from 'msw';
import { getStripeAPIUrl } from './_default';
import { getCustomerWithOutSubscriptionMock } from './stripeMocks';

export const getStripeHandlers = {
  noSubscription: [
    rest.get(getStripeAPIUrl('/customer_subscriptions/:orgId'), (req, res, ctx) => {
      return res(ctx.json(getCustomerWithOutSubscriptionMock()));
    }),
  ],
};
