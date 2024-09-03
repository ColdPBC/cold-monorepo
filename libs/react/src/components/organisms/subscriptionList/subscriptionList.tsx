import { BaseButton, Card, Spinner } from '@coldpbc/components';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import { stripeFetcher } from '@coldpbc/fetchers';
import Stripe from 'stripe';
import { useAddToastMessage, useColdContext } from '@coldpbc/hooks';
import { ButtonTypes } from '@coldpbc/enums';
import { useSearchParams } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { ToastMessage } from '@coldpbc/interfaces';

export const SubscriptionList = ({ purchase }: { purchase: (id: string) => void }) => {
  const { logBrowser } = useColdContext();
  const { addToastMessage } = useAddToastMessage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const session_id = searchParams.get('session_id');

  const unSubscribe = async (id: string) => {
    const response = await stripeFetcher([`customer_subscriptions/${id}`, 'DELETE']);
    if (isAxiosError(response)) {
      addToastMessage({
        message: 'Error unsubscribing',
        type: ToastMessage.FAILURE,
      });
      logBrowser('Error unsubscribing', 'error', { response });
    } else {
      addToastMessage({
        message: 'Unsubscribed',
        type: ToastMessage.SUCCESS,
      });
      await subscriptionSWR.mutate();
    }
  };

  const getSubscriptionsURL = () => {
    if (session_id) {
      return [`customer_subscriptions/${session_id}`, 'GET'];
    } else {
      return [`customer_subscriptions`, 'GET'];
    }
  };

  const productsSWR = useSWR<
    {
      data: Stripe.Product[];
    },
    any,
    any
  >(['/products'], stripeFetcher);

  const subscriptionSWR = useSWR<
    {
      data: Stripe.Subscription[];
    },
    any,
    any
  >(getSubscriptionsURL(), stripeFetcher);

  useEffect(() => {
    if (session_id && subscriptionSWR.data) {
      setSearchParams({});
    }
  }, [subscriptionSWR.data]);

  logBrowser('Subscription details', 'info', { products: productsSWR.data, subscriptions: subscriptionSWR.data });

  if (productsSWR.isLoading || subscriptionSWR.isLoading) {
    return <Spinner />;
  }

  if (subscriptionSWR.data && productsSWR.data) {
    return (
      <>
        <div className={'text-h2'}>Subscription Options</div>
        <div className={'flex flex-col gap-y-4'}>
          {productsSWR.data.data.map(product => {
            // find the subscriptions for the product
            const productSubscriptions = subscriptionSWR.data?.data.filter(sub => sub.items.data[0].price.product === product.id).filter(sub => sub.status === 'active');
            const currentSubscription = productSubscriptions && productSubscriptions.length > 0 ? productSubscriptions[0] : undefined;
            return (
              <Card key={product.id} title={product.name}>
                <div className={'text-body'}>{product.description}</div>
                <div className={'w-full flex flex-row justify-end gap-2'}>
                  <BaseButton
                    onClick={() => {
                      if (product.default_price) {
                        purchase(product.default_price as string);
                      }
                    }}
                    label={'Subscribe'}
                    disabled={currentSubscription !== undefined}
                  />
                  <BaseButton
                    onClick={async () => {
                      setButtonLoading(true);
                      if (currentSubscription) {
                        await unSubscribe(currentSubscription.id);
                      }
                      setButtonLoading(false);
                    }}
                    label={'UnSubscribe'}
                    disabled={currentSubscription === undefined}
                    variant={ButtonTypes.warning}
                    loading={buttonLoading}
                  />
                </div>
              </Card>
            );
          })}
        </div>
      </>
    );
  } else {
    return null;
  }
};
