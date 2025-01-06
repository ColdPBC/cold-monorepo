import { Module } from '@nestjs/common';
import { OrganizationIntegrationsController } from './organization.integrations.controller';
import { OrganizationIntegrationsService } from './organization.integrations.service';

import { OrganizationHelper } from '../helpers/organization.helper';
import { BackboneService } from './backbone/backbone.service';

@Module({
  imports: [],
  providers: [OrganizationIntegrationsService, OrganizationHelper, BackboneService],
  controllers: [OrganizationIntegrationsController],
})
export class OrganizationIntegrationsModule {}
