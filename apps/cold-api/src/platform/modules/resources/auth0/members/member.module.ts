import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthorizationModule } from '@coldpbc/nest';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

@Module({
	imports: [AuthorizationModule, HttpModule],
	controllers: [MemberController],
	providers: [MemberService],
	exports: [MemberService],
})
export class MemberModule {}
