// Mock the shared @coldpbc/nest module to avoid pulling Prisma extensions/client during unit tests
jest.mock('@coldpbc/nest', () => ({
  __esModule: true,
  BaseWorker: class {
    logger = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    };
    constructor(public name: string) {}
    static async getParsedJSON() {
      return {} as any;
    }
  },
}), { virtual: true });

import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

// Helper to build a mock Stripe client shape used by AppService
function createStripeMock() {
  return {
    products: {
      list: jest.fn().mockResolvedValue([{ id: 'prod_123' }]),
    },
    customers: {
      retrieve: jest.fn(),
      listPaymentMethods: jest.fn(),
      create: jest.fn(),
      del: jest.fn(),
    },
    subscriptions: {
      list: jest.fn(),
    },
    billingPortal: {
      sessions: {
        create: jest.fn(),
      },
    },
  } as any;
}

// We need to mock the default export class from 'stripe' so that
// `new Stripe(apiKey)` returns our mock instance above.
const stripeInstance = createStripeMock();
jest.mock('stripe', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => stripeInstance),
}));

describe('AppService (Stripe)', () => {
  let service: AppService;
  const prisma = {} as any;
  const config = {
    getOrThrow: (k: string) => {
      if (k === 'STRIPE_API_KEY') return 'sk_test_123';
      if (k === 'STRIPE_FRONTEND_URL') return 'https://app.local';
      throw new Error('Unexpected key ' + k);
    },
  } as unknown as ConfigService;

  beforeEach(() => {
    // Reset all spies between tests
    jest.clearAllMocks();
    // Construct service (this will call new Stripe(...), returning our mock)
    service = new AppService(config, prisma);
  });

  it('getProducts delegates to stripe.products.list', async () => {
    const result = await service.getProducts();
    expect(stripeInstance.products.list).toHaveBeenCalledTimes(1);
    expect(result).toEqual([{ id: 'prod_123' }]);
  });

  describe('getCustomerSubscriptions', () => {
    const baseReq = {
      organization: {
        name: 'Acme',
        display_name: 'Acme Inc',
        metadata: {},
      },
    } as any;

    it('returns nulls when organization has no stripeCustomerId', async () => {
      const res = await service.getCustomerSubscriptions(baseReq);
      expect(res).toEqual({ currentSubscription: null, paymentMethod: null });
      expect(stripeInstance.customers.retrieve).not.toHaveBeenCalled();
      expect(stripeInstance.subscriptions.list).not.toHaveBeenCalled();
    });

    it('returns first subscription and resolves payment method id from defaults', async () => {
      const req = {
        organization: {
          name: 'Acme',
          metadata: { stripeCustomerId: 'cus_abc' },
        },
      } as any;

      const customer = {
        id: 'cus_abc',
        name: 'Acme',
        invoice_settings: { default_payment_method: 'pm_2' },
        default_source: null,
      } as any;

      const subs = {
        data: [
          {
            id: 'sub_1',
            default_payment_method: null,
            default_source: null,
          },
        ],
      } as any;

      const pmList = {
        data: [
          { id: 'pm_1', card: { brand: 'visa' } },
          { id: 'pm_2', card: { brand: 'mc' } },
        ],
      } as any;

      (stripeInstance.customers.retrieve as jest.Mock).mockResolvedValue(customer);
      (stripeInstance.subscriptions.list as jest.Mock).mockResolvedValue(subs);
      (stripeInstance.customers.listPaymentMethods as jest.Mock).mockResolvedValue(pmList);

      const res = await service.getCustomerSubscriptions(req);
      expect(res.currentSubscription).toEqual(subs.data[0]);
      expect(res.paymentMethod).toEqual(pmList.data[1]); // pm_2 from invoice_settings
      expect(stripeInstance.subscriptions.list).toHaveBeenCalledWith({ customer: 'cus_abc' });
    });
  });

  describe('createPortalSession', () => {
    it('returns Error when no customer id', async () => {
      const req = { organization: { name: 'NoID', metadata: {} } } as any;
      const res = await service.createPortalSession(req as any);
      expect(res).toBeInstanceOf(Error);
      expect((res as Error).message).toContain('No customer id found');
      expect(stripeInstance.billingPortal.sessions.create).not.toHaveBeenCalled();
    });

    it('creates billing portal session when customer id exists', async () => {
      const req = { organization: { name: 'Acme', metadata: { stripeCustomerId: 'cus_abc' } } } as any;
      (stripeInstance.billingPortal.sessions.create as jest.Mock).mockResolvedValue({ id: 'bps_123' });

      const res = await service.createPortalSession(req as any);
      expect(stripeInstance.billingPortal.sessions.create).toHaveBeenCalledWith({
        customer: 'cus_abc',
        return_url: 'https://app.local/settings/billing',
        flow_data: { type: 'payment_method_update' },
      });
      expect(res).toEqual({ id: 'bps_123' });
    });
  });

  it('createCustomer forwards body', async () => {
    const req = { organization: { name: 'Acme' }, body: { name: 'John' } } as any;
    (stripeInstance.customers.create as jest.Mock).mockResolvedValue({ id: 'cus_new' });
    const res = await service.createCustomer(req);
    expect(stripeInstance.customers.create).toHaveBeenCalledWith({ name: 'John' });
    expect(res).toEqual({ id: 'cus_new' });
  });

  describe('deleteCustomer', () => {
    it('returns Error when no customer id', async () => {
      const req = { organization: { name: 'NoID', metadata: {} } } as any;
      const res = await service.deleteCustomer(req);
      expect(res).toBeInstanceOf(Error);
    });

    it('calls stripe.customers.del when id exists', async () => {
      const req = { organization: { name: 'Acme', metadata: { stripeCustomerId: 'cus_123' } } } as any;
      (stripeInstance.customers.del as jest.Mock).mockResolvedValue({ id: 'cus_123', deleted: true });

      const res = await service.deleteCustomer(req);
      expect(stripeInstance.customers.del).toHaveBeenCalledWith('cus_123');
      expect(res).toEqual({ id: 'cus_123', deleted: true });
    });
  });
});
