import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from '../../../authorization/jwt.strategy';
import { ColdCacheModule, CacheService, PrismaModule, PrismaService } from 'nest';
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
