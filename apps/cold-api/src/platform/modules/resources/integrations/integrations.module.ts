import { Module } from '@nestjs/common';
import { ColdCacheModule, ColdRabbitModule, MqttModule, PrismaModule } from '@coldpbc/nest';
import { IntegrationsController } from './integrations.controller';
import { IntegrationsService } from './integrations.service';
import { LocationsModule } from '../organizations/locations/locations.module';
import { BroadcastEventService } from '../../../utilities/events/broadcast.event.service';

@Module({
  imports: [PrismaModule, ColdCacheModule, ColdRabbitModule.forFeature(), LocationsModule, MqttModule],
  controllers: [IntegrationsController],
  providers: [IntegrationsService, BroadcastEventService],
  exports: [IntegrationsService],
})
export class IntegrationsModule {}
