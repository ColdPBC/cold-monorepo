import { Module } from '@nestjs/common';
import { OrgRolesService } from './roles.service';
import { OrgRolesController } from './roles.controller';
import { RoleModule } from '../../auth0/roles/role.module';
import { ColdRabbitModule, DarklyService, MqttModule, S3Service } from '@coldpbc/nest';
import { HttpModule } from '@nestjs/axios';
import { OrganizationService } from '../organization.service';
import { BroadcastEventService } from '../../../../utilities/events/broadcast.event.service';
import { IntegrationsService } from '../../integrations/integrations.service';
import { LocationsService } from '../locations/locations.service';
import { MembersService } from '../members/members.service';
import { MemberService } from '../../auth0/members/member.service';
import { InvitationsService } from '../invitations/invitations.service';

@Module({
  imports: [RoleModule, ColdRabbitModule.forFeature(), HttpModule, MqttModule],
  controllers: [OrgRolesController],
  providers: [
    OrgRolesService,
    MemberService,
    MembersService,
    OrganizationService,
    DarklyService,
    BroadcastEventService,
    IntegrationsService,
    S3Service,
    LocationsService,
    InvitationsService,
  ],
  exports: [OrgRolesService],
})
export class OrgRolesModule {}
