import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy, SurveyDefinitionsEntity, CacheService, PrismaModule, PrismaService, DarklyService } from '@coldpbc/nest';
import { ComponentDefinitionsController } from '../component-definitions/component-definitions.controller';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import { OrganizationService } from '../organizations/organization.service';
import { mockDeep } from 'jest-mock-extended';
import { Auth0UtilityService } from '../auth0/auth0.utility.service';
import { RoleService } from '../auth0/roles/role.service';
import { MemberService } from '../auth0/members/member.service';
import { fullReqExample } from '../_global/global.examples';
import Survey_typesSchema from '../../../../../../../libs/validation/src/generated/inputTypeSchemas/survey_typesSchema';
import {undefined} from "zod";

describe('Surveys Controller', () => {
  let controller: SurveysController;
  let service: SurveysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveysController],
      providers: [DarklyService, SurveysService, JwtService, JwtStrategy, PrismaService, CacheService],
    })
      .overrideProvider(SurveysService)
      .useValue(mockDeep<SurveysService>())
      .overrideProvider(Auth0UtilityService)
      .useValue(mockDeep<Auth0UtilityService>())
      .overrideProvider(RoleService)
      .useValue(mockDeep<RoleService>())
      .overrideProvider(MemberService)
      .useValue(mockDeep<MemberService>())
      .overrideProvider(JwtService)
      .useValue(mockDeep<JwtService>())
      .overrideProvider(JwtStrategy)
      .useValue(mockDeep<JwtStrategy>())
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaService>())
      .overrideProvider(CacheService)
      .useValue(mockDeep<CacheService>())
      .overrideProvider(DarklyService)
      .useValue({
        getJSONFlag: jest.fn().mockReturnValue(true),
      })
      .compile({
        snapshot: true,
      });

    service = module.get<SurveysService>(SurveysService);
    controller = module.get<SurveysController>(SurveysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('FindAll called', async () => {
    await controller.findAll(fullReqExample, Survey_typesSchema.enum.TEST, 'test');
    expect(service.findAll).toHaveBeenCalled();
  });

  it('FindOne called', async () => {
    await controller.findOne('TEST', 'test', fullReqExample);
    expect(service.findOne).toHaveBeenCalled();
  });

  it('FindAllByType called', async () => {
    await controller.getAllByType('TEST', fullReqExample);
    expect(service.findByType).toHaveBeenCalled();
  });

  it('SubmitResults called', async () => {
    await controller.submitOrgSurvey('TEST', 'test', {}, fullReqExample);
    expect(service.submitResults).toHaveBeenCalled();
  });

  it('Create called', async () => {
    await controller.create(fullReqExample, {
      updated_at: new Date(),
      created_at: new Date(),
      definition: {},
      description: "",
      id: "",
      name: "",
      type: "TEST"
    });
    expect(service.create).toHaveBeenCalled();
  });

  it('Update called', async () => {
    await controller.update('test', {}, fullReqExample);
    expect(service.update).toHaveBeenCalled();
  });

  it('Remove called', async () => {
    await controller.remove('test', fullReqExample);
    expect(service.remove).toHaveBeenCalled();
  });
});
