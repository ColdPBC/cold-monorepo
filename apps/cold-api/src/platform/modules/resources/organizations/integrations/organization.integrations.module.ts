import { Module } from '@nestjs/common';
import { OrganizationIntegrationsController } from './organization.integrations.controller';
import { OrganizationIntegrationsService } from './organization.integrations.service';
import { LocationsModule } from '../locations/locations.module';

@Module({
  imports: [LocationsModule],
  providers: [OrganizationIntegrationsService],
  controllers: [OrganizationIntegrationsController],
})
export class OrganizationIntegrationsModule {}
