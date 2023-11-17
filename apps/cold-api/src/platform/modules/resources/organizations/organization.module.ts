import { Module } from '@nestjs/common';
import { MemberModule } from '../auth0/members/member.module';
import { MemberService } from '../auth0/members/member.service';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { Auth0UtilityService } from '../auth0/auth0.utility.service';
import { HttpModule } from '@nestjs/axios';
import { ColdCacheModule, CacheService } from 'nest';
import { RoleModule } from '../auth0/roles/role.module';
import { RoleService } from '../auth0/roles/role.service';

@Module({
  imports: [HttpModule, ColdCacheModule, RoleModule, MemberModule],
  controllers: [OrganizationController],
  providers: [OrganizationService, Auth0UtilityService, CacheService, RoleService, MemberService],
  exports: [OrganizationService, Auth0UtilityService],
})
export class OrganizationModule {}
