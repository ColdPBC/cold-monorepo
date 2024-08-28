import { MainContent } from '@coldpbc/components';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_51NTmrdFjHElEUwepHr6fstop7tf00oYI0S6tHvYLdcK2j5J7Cf7zWh3oufzZfZgAm7UR70EFSaj1AnDFjQUjPIXY003YYApQiA', {});

export const BillingPage = () => {
  const fetchClientSecret;

  return (
    <MainContent title="Billing">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </MainContent>
  );
};
