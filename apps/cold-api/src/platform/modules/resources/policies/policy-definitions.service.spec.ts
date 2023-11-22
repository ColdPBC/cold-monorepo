import { Test, TestingModule } from '@nestjs/testing';
import { CacheService, ColdCacheModule, DarklyService, JwtStrategy, PrismaModule, PrismaService } from 'nest';
import { PolicyDefinitionsController } from './policy-definitions.controller';
import { PolicyDefinitionsService } from './policy-definitions.service';
import { OrganizationService } from '../organizations/organization.service';
import { mockDeep } from 'jest-mock-extended';
import { Auth0UtilityService } from '../auth0/auth0.utility.service';
import { RoleService } from '../auth0/roles/role.service';
import { MemberService } from '../auth0/members/member.service';
import { JwtService } from '@nestjs/jwt';

describe('PolicyContentService', () => {
  let service: PolicyDefinitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ColdCacheModule],
      controllers: [PolicyDefinitionsController],
      providers: [PolicyDefinitionsService],
    })
      .overrideProvider(OrganizationService)
      .useValue(mockDeep<OrganizationService>())
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

    service = module.get<PolicyDefinitionsService>(PolicyDefinitionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
