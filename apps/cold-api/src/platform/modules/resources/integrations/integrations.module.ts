import { Module } from '@nestjs/common';
import { CacheService, ColdCacheModule, ColdRabbitModule, ColdRabbitService, PrismaModule } from '@coldpbc/nest';
import { IntegrationsController } from './integrations.controller';
import { IntegrationsService } from './integrations.service';
import { OrganizationLocationsModule } from '../organization_locations/organization_locations.module';

@Module({
  imports: [PrismaModule, ColdCacheModule, ColdRabbitModule.forFeature(), OrganizationLocationsModule],
  controllers: [IntegrationsController],
  providers: [IntegrationsService, CacheService, ColdRabbitService],
})
export class IntegrationsModule {}
