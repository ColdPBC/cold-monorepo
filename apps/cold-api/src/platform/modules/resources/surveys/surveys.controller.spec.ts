import { ZodSurveyTypesSchema } from '@coldpbc/nest';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import { fullReqExample } from '../_global/global.examples';

describe('SurveysController', () => {
  let controller: SurveysController;
  let service: jest.Mocked<
    Pick<
      SurveysService,
      | 'findAll'
      | 'findAllSubmittedSurveysByOrg'
      | 'findDefinitionByType'
      | 'findDefinitionByName'
      | 'findOne'
      | 'submitResults'
      | 'create'
      | 'update'
      | 'remove'
      | 'delete'
    >
  >;

  beforeEach(() => {
    service = {
      findAll: jest.fn(),
      findAllSubmittedSurveysByOrg: jest.fn(),
      findDefinitionByType: jest.fn(),
      findDefinitionByName: jest.fn(),
      findOne: jest.fn(),
      submitResults: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      delete: jest.fn(),
    };

    controller = new SurveysController(service as unknown as SurveysService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('delegates findAll', async () => {
    await controller.findAll(fullReqExample as any, ZodSurveyTypesSchema.enum.TEST as any, 'test');
    expect(service.findAll).toHaveBeenCalledWith(fullReqExample, { name: 'test', type: ZodSurveyTypesSchema.enum.TEST }, undefined);
  });

  it('delegates findByName', async () => {
    await controller.findByName(ZodSurveyTypesSchema.enum.TEST as any, 'test', fullReqExample as any);
    expect(service.findOne).toHaveBeenCalledWith('test', fullReqExample, undefined);
  });

  it('delegates getAllByType', async () => {
    await controller.getAllByType(ZodSurveyTypesSchema.enum.TEST as any, false, fullReqExample as any);
    expect(service.findDefinitionByType).toHaveBeenCalledWith(fullReqExample, ZodSurveyTypesSchema.enum.TEST, false);
  });

  it('delegates submitOrgSurvey', async () => {
    await controller.submitOrgSurvey('org-1', 'test', {} as any, fullReqExample as any);
    expect(service.submitResults).toHaveBeenCalledWith('test', {}, fullReqExample, 'org-1');
  });

  it('delegates create', async () => {
    const payload = {
      updated_at: new Date(),
      created_at: new Date(),
      definition: {},
      description: '',
      id: '',
      name: '',
      type: ZodSurveyTypesSchema.enum.TEST,
    };
    await controller.create(fullReqExample as any, payload as any);
    expect(service.create).toHaveBeenCalledWith(payload, fullReqExample);
  });

  it('delegates update', async () => {
    await controller.update('test', {} as any, fullReqExample as any);
    expect(service.update).toHaveBeenCalledWith('test', {}, fullReqExample);
  });

  it('delegates remove', async () => {
    await controller.remove('test', fullReqExample as any);
    expect(service.remove).toHaveBeenCalledWith('test', fullReqExample);
  });
});
