import { Injectable, OnModuleInit } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { BaseWorker, IRequest, PrismaService } from '@coldpbc/nest';
import { get } from 'lodash';

@Injectable()
export class AppService extends BaseWorker implements OnModuleInit {
  stripe: Stripe;
  key: string;
  frontendUrl: string;

  constructor(readonly config: ConfigService, readonly prisma: PrismaService) {
    super(AppService.name);
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
      this.logger.info(`Getting subscriptions for customer ${customerId}`, {
        customerId,
        organization: req.organization,
      });
      const customer = (await this.stripe.customers.retrieve(customerId as string)) as Stripe.Response<Stripe.Customer>;
      const subscriptions = await this.stripe.subscriptions.list({
        customer: customerId as string,
      });
      const customerPaymentMethods = await this.stripe.customers.listPaymentMethods(customerId as string);
      // get subscription payment methods
      if (subscriptions.data.length > 0) {
        this.logger.info(`Found ${subscriptions.data.length} subscriptions for customer ${customerId}`);
        currentSubscription = subscriptions.data[0];
        const defaultPaymentMethod = currentSubscription.default_payment_method as string | null;
        const defaultSource = currentSubscription.default_source as string | null;

        // if the default payment method is null, then use the default source. if the default source is null, then use customer.invoice_settings.default_payment_method
        const paymentMethodId =
          defaultPaymentMethod || defaultSource || (customer.invoice_settings.default_payment_method as string | null) || (customer.default_source as string | null) || null;
        if (paymentMethodId) {
          paymentMethod = customerPaymentMethods.data.find(pm => pm.id === paymentMethodId) || null;
          this.logger.info(`Found payment method for subscription ${currentSubscription.id} for customer ${customer.name}`, {
            paymentMethod,
            customer,
          });
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
      this.logger.info(`No customer id found for organization ${req.organization.name}. Not creating portal session.`);
      return new Error('No customer id found');
    }
    this.logger.info(`Creating billing portal session for customer ${customerId}`);
    return await this.stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${this.frontendUrl}/settings/billing`,
      flow_data: {
        type: 'payment_method_update',
      },
    });
  }

  createCustomer(req: IRequest) {
    this.logger.info('Creating customer', {
      organization: req.organization,
      body: req.body,
    });
    return this.stripe.customers.create({
      ...req.body,
    });
  }

  deleteCustomer(req: IRequest) {
    const customerId = this.getStripeCustomerId(req.organization);
    if (!customerId) {
      this.logger.error(`No customer id found for organization ${req.organization.name}. Not deleting customer`);
      return new Error('No customer id found');
    }
    return this.stripe.customers.del(customerId);
  }

  private getStripeCustomerId(org: IRequest['organization']): string | undefined {
    return get(org.metadata as any, 'stripeCustomerId', undefined);
  }
}
