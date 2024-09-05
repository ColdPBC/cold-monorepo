import { Module } from '@nestjs/common';
import { SustainabilityAttributesController } from './sustainability_attributes.controller';
import { SustainabilityAttributesService } from './sustainability_attributes.service';
import { SustainabilityAttributesRepository, OrganizationAttributesRepository } from '@coldpbc/nest';
import { OrganizationAttributesModule } from '../organizations/organization_attributes/organization_attributes_module';

@Module({
  imports: [OrganizationAttributesModule],
  controllers: [SustainabilityAttributesController],
  providers: [SustainabilityAttributesService, OrganizationAttributesRepository, SustainabilityAttributesRepository],
  exports: [],
})
export class SustainabilityAttributesModule {}
