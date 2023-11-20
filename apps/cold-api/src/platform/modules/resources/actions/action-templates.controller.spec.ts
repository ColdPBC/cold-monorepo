import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { CacheService, PrismaService } from 'nest';
import { SurveysService } from '../surveys/surveys.service';
import { ActionTemplatesController } from './action-templates.controller';
import { ActionTemplatesService } from './action-templates.service';
import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';
import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
const authUser = {
  company_id: null,
  coldclimate_claims: {
    email: 'test@test.com',
    org_id: 'org_123',
    id: 'auth0|123',
    roles: ['cold:admin'],
  },
  iss: 'string',
  sub: 'string',
  azp: 'string',
  aud: ['coldclimate.online'],
  iat: 123,
  exp: 123,
  scope: 'blah',
  permissions: ['read:all'],
  isAdmin: true,
  isOwner: false,
  isColdAdmin: true,
  isMember: false,
};
const mock = {
  template: {
    steps: [
      {
        complete: false,
        overview: "Sign up for your utility's renewable energy program",
        description: 'Test Step 3',
      },
    ],
    title: 'Test Action Template',
    due_date: '2023-10-05T19:15:14.550Z',
    overview: "Reduce your company's reliance on fossil fuels by purchasing renewable electricity for your facility.",
    image_url:
      'https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    subcategory: 'facilities',
    areas_of_impact: ['Electricity'],
    ready_to_execute: false,
    dependent_surveys: [
      {
        name: 'test_survey',
      },
    ],
    process_description: 'this is our process_description',
    objective_description: 'Test Objective Description',
  },
};

describe('ActionsController', () => {
  let controller: ActionTemplatesController;
  let actionTemplatesService: ActionTemplatesService;
  let surveysService: SurveysService;
  let actionsService: ActionsService;
  let jwtService: JwtService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActionsController, ActionTemplatesController],
      providers: [ActionTemplatesService, PrismaService, ActionsService, JwtService, SurveysService, CacheService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .overrideProvider(CacheService)
      .useValue(mockDeep<CacheService>())
      .overrideProvider(JwtService)
      .useValue(mockDeep<JwtService>())
      .overrideProvider(ActionsService)
      .useValue(mockDeep<ActionsService>())
      .overrideProvider(SurveysService)
      .useValue(mockDeep<SurveysService>())
      .overrideProvider(ActionTemplatesService)
      .useValue(mockDeep<ActionTemplatesService>())
      .compile();

    actionsService = module.get(ActionsService);
    surveysService = module.get(SurveysService);
    jwtService = module.get(JwtService);
    actionTemplatesService = module.get(ActionTemplatesService);
    prisma = module.get(PrismaService);

    controller = module.get<ActionTemplatesController>(ActionTemplatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create action template works', async () => {
    const response = await controller.createActionTemplate(mock, { headers: {}, query: {}, user: authUser });
    expect(response).toMatchObject(mock);
  });
});
