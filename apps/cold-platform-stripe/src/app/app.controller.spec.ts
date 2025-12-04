// Mock @coldpbc/nest to avoid importing Prisma-dependent code paths
jest.mock('@coldpbc/nest', () => ({
  __esModule: true,
  coldAdminOnly: ['admin'],
  coldAndCompanyAdmins: ['admin', 'company_admin'],
  JwtAuthGuard: class {},
  RolesGuard: class {},
  OrgUserInterceptor: class {},
  Roles: () => () => {},
  BaseWorker: class {
    logger = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    };
    constructor(public name: string) {}
  },
}), { virtual: true });

import { AppController } from './app.controller';
// Do NOT import AppService here to avoid evaluating BaseWorker from @coldpbc/nest

describe('AppController (unit)', () => {
  let controller: AppController;
  let service: jest.Mocked<AppService>;

  beforeEach(() => {
    service = {
      getProducts: jest.fn().mockResolvedValue([{ id: 'p1' }]),
      getCustomerSubscriptions: jest.fn().mockResolvedValue({ currentSubscription: null, paymentMethod: null }),
      createPortalSession: jest.fn().mockResolvedValue({ id: 'bps_1' }),
      createCustomer: jest.fn().mockResolvedValue({ id: 'cus_1' }),
      deleteCustomer: jest.fn().mockResolvedValue({ id: 'cus_1', deleted: true }),
    } as any;

    controller = new AppController(service as any);
  });

  it('GET /stripe_products delegates to AppService.getProducts', async () => {
    const res = await controller.getProducts();
    expect(service.getProducts).toHaveBeenCalled();
    expect(res).toEqual([{ id: 'p1' }]);
  });

  it('GET /customer_subscriptions/:orgId delegates to AppService.getCustomerSubscriptions', async () => {
    const req = { organization: { id: 'org1' } } as any;
    const res = await controller.getCustomerSubscriptions('org1', req);
    expect(service.getCustomerSubscriptions).toHaveBeenCalledWith(req);
    expect(res).toEqual({ currentSubscription: null, paymentMethod: null });
  });

  it('GET /portal_session/:orgId delegates to AppService.createPortalSession', async () => {
    const req = { organization: { id: 'org1' } } as any;
    const res = await controller.createSession('org1', req);
    expect(service.createPortalSession).toHaveBeenCalledWith(req);
    expect(res).toEqual({ id: 'bps_1' });
  });

  it('POST /customers delegates to AppService.createCustomer', async () => {
    const req = { body: { name: 'John' } } as any;
    const res = await controller.createCustomer(req);
    expect(service.createCustomer).toHaveBeenCalledWith(req);
    expect(res).toEqual({ id: 'cus_1' });
  });

  it('DELETE /customers/:orgId delegates to AppService.deleteCustomer', async () => {
    const req = { organization: { id: 'org1' } } as any;
    const res = await controller.deleteCustomer(req);
    expect(service.deleteCustomer).toHaveBeenCalledWith(req);
    expect(res).toEqual({ id: 'cus_1', deleted: true });
  });
});
