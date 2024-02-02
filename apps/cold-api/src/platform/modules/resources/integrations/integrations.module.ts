import { Module } from '@nestjs/common';
import { CacheService, ColdCacheModule, ColdRabbitModule, ColdRabbitService, MqttModule, PrismaModule } from '@coldpbc/nest';
import { IntegrationsController } from './integrations.controller';
import { IntegrationsService } from './integrations.service';
import { OrganizationLocationsModule } from '../organization_locations/organization_locations.module';
import { BroadcastEventService } from '../../../utilities/events/broadcast.event.service';

@Module({
  imports: [PrismaModule, ColdCacheModule, ColdRabbitModule.forFeature(), OrganizationLocationsModule, MqttModule],
  controllers: [IntegrationsController],
  providers: [IntegrationsService, CacheService, ColdRabbitService, BroadcastEventService],
  exports: [IntegrationsService, ColdRabbitService, CacheService, BroadcastEventService],
})
export class IntegrationsModule {}
