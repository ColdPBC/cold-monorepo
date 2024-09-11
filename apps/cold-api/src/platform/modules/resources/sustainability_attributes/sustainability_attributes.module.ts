import { Module } from '@nestjs/common';
import { SustainabilityAttributesController } from './sustainability_attributes.controller';
import { SustainabilityAttributesService } from './sustainability_attributes.service';
import { SustainabilityAttributesRepository } from '@coldpbc/nest';

@Module({
	imports: [],
	controllers: [SustainabilityAttributesController],
	providers: [SustainabilityAttributesService, SustainabilityAttributesRepository],
	exports: [],
})
export class SustainabilityAttributesModule {}
