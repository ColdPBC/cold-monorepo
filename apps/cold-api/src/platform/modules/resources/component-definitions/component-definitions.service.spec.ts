import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { CacheService, ColdCacheModule, DarklyService, JwtStrategy, PrismaModule, PrismaService } from '@coldpbc/nest';
import { PolicyDefinitionsModule } from '../policies/policy-definitions.module';
import { ComponentDefinitionsController } from './component-definitions.controller';
import { ComponentDefinitionsService } from './component-definitions.service';
import { mockDeep } from 'jest-mock-extended';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('FormDefinitionsService', () => {
  let service: ComponentDefinitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, PrismaModule, ColdCacheModule, PolicyDefinitionsModule],
      controllers: [ComponentDefinitionsController],
      providers: [ConfigService, ComponentDefinitionsService, JwtService, JwtStrategy, PrismaService, CacheService],
    })
      .overrideProvider(JwtService)
      .useValue(mockDeep<JwtService>())
      .overrideProvider(JwtStrategy)
      .useValue(mockDeep<JwtStrategy>())
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaService>())
      .overrideProvider(CacheService)
      .useValue(mockDeep<CacheService>())
      .overrideProvider(DarklyService)
      .useValue({
        getJSONFlag: jest.fn().mockReturnValue(true),
      })
      .compile();

    service = module.get<ComponentDefinitionsService>(ComponentDefinitionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
