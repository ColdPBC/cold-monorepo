import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthorizationModule, CacheService, ColdCacheModule, MqttModule } from '@coldpbc/nest';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

@Module({
  imports: [AuthorizationModule, HttpModule, ColdCacheModule, MqttModule],
  controllers: [MemberController],
  providers: [MemberService, CacheService],
  exports: [MemberService, CacheService],
})
export class MemberModule {}
