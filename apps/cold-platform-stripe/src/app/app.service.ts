import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { IRequest, PrismaService } from '@coldpbc/nest';
import { get } from 'lodash';

@Injectable()
export class AppService {
  stripe: Stripe;
  key: string;
  frontendUrl: string;

  constructor(readonly config: ConfigService, readonly prisma: PrismaService) {
    this.key = this.config.getOrThrow('STRIPE_API_KEY');
    this.stripe = new Stripe(this.key);
    this.frontendUrl = this.config.getOrThrow('STRIPE_FRONTEND_URL');
  }

  getProducts() {
    return this.stripe.products.list();
  }

  async getCustomerSubscriptions(req: IRequest) {
    const customerId = this.getStripeCustomerId(req.organization);
    let currentSubscription: Stripe.Subscription | null = null;
    let paymentMethod: Stripe.PaymentMethod | null = null;
    if (customerId) {
      const customer = (await this.stripe.customers.retrieve(customerId as string)) as Stripe.Response<Stripe.Customer>;
      const subscriptions = await this.stripe.subscriptions.list({
        customer: customerId as string,
      });
      const customerPaymentMethods = await this.stripe.customers.listPaymentMethods(customerId as string);
      // get subscription payment methods
      if (subscriptions.data.length > 0) {
        currentSubscription = subscriptions.data[0];
        const defaultPaymentMethod = currentSubscription.default_payment_method as string | null;
        const defaultSource = currentSubscription.default_source as string | null;

        // if the default payment method is null, then use the default source. if the default source is null, then use customer.invoice_settings.default_payment_method
        const paymentMethodId =
          defaultPaymentMethod || defaultSource || (customer.invoice_settings.default_payment_method as string | null) || (customer.default_source as string | null) || null;
        if (paymentMethodId) {
          paymentMethod = customerPaymentMethods.data.find(pm => pm.id === paymentMethodId) || null;
        }
      }
    }

    return {
      currentSubscription,
      paymentMethod,
    };
  }

  async createPortalSession(req: IRequest) {
    const customerId = this.getStripeCustomerId(req.organization);
    if (!customerId) {
      return new Error('No customer id found');
    }
    return await this.stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${this.frontendUrl}/settings/billing`,
      flow_data: {
        type: 'payment_method_update',
      },
    });
  }

  createCustomer(req: IRequest) {
    return this.stripe.customers.create({
      ...req.body,
    });
  }

  deleteCustomer(req: IRequest) {
    const customerId = this.getStripeCustomerId(req.organization);
    if (!customerId) {
      return new Error('No customer id found');
    }
    return this.stripe.customers.del(customerId);
  }

  private getStripeCustomerId(org: IRequest['organization']): string | undefined {
    return get(org.metadata as any, 'stripeCustomerId', undefined);
  }
}
