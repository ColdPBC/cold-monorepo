import { OrganizationIntegrationsController } from './organization.integrations.controller';
import { OrganizationIntegrationsService } from './organization.integrations.service';

describe('OrganizationIntegrationsController', () => {
  let controller: OrganizationIntegrationsController;

  const service = {
    getOrganizationIntegrations: jest.fn(),
    createIntegration: jest.fn(),
    enableIntegration: jest.fn(),
    triggerIntegration: jest.fn(),
    createFacilityIntegration: jest.fn(),
  };
  beforeEach(() => {
    jest.clearAllMocks();
    controller = new OrganizationIntegrationsController(service as unknown as OrganizationIntegrationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getOrganizationIntegrations defaults bpc false and delegates', () => {
    service.getOrganizationIntegrations.mockReturnValue('ok');
    const req = {} as any;

    expect(controller.getOrganizationIntegrations('org1', req, undefined as any)).toBe('ok');
    expect(service.getOrganizationIntegrations).toHaveBeenCalledWith(req, 'org1', false);
  });

  it('createIntegration delegates to service', () => {
    service.createIntegration.mockReturnValue('ok');
    const req = {} as any;
    const body = { organization_id: 'org1', service_definition_id: 'sd1', metadata: {} };

    expect(controller.createIntegration('org1', req, body)).toBe('ok');
    expect(service.createIntegration).toHaveBeenCalledWith(req, 'org1', body);
  });

  it('activateIntegration delegates to service', () => {
    service.enableIntegration.mockReturnValue('ok');
    const req = {} as any;
    const body = { organization_id: 'org1', service_definition_id: 'sd1', metadata: {} };

    expect(controller.activateIntegration('org1', req, body)).toBe('ok');
    expect(service.enableIntegration).toHaveBeenCalledWith(req, 'org1', body);
  });

  it('triggerIntegration delegates to service', () => {
    service.triggerIntegration.mockReturnValue('ok');
    const req = {} as any;
    const body = { api_key: 'k' };

    expect(controller.triggerIntegration('org1', 1, 10, req, body)).toBe('ok');
    expect(service.triggerIntegration).toHaveBeenCalledWith(req, 'org1', body, 1, 10);
  });

  it('createFacilityIntegration delegates to service', () => {
    service.createFacilityIntegration.mockReturnValue('ok');
    const req = {} as any;
    const body = { organization_id: 'org1', service_definition_id: 'sd1', metadata: {} };

    expect(controller.createFacilityIntegration('org1', 'fac1', req, body)).toBe('ok');
    expect(service.createFacilityIntegration).toHaveBeenCalledWith(req, 'org1', 'fac1', body);
  });
});
