import { Module } from '@nestjs/common';
import { OrgRolesService } from './roles.service';
import { OrgRolesController } from './roles.controller';
import { RoleModule } from '../../auth0/roles/role.module';
import { HttpModule } from '@nestjs/axios';
import { MembersService } from '../members/members.service';
import { MemberService } from '../../auth0/members/member.service';
import { InvitationsService } from '../invitations/invitations.service';
import { OrganizationHelper } from '../helpers/organization.helper';
import { MemberModule } from '../../auth0/members/member.module';

@Module({
  imports: [RoleModule, HttpModule, MemberModule],
  controllers: [OrgRolesController],
  providers: [OrgRolesService, MemberService, MembersService, InvitationsService, OrganizationHelper],
  exports: [OrgRolesService],
})
export class OrgRolesModule {}
