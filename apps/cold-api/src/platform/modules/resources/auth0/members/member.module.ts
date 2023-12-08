import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { Auth0TokenService, AuthorizationModule, CacheService, ColdCacheModule } from '@coldpbc/nest';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

@Module({
  imports: [AuthorizationModule, HttpModule, ColdCacheModule],
  controllers: [MemberController],
  providers: [MemberService, Auth0TokenService, CacheService],
  exports: [MemberService, Auth0TokenService, CacheService],
})
export class MemberModule {}
