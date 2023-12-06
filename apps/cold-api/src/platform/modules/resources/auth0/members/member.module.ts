import { Module } from '@nestjs/common';
import { Auth0UtilityService } from '../auth0.utility.service';
import { HttpModule } from '@nestjs/axios';
import { CacheService, AuthorizationModule, ColdCacheModule } from '@coldpbc/nest';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

@Module({
  imports: [AuthorizationModule, HttpModule, ColdCacheModule],
  controllers: [MemberController],
  providers: [MemberService, Auth0UtilityService, CacheService],
  exports: [MemberService, Auth0UtilityService, CacheService],
})
export class MemberModule {}
