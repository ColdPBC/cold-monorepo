import { FacilitiesController } from './facilities.controller';
import { FacilitiesService } from './facilities.service';

describe('OrganizationFacilitiesController', () => {
  let controller: FacilitiesController;

  const service = {
    getOrganizationFacilities: jest.fn(),
    createOrganizationFacility: jest.fn(),
    deleteOrganizationFacility: jest.fn(),
    update: jest.fn(),
  };

  const req = { user: { id: 'u1' } } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new FacilitiesController(service as unknown as FacilitiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getFacilities delegates to service', () => {
    service.getOrganizationFacilities.mockReturnValue('ok');

    expect(controller.getFacilities(req, 'org1')).toBe('ok');
    expect(service.getOrganizationFacilities).toHaveBeenCalledWith(req, 'org1');
  });

  it('createFacility delegates to service', () => {
    service.createOrganizationFacility.mockReturnValue('ok');
    const body = { name: 'fac' };

    expect(controller.createFacility(req, 'org1', body)).toBe('ok');
    expect(service.createOrganizationFacility).toHaveBeenCalledWith(req, 'org1', body);
  });

  it('deleteFacility delegates to service', () => {
    service.deleteOrganizationFacility.mockReturnValue('ok');

    expect(controller.deleteFacility(req, 'org1', 'fac1')).toBe('ok');
    expect(service.deleteOrganizationFacility).toHaveBeenCalledWith(req, 'fac1');
  });

  it('updateFacility delegates to service', () => {
    service.update.mockReturnValue('ok');
    const body = { name: 'fac' };

    expect(controller.updateFacility(req, 'org1', 'fac1', body)).toBe('ok');
    expect(service.update).toHaveBeenCalledWith(req, 'fac1', body);
  });
});
