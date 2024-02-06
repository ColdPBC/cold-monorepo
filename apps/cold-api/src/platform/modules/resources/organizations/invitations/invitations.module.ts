import { Module } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { InvitationsController } from './invitations.controller';
import { ColdRabbitModule, DarklyService, MqttModule, S3Service } from '@coldpbc/nest';
import { HttpModule } from '@nestjs/axios';
import { RoleModule } from '../../auth0/roles/role.module';
import { OrganizationService } from '../organization.service';
import { BroadcastEventService } from '../../../../utilities/events/broadcast.event.service';
import { IntegrationsModule } from '../../integrations/integrations.module';

@Module({
  imports: [RoleModule, MqttModule, HttpModule, IntegrationsModule, ColdRabbitModule.forFeature()],
  providers: [InvitationsService, OrganizationService, DarklyService, HttpModule, BroadcastEventService, S3Service],
  controllers: [InvitationsController],
})
export class InvitationsModule {}
