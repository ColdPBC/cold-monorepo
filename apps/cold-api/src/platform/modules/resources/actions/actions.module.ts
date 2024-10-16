import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy, MqttModule } from '@coldpbc/nest';
import { CategoryValidationModule } from '../categories/validation/category-validation.module';
import { ActionTemplatesController } from './action-templates.controller';
import { ActionTemplatesService } from './action-templates.service';
import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';
import { SurveysModule } from '../surveys/surveys.module';

@Module({
	imports: [/*ColdCacheModule,*/ SurveysModule, CategoryValidationModule, MqttModule],
	controllers: [ActionTemplatesController, ActionsController],
	providers: [ActionTemplatesService, ActionsService, JwtService, JwtStrategy],
	exports: [ActionsService, ActionsService],
})
export class ActionsModule {}
