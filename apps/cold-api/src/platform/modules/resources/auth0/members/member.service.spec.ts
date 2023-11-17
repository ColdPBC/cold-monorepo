import { Test, TestingModule } from '@nestjs/testing';
import { MemberService } from './member.service';
import { HttpModule } from '@nestjs/axios';
import { ColdCacheModule } from '../../../../../../../../libs/nest/src/lib/cache/cache.module';
import { Auth0UtilityService } from '../auth0.utility.service';
import { MemberController } from './member.controller';
import { CacheService } from '../../../../../../../../libs/nest/src/lib/cache/cache.service';
import { AuthorizationModule } from '../../../../authorization/authorization.module';

describe('Auth0UserService', () => {
  let service: MemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthorizationModule, HttpModule, ColdCacheModule],
      controllers: [MemberController],
      providers: [MemberService, Auth0UtilityService, CacheService],
      exports: [MemberService, Auth0UtilityService, CacheService],
    }).compile();

    service = module.get<MemberService>(MemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
