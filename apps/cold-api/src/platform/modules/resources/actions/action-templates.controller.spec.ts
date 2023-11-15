import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
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

describe('ActionsController', () => {
  let controller: ActionTemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ColdCacheModule, CategoryValidationModule, SurveysModule],
      controllers: [ActionTemplatesController, ActionsController],
      providers: [ActionTemplatesService, ActionsService, JwtService, SurveysService, JwtStrategy, PrismaService, CacheService],
    }).compile();

    controller = module.get<ActionTemplatesController>(ActionTemplatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
