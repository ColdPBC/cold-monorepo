import { IntegrationsController } from './integrations.controller';

describe('IntegrationsController', () => {
  const build = () => {
    const providerService = {
      getAllIntegrations: jest.fn(),
    } as any;

    const controller = new IntegrationsController(providerService);
    return { controller, providerService };
  };

  it('should be defined', () => {
    const { controller } = build();
    expect(controller).toBeDefined();
  });

  it('defaults bpc to false when omitted', async () => {
    const { controller, providerService } = build();
    const req = { body: { routingKey: 'rk', action: 'a' } } as any;

    await controller.getAllIntegrations(req, undefined as any);

    expect(providerService.getAllIntegrations).toHaveBeenCalledWith(req, req.body, false);
  });

  it('passes explicit bpc value', async () => {
    const { controller, providerService } = build();
    const req = { body: { routingKey: 'rk', action: 'a' } } as any;

    await controller.getAllIntegrations(req, true);

    expect(providerService.getAllIntegrations).toHaveBeenCalledWith(req, req.body, true);
  });
});
