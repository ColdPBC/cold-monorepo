import { Module } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { FacilitiesController } from './facilities.controller';
import { FootprintsModule } from './footprints/footprints.module';
import { OrganizationIntegrationsModule } from '../integrations/organization.integrations.module';

@Module({
  imports: [FootprintsModule, OrganizationIntegrationsModule],
  providers: [FacilitiesService],
  controllers: [FacilitiesController],
  exports: [FacilitiesService],
})
export class FacilitiesModule {}
