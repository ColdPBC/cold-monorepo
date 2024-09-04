import React from 'react';
import { Card, ErrorFallback, MainContent, Spinner } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';
import { useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import useSWR from 'swr';
import Stripe from 'stripe';
import { stripeFetcher } from '@coldpbc/fetchers';
import { get } from 'lodash';
import { isAxiosError } from 'axios';
import capitalize from 'lodash/capitalize';

const _BillingPage = () => {
  const { logBrowser } = useColdContext();
  const { orgId } = useAuth0Wrapper();

  const subscriptionSWR = useSWR<
    {
      currentSubscription: Stripe.Subscription | null;
      paymentMethod: Stripe.PaymentMethod | null;
    },
    any,
    any
  >(orgId ? [`/customer_subscriptions/${orgId}`, 'GET'] : null, stripeFetcher);

  const productsSWR = useSWR<
    {
      data: Stripe.Product[];
    },
    any,
    any
  >(['/stripe_products'], stripeFetcher);

  const paymentUpdatePortalSessionSWR = useSWR<Stripe.BillingPortal.Session, any, any>(orgId ? [`/portal_session/${orgId}`, 'GET'] : null, stripeFetcher);

  if (subscriptionSWR.isLoading || productsSWR.isLoading || paymentUpdatePortalSessionSWR.isLoading) {
    return <Spinner />;
  }

  logBrowser('Billing Page', 'info', { subscriptionSWR: subscriptionSWR.data, productsSWR: productsSWR.data, paymentUpdatePortalSessionSWR: paymentUpdatePortalSessionSWR.data });

  if (isAxiosError(subscriptionSWR.data) || isAxiosError(productsSWR.data)) {
    logBrowser('Error fetching data', 'error', { subscriptionSWR, productsSWR });
    return (
      <MainContent title="Billing Details" className={'items-start'}>
        <div>Contact us at support@coldclimate.com to resolve the error </div>
      </MainContent>
    );
  }

  const currentSubscription = subscriptionSWR.data?.currentSubscription;
  const paymentMethod = subscriptionSWR.data?.paymentMethod;
  const products = productsSWR.data?.data;

  const getSubscription = () => {
    return (
      <div className={'text-h2 font-normal flex flex-row gap-2 items-center'}>
        <div className={'font-bold'}>Current Plan:</div>
        {currentSubscription ? products?.find(p => p.id === currentSubscription.items.data[0].price.product)?.name || 'None' : 'None'}
      </div>
    );
  };

  const getPaymentMethod = () => {
    if (!currentSubscription || isAxiosError(paymentUpdatePortalSessionSWR.data)) {
      return null;
    }
    if (isAxiosError(paymentUpdatePortalSessionSWR.data)) {
      return null;
    }
    const portalSessionLink = paymentUpdatePortalSessionSWR.data?.url;
    if (!portalSessionLink) {
      return null;
    }
    let element = (
      <a className={'hover:underline text-primary'} href={portalSessionLink}>
        Add Payment Method
      </a>
    );

    if (paymentMethod) {
      element = (
        <div className={'flex flex-row gap-2'}>
          {capitalize(paymentMethod.card?.brand)} ending in {paymentMethod.card?.last4}
          <div>
            (
            <a className={'hover:underline text-primary'} href={portalSessionLink}>
              Update
            </a>
            )
          </div>
        </div>
      );
    }

    return (
      <div className={'text-h2 font-normal flex flex-row gap-2 items-center'}>
        <div className={'font-bold'}>Payment:</div>
        {element}
      </div>
    );
  };

  const billingPortalUrl = get(import.meta.env, 'VITE_STRIPE_BILLING_URL', '');

  return (
    <MainContent title="Billing Details" className={'items-start'}>
      <Card>
        {getSubscription()}
        {getPaymentMethod()}
        {currentSubscription && (
          <a className={'hover:underline text-primary'} href={billingPortalUrl}>
            See Billing History
          </a>
        )}
        <div>Contact us at support@coldclimate.com to change or cancel your subscription</div>
      </Card>
    </MainContent>
  );
};

export const BillingPage = withErrorBoundary(_BillingPage, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
