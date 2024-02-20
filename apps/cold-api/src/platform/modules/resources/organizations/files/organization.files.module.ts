import { Module } from '@nestjs/common';
import { OrganizationFilesService } from './organization.files.service';
import { OrganizationFilesController } from './organization.files.controller';
import { HttpModule } from '@nestjs/axios';
import { IntegrationsModule } from '../../integrations/integrations.module';
import { OrganizationHelper } from '../helpers/organization.helper';

@Module({
  imports: [HttpModule, IntegrationsModule],
  controllers: [OrganizationFilesController],
  providers: [OrganizationFilesService, OrganizationHelper],
  exports: [OrganizationFilesService, OrganizationHelper],
})
export class OrganizationFilesModule {}
