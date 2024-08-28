import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Auth0TokenService, CacheService, DarklyService, JwtStrategy, PrismaService } from '@coldpbc/nest';
import { ComponentDefinitionsService } from '../component-definitions/component-definitions.service';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import { mockDeep } from 'jest-mock-extended';
import { RoleService } from '../auth0/roles/role.service';
import { MemberService } from '../auth0/members/member.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

import * as store from 'cache-manager';
import { authenticatedUserExample, generateSurveyMock, generateSurveyTypesMock } from '../_global/global.examples';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { undefined } from 'zod';

describe('Survey Service', () => {
  let service: SurveysService;
  let prismaService: PrismaService;
  let origin = generateSurveyMock();
  let updated = generateSurveyMock();
  let surveyType = generateSurveyTypesMock();
  origin.type = surveyType;
  updated.type = surveyType;
  const surveys = [origin];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [SurveysController],
      providers: [
        {
          provide: CACHE_MANAGER,
          useFactory: () => store.caching('memory'), // Provide your mock for CACHE_MANAGER
        },
        ConfigService,
        ComponentDefinitionsService,
        DarklyService,
        SurveysService,
        JwtService,
        JwtStrategy,
        PrismaService,
        CacheService,
      ],
      exports: [
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn().mockResolvedValue(null),
            set: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    })
      .overrideProvider(CACHE_MANAGER)
      .useValue(
        mockDeep<{
          get: jest.Mock<any, any>;
          set: jest.Mock<any, any>;
        }>(),
      )
      .overrideProvider(CacheService)
      .useValue(mockDeep<CacheService>())
      .overrideProvider(DarklyService)
      .useValue(mockDeep<DarklyService>())
      .overrideProvider(ComponentDefinitionsService)
      .useValue(mockDeep<ComponentDefinitionsService>())
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

      .overrideProvider(DarklyService)
      .useValue({
        getJSONFlag: jest.fn().mockReturnValue(true),
      })
      .compile();

    //service = module.get<ComponentDefinitionsService>(ComponentDefinitionsService);
    service = module.get<SurveysService>(SurveysService);
    prismaService = module.get<PrismaService>(PrismaService);

    jest.spyOn(prismaService.survey_definitions, 'delete').mockResolvedValue(null as any);
    jest.spyOn(prismaService.survey_definitions, 'create').mockResolvedValue(origin as any);
    jest.spyOn(prismaService.survey_definitions, 'findMany').mockResolvedValue(surveys as any);
    jest.spyOn(prismaService.survey_definitions, 'findUnique').mockResolvedValue(origin as any);
    jest.spyOn(prismaService.survey_definitions, 'update').mockResolvedValue(updated as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return survey definition by type', async () => {
    const result = await service.findDefinitionByType(
      {
        organization: {
          id: '',
          name: '',
          display_name: '',
          enabled_connections: null,
          branding: null,
          phone: null,
          email: null,
          created_at: new Date(),
          updated_at: new Date(),
          isTest: false,
          website: null,
          deleted: false,
        },
        user: authenticatedUserExample,
      },
      generateSurveyTypesMock(),
    );
    expect(result).toEqual(surveys);
  });

  it('should create a new survey definition', async () => {
    const result = await service.create(origin as any, {
      organization: {
        id: '',
        name: '',
        display_name: '',
        enabled_connections: null,
        branding: null,
        phone: null,
        email: null,
        created_at: new Date(),
        updated_at: new Date(),
        isTest: false,
        website: null,
        deleted: false,
      },
      user: authenticatedUserExample,
    });
    expect(result).toEqual(origin);
  });

  it('should update a survey', async () => {
    const result = await service.update(updated.name, updated as any, {
      organization: {
        id: '',
        name: '',
        display_name: '',
        enabled_connections: null,
        branding: null,
        phone: null,
        email: null,
        created_at: new Date(),
        updated_at: new Date(),
        isTest: false,
        website: null,
        deleted: false,
      },
      user: authenticatedUserExample,
    });
    //expect(result).toEqual(updated);
  });

  it('should delete a survey', async () => {
    await service.remove(origin.name, {
      organization: {
        id: '',
        name: '',
        display_name: '',
        enabled_connections: null,
        branding: null,
        phone: null,
        email: null,
        created_at: new Date(),
        updated_at: new Date(),
        isTest: false,
        website: null,
        deleted: false,
      },
      user: authenticatedUserExample,
    });
    expect(prismaService.survey_definitions.delete).toHaveBeenCalledWith({ where: { name: origin.name } });
  });

  it('should throw an error when trying to get a survey that does not exist', async () => {
    jest.spyOn(prismaService.survey_definitions, 'findUnique').mockResolvedValue(null);
    await expect(
      service.findOne(origin.name, {
        organization: {
          id: '',
          name: '',
          display_name: '',
          enabled_connections: null,
          branding: null,
          phone: null,
          email: null,
          created_at: new Date(),
          updated_at: new Date(),
          isTest: false,
          website: null,
          deleted: false,
        },
        user: authenticatedUserExample,
      }),
    ).rejects.toThrow();
  });

  it('should throw an error when trying to update a survey that does not exist', async () => {
    jest.spyOn(prismaService.survey_definitions, 'findUnique').mockResolvedValue(null);
    await expect(
      service.update(origin.name, generateSurveyMock() as any, {
        organization: {
          id: '',
          name: '',
          display_name: '',
          enabled_connections: null,
          branding: null,
          phone: null,
          email: null,
          created_at: new Date(),
          updated_at: new Date(),
          isTest: false,
          website: null,
          deleted: false,
        },
        user: authenticatedUserExample,
      }),
    ).rejects.toThrow();
  });

  it('should throw an error when trying to delete a survey that does not exist', async () => {
    jest.spyOn(prismaService.survey_definitions, 'delete').mockImplementation(() => {
      throw new Error('Record to delete does not exist.');
    });
    await expect(
      service.remove(origin.name, {
        organization: {
          id: '',
          name: '',
          display_name: '',
          enabled_connections: null,
          branding: null,
          phone: null,
          email: null,
          created_at: new Date(),
          updated_at: new Date(),
          isTest: false,
          website: null,
          deleted: false,
        },
        user: authenticatedUserExample,
      }),
    ).rejects.toThrow();
  });
});
