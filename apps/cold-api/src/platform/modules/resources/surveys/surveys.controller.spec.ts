import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from '../../../authorization/jwt.strategy';
import { ColdCacheModule } from '../../cache/cache.module';
import { CacheService } from '../../cache/cache.service';
import { PrismaModule } from '../../vendor/prisma/prisma.module';
import { PrismaService } from '../../vendor/prisma/prisma.service';
import { ComponentDefinitionsController } from '../component-definitions/component-definitions.controller';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';

describe('SurveytDefinitionsController', () => {
  let controller: ComponentDefinitionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ColdCacheModule],
      controllers: [SurveysController],
      providers: [SurveysService, JwtService, JwtStrategy, PrismaService, CacheService],
    }).compile();

    controller = module.get<ComponentDefinitionsController>(ComponentDefinitionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
