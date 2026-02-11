import { ComplianceSectionsService } from './compliance-sections.service';

describe('ComplianceSectionsService', () => {
  let service: ComplianceSectionsService;
  const repositoryMock = {
    createSection: jest.fn(),
    getSectionListByGroup: jest.fn(),
    getSectionListByComplianceAndGroup: jest.fn(),
    getSectionByComplianceAndId: jest.fn(),
    getSectionByComplianceAndKey: jest.fn(),
    updateSection: jest.fn(),
    deleteSection: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ComplianceSectionsService(repositoryMock as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create delegates to repository.createSection', async () => {
    const sectionData = { key: 'overview' } as any;
    const user = { email: 'user@example.com' } as any;
    repositoryMock.createSection.mockResolvedValue({ id: 'sec_1' });

    await expect(service.create(sectionData, user)).resolves.toEqual({ id: 'sec_1' });
    expect(repositoryMock.createSection).toHaveBeenCalledWith(sectionData, user);
  });

  it('findAll delegates with composed section group filter', async () => {
    const user = { email: 'user@example.com' } as any;
    repositoryMock.getSectionListByGroup.mockResolvedValue([{ id: 'sec_1' }]);

    await expect(service.findAll('comp_a', 'group_1', user, true, false)).resolves.toEqual([{ id: 'sec_1' }]);
    expect(repositoryMock.getSectionListByGroup).toHaveBeenCalledWith(
      { compliance_definition_name: 'comp_a', compliance_section_group_id: 'group_1' },
      user,
      true,
      false,
    );
  });

  it('findSectionsByComplianceAndGroup delegates to repository', async () => {
    const user = { email: 'user@example.com' } as any;
    repositoryMock.getSectionListByComplianceAndGroup.mockResolvedValue([{ id: 'sec_1' }]);

    await expect(service.findSectionsByComplianceAndGroup('comp_a', user, 'group_1', false, true)).resolves.toEqual([{ id: 'sec_1' }]);
    expect(repositoryMock.getSectionListByComplianceAndGroup).toHaveBeenCalledWith('comp_a', 'group_1', user, false, true);
  });

  it('findSectionsByGroup delegates with expected filter object', async () => {
    const user = { email: 'user@example.com' } as any;
    repositoryMock.getSectionListByGroup.mockResolvedValue([{ id: 'sec_1' }]);

    await expect(service.findSectionsByGroup('comp_a', 'group_1', user, false, false)).resolves.toEqual([{ id: 'sec_1' }]);
    expect(repositoryMock.getSectionListByGroup).toHaveBeenCalledWith(
      { compliance_definition_name: 'comp_a', compliance_section_group_id: 'group_1' },
      user,
      false,
      false,
    );
  });

  it('findOne delegates to repository.getSectionByComplianceAndId', async () => {
    const user = { email: 'user@example.com' } as any;
    repositoryMock.getSectionByComplianceAndId.mockResolvedValue({ id: 'sec_1' });

    await expect(service.findOne('comp_a', 'group_1', 'sec_1', user, true, true)).resolves.toEqual({ id: 'sec_1' });
    expect(repositoryMock.getSectionByComplianceAndId).toHaveBeenCalledWith('comp_a', 'group_1', 'sec_1', user, true, true);
  });

  it('findOneByKey delegates to repository.getSectionByComplianceAndKey', async () => {
    const user = { email: 'user@example.com' } as any;
    repositoryMock.getSectionByComplianceAndKey.mockResolvedValue({ key: 'overview' });

    await expect(service.findOneByKey('comp_a', 'group_1', 'overview', user, true, false)).resolves.toEqual({ key: 'overview' });
    expect(repositoryMock.getSectionByComplianceAndKey).toHaveBeenCalledWith('comp_a', 'group_1', 'overview', user, true, false);
  });

  it('findOneByKeyAndName forwards arguments in service-defined order', async () => {
    const user = { email: 'user@example.com' } as any;
    repositoryMock.getSectionByComplianceAndKey.mockResolvedValue({ key: 'overview' });

    await expect(service.findOneByKeyAndName('group_1', 'comp_a', user, 'overview', false, true)).resolves.toEqual({ key: 'overview' });
    expect(repositoryMock.getSectionByComplianceAndKey).toHaveBeenCalledWith('group_1', 'comp_a', 'overview', user, false, true);
  });

  it('update mutates sectionData id and compliance name before calling repository', async () => {
    const user = { email: 'user@example.com' } as any;
    const sectionData = { key: 'overview' } as any;
    repositoryMock.updateSection.mockResolvedValue({ id: 'sec_1', compliance_definition_name: 'comp_a' });

    await expect(service.update('comp_a', 'group_1', 'sec_1', sectionData, user)).resolves.toEqual({
      id: 'sec_1',
      compliance_definition_name: 'comp_a',
    });
    expect(sectionData.id).toBe('sec_1');
    expect(sectionData.compliance_definition_name).toBe('comp_a');
    expect(repositoryMock.updateSection).toHaveBeenCalledWith('comp_a', 'group_1', 'sec_1', sectionData, user);
  });

  it('remove delegates to repository.deleteSection', async () => {
    const user = { email: 'user@example.com' } as any;
    repositoryMock.deleteSection.mockResolvedValue({ id: 'sec_1' });

    await expect(service.remove('sec_1', 'comp_a', 'group_1', user)).resolves.toEqual({ id: 'sec_1' });
    expect(repositoryMock.deleteSection).toHaveBeenCalledWith('comp_a', 'group_1', 'sec_1', user);
  });
});
