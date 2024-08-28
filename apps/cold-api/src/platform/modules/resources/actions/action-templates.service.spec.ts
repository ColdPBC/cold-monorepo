import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { CacheService, PrismaService } from '@coldpbc/nest';
import { actionTemplatePatchExample, actionTemplatePostExample } from './examples/action-template.examples';

import { SurveysService } from '../surveys/surveys.service';
import { v4 } from 'uuid';
import { ActionTemplatesService } from './action-templates.service';
import { ActionsService } from './actions.service';
import { mockDeep } from 'jest-mock-extended';
import { fullReqExample } from '../_global/global.examples';

describe('ActionsService', () => {
  let service: ActionTemplatesService;
  let actionTemplatesService: ActionTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [ActionTemplatesService, PrismaService, ActionsService, JwtService, SurveysService, CacheService],
    })
      .overrideProvider(PrismaService)
      .useValue({
        action_templates: {
          findMany: () => {
            return [actionTemplatePostExample];
          },
          findUnique: () => {
            return actionTemplatePostExample;
          },
          create: () => {
            return actionTemplatePostExample;
          },
          update: () => {
            return actionTemplatePatchExample;
          },
          delete: () => {
            return null;
          },
        },
      })
      .overrideProvider(CacheService)
      .useValue(mockDeep<CacheService>())
      .overrideProvider(JwtService)
      .useValue(mockDeep<JwtService>())
      .overrideProvider(ActionsService)
      .useValue(mockDeep<ActionsService>())
      .overrideProvider(SurveysService)
      .useValue(mockDeep<SurveysService>())
      .compile();

    actionTemplatesService = module.get(ActionTemplatesService);

    service = module.get<ActionTemplatesService>(ActionTemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('created action matches template', async () => {
    const response = await actionTemplatesService.createActionTemplate(fullReqExample, actionTemplatePostExample);
    expect(response).toMatchObject(actionTemplatePostExample);
  });

  it('get action matches template', async () => {
    const response = await actionTemplatesService.getActionTemplates(fullReqExample);
    expect(response).toMatchObject([actionTemplatePostExample]);
  });

  it('update action matches template', async () => {
    const response = await actionTemplatesService.updateActionTemplate(fullReqExample, v4(), actionTemplatePatchExample);
    expect(response).toMatchObject(actionTemplatePatchExample);
  });

  it('delete action returns correct id', async () => {
    const id = v4();
    const response = await actionTemplatesService.deleteActionTemplate(fullReqExample, id);
    expect(response).toEqual(`Action ${id} deleted`);
  });
});
