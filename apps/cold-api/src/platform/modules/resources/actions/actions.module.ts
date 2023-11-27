import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy, ColdCacheModule, CacheService, PrismaModule } from '@coldpbc/nest';
import { CategoryValidationModule } from '../categories/validation/category-validation.module';
import { SurveysModule } from '../surveys/surveys.module';
import { SurveysService } from '../surveys/surveys.service';
import { ActionTemplatesController } from './action-templates.controller';
import { ActionTemplatesService } from './action-templates.service';
import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';

@Module({
  imports: [PrismaModule, ColdCacheModule, CategoryValidationModule, SurveysModule],
  controllers: [ActionTemplatesController, ActionsController],
  providers: [ActionTemplatesService, ActionsService, JwtService, SurveysService, JwtStrategy, CacheService],
})
export class ActionsModule {}
