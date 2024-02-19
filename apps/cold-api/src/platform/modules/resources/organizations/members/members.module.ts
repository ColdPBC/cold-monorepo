import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { RoleModule } from '../../auth0/roles/role.module';
import { MemberModule } from '../../auth0/members/member.module';
import { OrgRolesModule } from '../roles/roles.module';
import { MembersRabbitService } from './members.rabbit.service';
import { HttpModule } from '@nestjs/axios';
import { OrganizationHelper } from '../helpers/organization.helper';
import { InvitationsModule } from '../invitations/invitations.module';

@Module({
  imports: [RoleModule, InvitationsModule, OrgRolesModule, MemberModule, HttpModule],
  providers: [MembersService, MembersRabbitService, OrganizationHelper],
  controllers: [MembersController],
})
export class MembersModule {}
