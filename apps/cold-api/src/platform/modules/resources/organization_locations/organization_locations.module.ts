import { Module } from '@nestjs/common';
import { OrganizationLocationsService } from './organization_locations.service';
import { OrganizationLocationsController } from './organization_locations.controller';
import { MqttModule } from '@coldpbc/nest';

@Module({
  imports: [MqttModule],
  providers: [OrganizationLocationsService],
  controllers: [OrganizationLocationsController],
  exports: [OrganizationLocationsService],
})
export class OrganizationLocationsModule {}
