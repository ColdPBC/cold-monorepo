import { Test, TestingModule } from '@nestjs/testing';
import { Auth0TokenService, CacheService, ColdCacheModule, DarklyService, JwtStrategy, PrismaModule, PrismaService } from '@coldpbc/nest';
import { PolicyDefinitionsController } from './policy-definitions.controller';
import { PolicyDefinitionsService } from './policy-definitions.service';
import { OrganizationService } from '../organizations/organization.service';
import { mockDeep } from 'jest-mock-extended';
import { RoleService } from '../auth0/roles/role.service';
import { MemberService } from '../auth0/members/member.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('PolicyContentService', () => {
  let service: PolicyDefinitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ColdCacheModule, ConfigModule.forRoot({ isGlobal: true })],
      controllers: [PolicyDefinitionsController],
      providers: [PolicyDefinitionsService, ConfigService],
      exports: [ConfigService],
    })
      .overrideProvider(OrganizationService)
      .useValue(mockDeep<OrganizationService>())
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
      .compile();

    service = module.get<PolicyDefinitionsService>(PolicyDefinitionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
