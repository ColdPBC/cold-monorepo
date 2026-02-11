import { UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceSectionGroupsRepository } from '@coldpbc/nest';
import { ComplianceSectionGroupsService } from './compliance-section-groups.service';

describe('ComplianceSectionGroupsService', () => {
  let service: ComplianceSectionGroupsService;

  const repository = {
    createSectionGroup: jest.fn(),
    getSectionGroupList: jest.fn(),
    getSectionGroup: jest.fn(),
    deleteSectionGroup: jest.fn(),
    updateSectionGroup: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComplianceSectionGroupsService,
        { provide: ComplianceSectionGroupsRepository, useValue: repository },
      ],
    }).compile();

    service = module.get<ComplianceSectionGroupsService>(ComplianceSectionGroupsService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create delegates to repository.createSectionGroup', async () => {
    repository.createSectionGroup.mockResolvedValue({ id: 'sg_1' });

    await expect(service.create({ key: 'overview' } as any)).resolves.toEqual({ id: 'sg_1' });
    expect(repository.createSectionGroup).toHaveBeenCalledWith({ key: 'overview' });
  });

  it('findGroupsByCompliance delegates with name filter', async () => {
    repository.getSectionGroupList.mockResolvedValue([{ id: 'sg_1' }]);

    await expect(service.findGroupsByCompliance('comp_a', true, false)).resolves.toEqual([{ id: 'sg_1' }]);
    expect(repository.getSectionGroupList).toHaveBeenCalledWith({ compliance_definition_name: 'comp_a' }, true, false);
  });

  it('findAll delegates to repository.getSectionGroupList', async () => {
    repository.getSectionGroupList.mockResolvedValue([{ id: 'sg_1' }]);

    await expect(service.findAll('comp_a', false, true)).resolves.toEqual([{ id: 'sg_1' }]);
    expect(repository.getSectionGroupList).toHaveBeenCalledWith({ compliance_definition_name: 'comp_a' }, false, true);
  });

  it('findOne delegates to repository.getSectionGroup', async () => {
    repository.getSectionGroup.mockResolvedValue({ id: 'sg_1' });

    await expect(service.findOne('comp_a', 'sg_1', true, true)).resolves.toEqual({ id: 'sg_1' });
    expect(repository.getSectionGroup).toHaveBeenCalledWith({ compliance_definition_name: 'comp_a', id: 'sg_1' }, true, true);
  });

  it('remove delegates to repository.deleteSectionGroup', async () => {
    repository.deleteSectionGroup.mockResolvedValue({ id: 'sg_1' });

    await expect(service.remove('comp_a', 'sg_1')).resolves.toEqual({ id: 'sg_1' });
    expect(repository.deleteSectionGroup).toHaveBeenCalledWith({ compliance_definition_name: 'comp_a', id: 'sg_1' });
  });

  it('update delegates to repository.updateSectionGroup', async () => {
    repository.updateSectionGroup.mockResolvedValue({ id: 'sg_1' });
    const data = { name: 'Overview' } as any;

    await expect(service.update('comp_a', 'sg_1', data)).resolves.toEqual({ id: 'sg_1' });
    expect(repository.updateSectionGroup).toHaveBeenCalledWith({ compliance_definition_name: 'comp_a', id: 'sg_1' }, data);
  });

  it('create maps synchronous repository throw to UnprocessableEntityException', () => {
    repository.createSectionGroup.mockImplementation(() => {
      throw new Error('create failed');
    });

    expect(() => service.create({ key: 'overview' } as any)).toThrow(UnprocessableEntityException);
  });

  it('remove maps synchronous repository throw to UnprocessableEntityException', () => {
    repository.deleteSectionGroup.mockImplementation(() => {
      throw new Error('delete failed');
    });

    expect(() => service.remove('comp_a', 'sg_1')).toThrow(UnprocessableEntityException);
  });

  it('update maps synchronous repository throw to UnprocessableEntityException', () => {
    repository.updateSectionGroup.mockImplementation(() => {
      throw new Error('update failed');
    });

    expect(() => service.update('comp_a', 'sg_1', { name: 'Overview' } as any)).toThrow(UnprocessableEntityException);
  });
});
