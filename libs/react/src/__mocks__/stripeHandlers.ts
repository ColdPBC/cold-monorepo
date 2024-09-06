import { http, HttpResponse } from 'msw';
import { getStripeAPIUrl } from './_default';
import { getCustomerWithOutSubscriptionMock } from './stripeMocks';

export const getStripeHandlers = {
  noSubscription: [
    http.get(getStripeAPIUrl('/customer_subscriptions/:orgId'), async ({ request, params, cookies }) => {
      return HttpResponse.json(getCustomerWithOutSubscriptionMock());
    }),
  ],
};
