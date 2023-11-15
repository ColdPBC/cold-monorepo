import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../../../authorization/jwt.strategy';
import { ColdCacheModule } from '../../cache/cache.module';
import { CacheService } from '../../cache/cache.service';
import { PrismaModule } from '../../vendor/prisma/prisma.module';
import { PrismaService } from '../../vendor/prisma/prisma.service';
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
  providers: [ActionTemplatesService, ActionsService, JwtService, SurveysService, JwtStrategy, PrismaService, CacheService],
})
export class ActionsModule {}
