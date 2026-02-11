import { ComplianceSectionsController } from './compliance-sections.controller';

describe('ComplianceSectionsController', () => {
  let controller: ComplianceSectionsController;
  const complianceSectionsServiceMock = {
    create: jest.fn(),
    findSectionsByComplianceAndGroup: jest.fn(),
    findOne: jest.fn(),
    findOneByKey: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new ComplianceSectionsController(complianceSectionsServiceMock as any);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create normalizes group/name when mismatched and delegates', async () => {
    const sectionData = {
      id: 's_1',
      compliance_section_group_id: 'other_group',
      compliance_definition_name: 'other_name',
    } as any;
    const req = { user: { email: 'user@example.com' } } as any;
    complianceSectionsServiceMock.create.mockResolvedValue({ id: 's_1' });

    await expect(controller.create('comp_a', 'sg_1', sectionData, req)).resolves.toEqual({ id: 's_1' });
    expect(sectionData.compliance_section_group_id).toBe('sg_1');
    expect(sectionData.compliance_definition_name).toBe('comp_a');
    expect(complianceSectionsServiceMock.create).toHaveBeenCalledWith(sectionData, req);
  });

  it('create leaves normalized fields unchanged when already matching', async () => {
    const sectionData = {
      id: 's_1',
      compliance_section_group_id: 'sg_1',
      compliance_definition_name: 'comp_a',
    } as any;
    const req = { user: { email: 'user@example.com' } } as any;
    complianceSectionsServiceMock.create.mockResolvedValue({ id: 's_1' });

    await expect(controller.create('comp_a', 'sg_1', sectionData, req)).resolves.toEqual({ id: 's_1' });
    expect(sectionData.compliance_section_group_id).toBe('sg_1');
    expect(sectionData.compliance_definition_name).toBe('comp_a');
    expect(complianceSectionsServiceMock.create).toHaveBeenCalledWith(sectionData, req);
  });

  it('findAll delegates to service.findSectionsByComplianceAndGroup', async () => {
    const req = { user: { email: 'user@example.com' } } as any;
    complianceSectionsServiceMock.findSectionsByComplianceAndGroup.mockResolvedValue([{ id: 's_1' }]);

    await expect(controller.findAll('comp_a', 'sg_1', req, true as any, false as any)).resolves.toEqual([{ id: 's_1' }]);
    expect(complianceSectionsServiceMock.findSectionsByComplianceAndGroup).toHaveBeenCalledWith('comp_a', req.user, 'sg_1', true, false);
  });

  it('findOne delegates with name/group/id/user/filter/questions', async () => {
    const req = { user: { email: 'user@example.com' } } as any;
    complianceSectionsServiceMock.findOne.mockResolvedValue({ id: 's_1' });

    await expect(controller.findOne('comp_a', 's_1', 'sg_1', req, false as any, true as any)).resolves.toEqual({ id: 's_1' });
    expect(complianceSectionsServiceMock.findOne).toHaveBeenCalledWith('comp_a', 'sg_1', 's_1', req.user, false, true);
  });

  it('findOneByKey delegates with name/group/key/user/filter/questions', async () => {
    const req = { user: { email: 'user@example.com' } } as any;
    complianceSectionsServiceMock.findOneByKey.mockResolvedValue({ key: 'overview' });

    await expect(controller.findOneByKey('comp_a', 'overview', 'sg_1', req, true as any, true as any)).resolves.toEqual({ key: 'overview' });
    expect(complianceSectionsServiceMock.findOneByKey).toHaveBeenCalledWith('comp_a', 'sg_1', 'overview', req.user, true, true);
  });

  it('update delegates when fields are mismatched', async () => {
    const sectionData = {
      id: 'other_id',
      compliance_section_group_id: 'other_group',
      compliance_definition_name: 'other_name',
    } as any;
    const req = { user: { email: 'user@example.com' } } as any;
    complianceSectionsServiceMock.update.mockResolvedValue({ id: 's_1' });

    await expect(controller.update('comp_a', 'sg_1', 's_1', sectionData, req)).resolves.toEqual({ id: 's_1' });
    expect(complianceSectionsServiceMock.update).toHaveBeenCalledWith('comp_a', 'sg_1', 's_1', sectionData, req);
  });

  it('update delegates when fields are already matching', async () => {
    const sectionData = {
      id: 's_1',
      compliance_section_group_id: 'sg_1',
      compliance_definition_name: 'comp_a',
    } as any;
    const req = { user: { email: 'user@example.com' } } as any;
    complianceSectionsServiceMock.update.mockResolvedValue({ id: 's_1' });

    await expect(controller.update('comp_a', 'sg_1', 's_1', sectionData, req)).resolves.toEqual({ id: 's_1' });
    expect(complianceSectionsServiceMock.update).toHaveBeenCalledWith('comp_a', 'sg_1', 's_1', sectionData, req);
  });

  it('remove delegates to service.remove with id,name,group,user', async () => {
    const req = { user: { email: 'user@example.com' } } as any;
    complianceSectionsServiceMock.remove.mockResolvedValue({ id: 's_1' });

    await expect(controller.remove('comp_a', 'sg_1', 's_1', req)).resolves.toEqual({ id: 's_1' });
    expect(complianceSectionsServiceMock.remove).toHaveBeenCalledWith('s_1', 'comp_a', 'sg_1', req.user);
  });
});
