import { Module } from '@nestjs/common';
import { OrganizationAttributesController } from './organization_attributes.controller';
import { OrganizationAttributesRepository } from '@coldpbc/nest';
import { OrganizationAttributesService } from './organization_attributes_service';

@Module({
  controllers: [OrganizationAttributesController],
  providers: [OrganizationAttributesService, OrganizationAttributesRepository],
  exports: [OrganizationAttributesService, OrganizationAttributesRepository],
})
export class OrganizationAttributesModule {}
