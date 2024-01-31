import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CacheService, ColdCacheModule, JwtStrategy, MqttService, PrismaModule } from '@coldpbc/nest';
import { CategoryValidationModule } from '../categories/validation/category-validation.module';
import { ActionTemplatesController } from './action-templates.controller';
import { ActionTemplatesService } from './action-templates.service';
import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';
import { SurveysModule } from '../surveys/surveys.module';

@Module({
  imports: [PrismaModule, ColdCacheModule, SurveysModule, CategoryValidationModule],
  controllers: [ActionTemplatesController, ActionsController],
  providers: [ActionTemplatesService, ActionsService, JwtService, JwtStrategy, CacheService, MqttService],
  exports: [ActionsService, ActionsService],
})
export class ActionsModule {}
