import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from '../../../authorization/jwt.strategy';
import { ColdCacheModule } from '../../cache/cache.module';
import { CacheService } from '../../cache/cache.service';
import { PrismaModule } from '../../vendor/prisma/prisma.module';
import { PrismaService } from '../../vendor/prisma/prisma.service';
import { ComponentDefinitionsService } from '../component-definitions/component-definitions.service';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';

describe('FormDefinitionsService', () => {
  let service: ComponentDefinitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ColdCacheModule],
      controllers: [SurveysController],
      providers: [SurveysService, JwtService, JwtStrategy, PrismaService, CacheService],
    }).compile();

    service = module.get<ComponentDefinitionsService>(ComponentDefinitionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
