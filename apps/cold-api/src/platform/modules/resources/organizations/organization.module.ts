import { Module } from '@nestjs/common';
import { MemberModule } from '../auth0/members/member.module';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { HttpModule } from '@nestjs/axios';
import { CacheService } from '@coldpbc/nest';
import { RoleModule } from '../auth0/roles/role.module';
import { OrganizationFilesController } from './files/organization.files.controller';
import { Auth0Module } from '../auth0/auth0.module';
import { IntegrationsModule } from '../integrations/integrations.module';
import { OrganizationHelper } from './helpers/organization.helper';
import { OrganizationIntegrationsModule } from './integrations/organization.integrations.module';
import { InvitationsModule } from './invitations/invitations.module';
import { FacilitiesModule } from './facilities/facilities.module';
import { MembersModule } from './members/members.module';
import { OrgRolesModule } from './roles/roles.module';
import { OrganizationFilesModule } from './files/organization.files.module';
import { FootprintsModule } from './facilities/footprints/footprints.module';

@Module({
  imports: [
    OrganizationIntegrationsModule,
    InvitationsModule,
    FacilitiesModule,
    Auth0Module,
    IntegrationsModule,
    HttpModule,
    RoleModule,
    MemberModule,
    MembersModule,
    OrganizationFilesModule,
    OrgRolesModule,
    OrganizationFilesModule,
    FootprintsModule,
  ],
  controllers: [OrganizationController, OrganizationFilesController],
  providers: [OrganizationService, CacheService, OrganizationHelper],
  exports: [OrganizationHelper],
})
export class OrganizationModule {}
