import { Module } from '@nestjs/common';
import { MemberModule } from './members/member.module';
import { RoleModule } from './roles/role.module';

@Module({
  imports: [MemberModule, RoleModule],
})
export class Auth0Module {}
