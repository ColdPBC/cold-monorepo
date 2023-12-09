import { Test, TestingModule } from '@nestjs/testing';
import { MemberService } from '../auth0/members/member.service';
import { OrganizationService } from './organization.service';
import { Auth0TokenService, CacheService, DarklyService, JwtStrategy, PrismaService } from '@coldpbc/nest';
import { RoleService } from '../auth0/roles/role.service';
import { mockDeep } from 'jest-mock-extended';
import { JwtService } from '@nestjs/jwt';

describe('Organization Service', () => {
  let service: OrganizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationService, Auth0TokenService, CacheService, RoleService, MemberService, DarklyService],
      exports: [OrganizationService, Auth0TokenService],
    })
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

    service = module.get<OrganizationService>(OrganizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
