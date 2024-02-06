import { Module } from '@nestjs/common';
import { MemberModule } from '../auth0/members/member.module';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { HttpModule } from '@nestjs/axios';
import { CacheService, ColdCacheModule, ColdRabbitModule, ColdRabbitService, DarklyModule, MqttModule, S3Service } from '@coldpbc/nest';
import { RoleModule } from '../auth0/roles/role.module';
import { OrganizationFilesController } from './files/organization.files.controller';
import { BroadcastEventService } from '../../../utilities/events/broadcast.event.service';
import { Auth0Module } from '../auth0/auth0.module';
import { IntegrationsModule } from '../integrations/integrations.module';
import { OrganizationFilesService } from './files/organization.files.service';

@Module({
  imports: [Auth0Module, DarklyModule, IntegrationsModule, ColdRabbitModule.forFeature(), HttpModule, ColdCacheModule, RoleModule, MemberModule, MqttModule],
  controllers: [OrganizationController, OrganizationFilesController],
  providers: [OrganizationService, CacheService, ColdRabbitService, BroadcastEventService, S3Service, OrganizationFilesService],
  exports: [],
})
export class OrganizationModule {}
