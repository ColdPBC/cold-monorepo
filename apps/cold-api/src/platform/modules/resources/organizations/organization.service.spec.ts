import { Test, TestingModule } from '@nestjs/testing';
import { MemberModule } from '../auth0/members/member.module';
import { MemberService } from '../auth0/members/member.service';
import { OrganizationService } from './organization.service';
import { HttpModule } from '@nestjs/axios';
import { ColdCacheModule } from '../../cache/cache.module';
import { RoleModule } from '../auth0/roles/role.module';
import { OrganizationController } from './organization.controller';
import { Auth0UtilityService } from '../auth0/auth0.utility.service';
import { CacheService } from '../../cache/cache.service';
import { RoleService } from '../auth0/roles/role.service';

describe('Auth0Service', () => {
  let service: OrganizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ColdCacheModule, RoleModule, MemberModule],
      controllers: [OrganizationController],
      providers: [OrganizationService, Auth0UtilityService, CacheService, RoleService, MemberService],
      exports: [OrganizationService, Auth0UtilityService],
    }).compile();

    service = module.get<OrganizationService>(OrganizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
