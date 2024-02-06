import { Module } from '@nestjs/common';
import { MembersModule } from './members/members.module';
import { InvitationsModule } from './invitations/invitations.module';
import { OrganizationIntegrationsModule } from './integrations/organization.integrations.module';
import { LocationsModule } from './locations/locations.module';
import { OrgRolesModule } from './roles/roles.module';
import { OrganizationModule } from './organization.module';

@Module({
  imports: [OrganizationIntegrationsModule, InvitationsModule, LocationsModule, MembersModule, OrgRolesModule, OrganizationModule],
})
export class OrganizationBaseModule {}
