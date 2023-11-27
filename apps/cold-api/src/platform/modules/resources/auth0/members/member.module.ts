import { Module } from '@nestjs/common';
import { Auth0UtilityService } from '../auth0.utility.service';
import { HttpModule } from '@nestjs/axios';
import { ColdCacheModule } from '../../../../../../../../libs/nest/src/lib/cache/cache.module';
import { CacheService } from '../../../../../../../../libs/nest/src/lib/cache/cache.service';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { AuthorizationModule } from '../../../../../../../../libs/nest/src/lib/authorization/authorization.module';

@Module({
  imports: [AuthorizationModule, HttpModule, ColdCacheModule],
  controllers: [MemberController],
  providers: [MemberService, Auth0UtilityService, CacheService],
  exports: [MemberService, Auth0UtilityService, CacheService],
})
export class MemberModule {}
