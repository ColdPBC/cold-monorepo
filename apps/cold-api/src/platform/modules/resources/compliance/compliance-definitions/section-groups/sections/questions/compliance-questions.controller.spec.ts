import { ComplianceQuestionsController } from './compliance-questions.controller';

describe('ComplianceQuestionsController', () => {
  let controller: ComplianceQuestionsController;
  const complianceQuestionsServiceMock = {
    createMany: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new ComplianceQuestionsController(complianceQuestionsServiceMock as any);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createMany delegates to service.createMany', async () => {
    const dto = [{ key: 'q1' }, { key: 'q2' }] as any;
    complianceQuestionsServiceMock.createMany.mockResolvedValue([{ id: 'q_1' }, { id: 'q_2' }]);

    await expect(controller.createMany('comp_a', 'sg_1', 's_1', dto)).resolves.toEqual([{ id: 'q_1' }, { id: 'q_2' }]);
    expect(complianceQuestionsServiceMock.createMany).toHaveBeenCalledWith(dto);
  });

  it('create mutates dto with compliance name and section id before delegating', async () => {
    const dto = { key: 'q1' } as any;
    complianceQuestionsServiceMock.create.mockResolvedValue({ id: 'q_1' });

    await expect(controller.create('comp_a', 'sg_1', 's_1', dto)).resolves.toEqual({ id: 'q_1' });
    expect(dto.compliance_definition_name).toBe('comp_a');
    expect(dto.compliance_section_id).toBe('s_1');
    expect(complianceQuestionsServiceMock.create).toHaveBeenCalledWith(dto);
  });

  it('findBySection delegates with expected query object', async () => {
    complianceQuestionsServiceMock.findAll.mockResolvedValue([{ id: 'q_1' }]);

    await expect(controller.findBySection('comp_a', 'sg_1', 's_1')).resolves.toEqual([{ id: 'q_1' }]);
    expect(complianceQuestionsServiceMock.findAll).toHaveBeenCalledWith({
      compliance_definition_name: 'comp_a',
      compliance_section_id: 's_1',
      compliance_section_group_id: 'sg_1',
    });
  });

  it('findOne delegates using id criteria', async () => {
    complianceQuestionsServiceMock.findOne.mockResolvedValue({ id: 'q_1' });

    await expect(controller.findOne('comp_a', 'sg_1', 's_1', 'q_1')).resolves.toEqual({ id: 'q_1' });
    expect(complianceQuestionsServiceMock.findOne).toHaveBeenCalledWith({ id: 'q_1' });
  });

  it('findByKeyAndName delegates using compliance name + key', async () => {
    complianceQuestionsServiceMock.findOne.mockResolvedValue({ id: 'q_1' });

    await expect(controller.findByKeyAndName('sg_1', 's_1', 'comp_a', 'question_key')).resolves.toEqual({ id: 'q_1' });
    expect(complianceQuestionsServiceMock.findOne).toHaveBeenCalledWith({
      compliance_definition_name: 'comp_a',
      key: 'question_key',
    });
  });

  it('update sets id when provided and delegates', async () => {
    const dto = { key: 'q1' } as any;
    complianceQuestionsServiceMock.update.mockResolvedValue({ id: 'q_1', key: 'q1' });

    await expect(controller.update('comp_a', 'sg_1', 's_1', 'q_1', dto)).resolves.toEqual({ id: 'q_1', key: 'q1' });
    expect(dto.id).toBe('q_1');
    expect(complianceQuestionsServiceMock.update).toHaveBeenCalledWith(dto);
  });

  it('update leaves dto.id unchanged when id param is empty', async () => {
    const dto = { key: 'q1' } as any;
    complianceQuestionsServiceMock.update.mockResolvedValue({ key: 'q1' });

    await expect(controller.update('comp_a', 'sg_1', 's_1', '' as any, dto)).resolves.toEqual({ key: 'q1' });
    expect(dto.id).toBeUndefined();
    expect(complianceQuestionsServiceMock.update).toHaveBeenCalledWith(dto);
  });

  it('remove delegates to service.remove', async () => {
    complianceQuestionsServiceMock.remove.mockResolvedValue({ id: 'q_1' });

    await expect(controller.remove('comp_a', 'sg_1', 's_1', 'q_1')).resolves.toEqual({ id: 'q_1' });
    expect(complianceQuestionsServiceMock.remove).toHaveBeenCalledWith('q_1');
  });
});
