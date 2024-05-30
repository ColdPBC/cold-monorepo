import { Module } from '@nestjs/common';
import { OrganizationIntegrationsController } from './organization.integrations.controller';
import { OrganizationIntegrationsService } from './organization.integrations.service';

import { OrganizationHelper } from '../helpers/organization.helper';

@Module({
  imports: [],
  providers: [OrganizationIntegrationsService, OrganizationHelper],
  controllers: [OrganizationIntegrationsController],
})
export class OrganizationIntegrationsModule {}
