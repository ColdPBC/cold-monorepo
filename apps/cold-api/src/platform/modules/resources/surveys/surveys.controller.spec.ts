import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Auth0TokenService, CacheService, DarklyService, JwtStrategy, PrismaService, ZodSurveyTypesSchema } from '@coldpbc/nest';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import { mockDeep } from 'jest-mock-extended';
import { RoleService } from '../auth0/roles/role.service';
import { MemberService } from '../auth0/members/member.service';
import { fullReqExample } from '../_global/global.examples';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('Surveys Controller', () => {
  let controller: SurveysController;
  let service: SurveysService;
  /*
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [SurveysController],
      providers: [ConfigService, DarklyService, SurveysService, JwtService, JwtStrategy, PrismaService, CacheService],
    })
      .overrideProvider(SurveysService)
      .useValue(mockDeep<SurveysService>())
      .overrideProvider(Auth0TokenService)
      .useValue(mockDeep<Auth0TokenService>())
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
    await controller.findAll(fullReqExample, ZodSurveyTypesSchema.enum.TEST, 'test');
    expect(service.findAll).toHaveBeenCalled();
  });

  it('FindOne called', async () => {
    await controller.findByName('TEST', 'test', fullReqExample);
    expect(service.findOne).toHaveBeenCalled();
  });

  it('FindAllByType called', async () => {
    await controller.getAllByType('TEST', false, fullReqExample);
    expect(service.findDefinitionByType).toHaveBeenCalled();
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
      description: '',
      id: '',
      name: '',
      type: 'TEST',
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
  });*/
});
