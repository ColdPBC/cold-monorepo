import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ColdCacheModule } from 'nest';
import { MemberModule } from './members/member.module';
import { RoleModule } from './roles/role.module';
import { OrganizationModule } from '../organizations/organization.module';
import { RoleService } from './roles/role.service';
import { OrganizationService } from '../organizations/organization.service';
import { MemberService } from './members/member.service';
import { Auth0UtilityService } from './auth0.utility.service';

@Module({
  imports: [HttpModule, ColdCacheModule, MemberModule, RoleModule, OrganizationModule],
  providers: [RoleService, OrganizationService, MemberService, Auth0UtilityService],
  exports: [RoleService, OrganizationService, MemberService, Auth0UtilityService],
})
export class Auth0Module {}
