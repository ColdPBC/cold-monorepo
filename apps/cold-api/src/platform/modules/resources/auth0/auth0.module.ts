import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ColdCacheModule, S3Service } from '@coldpbc/nest';
import { MemberModule } from './members/member.module';
import { RoleModule } from './roles/role.module';
import { OrganizationModule } from '../organizations/organization.module';
import { RoleService } from './roles/role.service';
import { OrganizationService } from '../organizations/organization.service';
import { MemberService } from './members/member.service';
import { IntegrationsService } from '../integrations/integrations.service';
import { OrganizationLocationsService } from '../organization_locations/organization_locations.service';

@Module({
  imports: [HttpModule, ColdCacheModule, MemberModule, RoleModule, OrganizationModule],
  providers: [RoleService, OrganizationService, MemberService, IntegrationsService, OrganizationLocationsService, S3Service],
  exports: [RoleService, OrganizationService, MemberService],
})
export class Auth0Module {}
