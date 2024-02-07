import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { RoleModule } from '../../auth0/roles/role.module';
import { MemberModule } from '../../auth0/members/member.module';
import { OrgRolesModule } from '../roles/roles.module';
import { MembersRabbitService } from './members.rabbit.service';
import { OrganizationService } from '../organization.service';
import { InvitationsService } from '../invitations/invitations.service';
import { HttpModule } from '@nestjs/axios';
import { ColdRabbitModule, DarklyService, MqttModule, S3Service } from '@coldpbc/nest';
import { BroadcastEventService } from '../../../../utilities/events/broadcast.event.service';
import { IntegrationsModule } from '../../integrations/integrations.module';

@Module({
  imports: [RoleModule, OrgRolesModule, ColdRabbitModule.forFeature(), MemberModule, HttpModule, MqttModule, IntegrationsModule],
  providers: [MembersService, MembersRabbitService, OrganizationService, InvitationsService, DarklyService, BroadcastEventService, S3Service],
  controllers: [MembersController],
})
export class MembersModule {}
