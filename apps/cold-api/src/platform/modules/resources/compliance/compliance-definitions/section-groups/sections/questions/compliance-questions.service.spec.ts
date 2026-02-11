import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceQuestionsRepository } from '@coldpbc/nest';
import { ComplianceQuestionsService } from './compliance-questions.service';

describe('ComplianceQuestionsService', () => {
  let service: ComplianceQuestionsService;

  const repository = {
    createQuestion: jest.fn(),
    createQuestions: jest.fn(),
    getQuestionList: jest.fn(),
    getQuestion: jest.fn(),
    getQuestionByKeyAndComplianceName: jest.fn(),
    updateQuestion: jest.fn(),
    deleteQuestion: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComplianceQuestionsService,
        { provide: ComplianceQuestionsRepository, useValue: repository },
      ],
    }).compile();

    service = module.get<ComplianceQuestionsService>(ComplianceQuestionsService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create delegates to repository.createQuestion', async () => {
    repository.createQuestion.mockResolvedValue({ id: 'q_1' });

    await expect(service.create({ key: 'q1' } as any)).resolves.toEqual({ id: 'q_1' });
    expect(repository.createQuestion).toHaveBeenCalledWith({ key: 'q1' });
  });

  it('createMany delegates to repository.createQuestions', async () => {
    repository.createQuestions.mockResolvedValue([{ id: 'q_1' }]);

    await expect(service.createMany([{ key: 'q1' }] as any)).resolves.toEqual([{ id: 'q_1' }]);
    expect(repository.createQuestions).toHaveBeenCalledWith([{ key: 'q1' }]);
  });

  it('findAll delegates when compliance_definition_name is provided', async () => {
    repository.getQuestionList.mockResolvedValue([{ id: 'q_1' }]);

    await expect(service.findAll({ compliance_definition_name: 'comp_a' })).resolves.toEqual([{ id: 'q_1' }]);
    expect(repository.getQuestionList).toHaveBeenCalledWith({
      compliance_section_id: undefined,
      compliance_section_group_id: undefined,
      compliance_definition_name: 'comp_a',
    });
  });

  it('findAll delegates when compliance_section_id is provided', async () => {
    repository.getQuestionList.mockResolvedValue([{ id: 'q_1' }]);

    await expect(service.findAll({ compliance_section_id: 's_1', compliance_section_group_id: 'sg_1' })).resolves.toEqual([{ id: 'q_1' }]);
    expect(repository.getQuestionList).toHaveBeenCalledWith({
      compliance_section_id: 's_1',
      compliance_section_group_id: 'sg_1',
      compliance_definition_name: undefined,
    });
  });

  it('findAll throws BadRequestException when neither compliance_definition_name nor compliance_section_id is provided', async () => {
    expect(() => service.findAll({ compliance_section_group_id: 'sg_1' })).toThrow(BadRequestException);
  });

  it('findOne by id delegates to repository.getQuestion', async () => {
    repository.getQuestion.mockResolvedValue({ id: 'q_1' });

    await expect(service.findOne({ id: 'q_1' })).resolves.toEqual({ id: 'q_1' });
    expect(repository.getQuestion).toHaveBeenCalledWith('q_1');
  });

  it('findOne by compliance_definition_name and key delegates to repository.getQuestionByKeyAndComplianceName', async () => {
    repository.getQuestionByKeyAndComplianceName.mockResolvedValue({ id: 'q_1' });

    await expect(service.findOne({ compliance_definition_name: 'comp_a', key: 'question_key' })).resolves.toEqual({ id: 'q_1' });
    expect(repository.getQuestionByKeyAndComplianceName).toHaveBeenCalledWith({
      compliance_definition_name: 'comp_a',
      key: 'question_key',
    });
  });

  it('findOne throws when neither id nor name+key is provided', async () => {
    expect(() => service.findOne({ compliance_definition_name: 'comp_a' })).toThrow('you must provide either id or compliance_definition_name and key');
  });

  it('update delegates to repository.updateQuestion', async () => {
    repository.updateQuestion.mockResolvedValue({ id: 'q_1' });

    await expect(service.update({ id: 'q_1', key: 'k' } as any)).resolves.toEqual({ id: 'q_1' });
    expect(repository.updateQuestion).toHaveBeenCalledWith({ id: 'q_1', key: 'k' });
  });

  it('remove delegates to repository.deleteQuestion', async () => {
    repository.deleteQuestion.mockResolvedValue(undefined);

    await expect(service.remove('q_1')).resolves.toBeUndefined();
    expect(repository.deleteQuestion).toHaveBeenCalledWith('q_1');
  });
});
