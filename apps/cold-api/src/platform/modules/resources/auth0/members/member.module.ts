import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthorizationModule, CacheService } from '@coldpbc/nest';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

@Module({
  imports: [AuthorizationModule, HttpModule],
  controllers: [MemberController],
  providers: [MemberService, CacheService],
  exports: [MemberService, CacheService],
})
export class MemberModule {}
