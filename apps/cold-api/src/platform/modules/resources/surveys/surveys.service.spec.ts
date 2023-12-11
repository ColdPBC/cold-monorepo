import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { CacheService, DarklyService, JwtStrategy, PrismaService } from '@coldpbc/nest';
import { ComponentDefinitionsService } from '../component-definitions/component-definitions.service';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import { mockDeep } from 'jest-mock-extended';
import { RoleService } from '../auth0/roles/role.service';
import { MemberService } from '../auth0/members/member.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('Survey Service', () => {
  let service: ComponentDefinitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [SurveysController],
      providers: [ComponentDefinitionsService, DarklyService, SurveysService, JwtService, JwtStrategy, PrismaService, CacheService, ConfigService],
    })
      .overrideProvider(ComponentDefinitionsService)
      .useValue(mockDeep<ComponentDefinitionsService>())
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
