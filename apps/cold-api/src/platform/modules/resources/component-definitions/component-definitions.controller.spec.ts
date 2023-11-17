import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy, ColdCacheModule, CacheService, PrismaModule, PrismaService } from 'nest';
import { PolicyDefinitionsModule } from '../policies/policy-definitions.module';
import { ComponentDefinitionsController } from './component-definitions.controller';
import { ComponentDefinitionsService } from './component-definitions.service';

describe('ComponentDefinitionsController', () => {
  let controller: ComponentDefinitionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ColdCacheModule, PolicyDefinitionsModule],
      controllers: [ComponentDefinitionsController],
      providers: [ComponentDefinitionsService, JwtService, JwtStrategy, PrismaService, CacheService],
    }).compile();

    controller = module.get<ComponentDefinitionsController>(ComponentDefinitionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
