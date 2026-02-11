import { FootprintsController } from './footprints.controller';
import { FootprintsService } from './footprints.service';

describe('FootprintsController', () => {
  let controller: FootprintsController;

  const service = {
    findAll: jest.fn(),
    create: jest.fn(),
    findAllByOrgFacility: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };
  beforeEach(() => {
    jest.clearAllMocks();
    controller = new FootprintsController(service as unknown as FootprintsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll delegates to service', () => {
    service.findAll.mockReturnValue('ok');

    expect(controller.findAll()).toBe('ok');
    expect(service.findAll).toHaveBeenCalled();
  });

  it('create delegates to service and sets facility ids', () => {
    service.create.mockReturnValue('ok');
    const payload = [{ facility_id: '', facility_name: 'f1', periods: [] }] as any;

    expect(controller.create('org1', 'fac1', payload)).toBe('ok');
    expect(payload[0].facility_id).toBe('fac1');
    expect(service.create).toHaveBeenCalledWith('org1', payload);
  });

  it('findAllByOrgFacility delegates to service', () => {
    service.findAllByOrgFacility.mockReturnValue('ok');

    expect(controller.findAllByOrgFacility('org1', 'fac1')).toBe('ok');
    expect(service.findAllByOrgFacility).toHaveBeenCalledWith('org1', 'fac1');
  });

  it('findOne delegates to service', () => {
    service.findOne.mockReturnValue('ok');

    expect(controller.findOne('org1', 'fac1', 'id1')).toBe('ok');
    expect(service.findOne).toHaveBeenCalledWith('org1', 'fac1', 'id1');
  });

  it('remove delegates to service', () => {
    service.remove.mockReturnValue('ok');

    expect(controller.remove('org1', 'fac1', 'id1')).toBe('ok');
    expect(service.remove).toHaveBeenCalledWith('org1', 'fac1', 'id1');
  });
});
