import { Module } from '@nestjs/common';
import { OrganizationLocationsService } from './organization_locations.service';
import { OrganizationLocationsController } from './organization_locations.controller';

@Module({
  providers: [OrganizationLocationsService],
  controllers: [OrganizationLocationsController],
  exports: [OrganizationLocationsService],
})
export class OrganizationLocationsModule {}
