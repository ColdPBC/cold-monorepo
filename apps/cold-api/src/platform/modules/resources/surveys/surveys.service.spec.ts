import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy, ColdCacheModule, CacheService, PrismaModule, PrismaService, DarklyService } from 'nest';
import { ComponentDefinitionsService } from '../component-definitions/component-definitions.service';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import { OrganizationService } from '../organizations/organization.service';
import { mockDeep } from 'jest-mock-extended';
import { Auth0UtilityService } from '../auth0/auth0.utility.service';
import { RoleService } from '../auth0/roles/role.service';
import { MemberService } from '../auth0/members/member.service';

describe('Survey Service', () => {
  let service: ComponentDefinitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveysController],
      providers: [ComponentDefinitionsService, DarklyService, SurveysService, JwtService, JwtStrategy, PrismaService, CacheService],
    })
      .overrideProvider(ComponentDefinitionsService)
      .useValue(mockDeep<ComponentDefinitionsService>())
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
      .compile();

    service = module.get<ComponentDefinitionsService>(ComponentDefinitionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
