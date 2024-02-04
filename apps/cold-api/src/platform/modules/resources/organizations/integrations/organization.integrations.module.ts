import { Module } from '@nestjs/common';
import { OrganizationIntegrationsController } from './organization.integrations.controller';
import { Auth0Module } from '../../auth0/auth0.module';
import { ColdCacheModule, ColdRabbitModule, MqttModule, S3Module } from '@coldpbc/nest';
import { HttpModule } from '@nestjs/axios';
import { RoleModule } from '../../auth0/roles/role.module';
import { MemberModule } from '../../auth0/members/member.module';
import { MembersModule } from '../members/members.module';
import { InvitationsModule } from '../invitations/invitations.module';
import { OrganizationIntegrationsService } from './organization.integrations.service';
import { LocationsModule } from '../locations/locations.module';
import { BroadcastEventService } from '../../../../utilities/events/broadcast.event.service';

@Module({
  imports: [
    Auth0Module,
    ColdRabbitModule.forFeature(),
    HttpModule,
    ColdCacheModule,
    RoleModule,
    MemberModule,
    S3Module,
    MqttModule,
    MembersModule,
    InvitationsModule,
    LocationsModule,
  ],
  providers: [OrganizationIntegrationsService, BroadcastEventService],
  controllers: [OrganizationIntegrationsController],
})
export class OrganizationIntegrationsModule {}
