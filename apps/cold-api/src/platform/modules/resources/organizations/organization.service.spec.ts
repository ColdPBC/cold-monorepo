import { Test, TestingModule } from '@nestjs/testing';
import { MemberModule } from '../auth0/members/member.module';
import { MemberService } from '../auth0/members/member.service';
import { OrganizationService } from './organization.service';
import { HttpModule } from '@nestjs/axios';
import { ColdCacheModule, CacheService, JwtStrategy, PrismaService, DarklyService } from '@coldpbc/nest';
import { RoleModule } from '../auth0/roles/role.module';
import { OrganizationController } from './organization.controller';
import { Auth0UtilityService } from '../auth0/auth0.utility.service';
import { RoleService } from '../auth0/roles/role.service';
import { mockDeep } from 'jest-mock-extended';
import { JwtService } from '@nestjs/jwt';

describe('Organization Service', () => {
  let service: OrganizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationService, Auth0UtilityService, CacheService, RoleService, MemberService, DarklyService],
      exports: [OrganizationService, Auth0UtilityService],
    })
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

    service = module.get<OrganizationService>(OrganizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
