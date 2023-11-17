import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from '../../../../../../../libs/nest/src/lib/authorization/jwt.strategy';
import { ColdCacheModule, CacheService, PrismaModule, PrismaService } from 'nest';
import { PolicyDefinitionsModule } from '../policies/policy-definitions.module';
import { ComponentDefinitionsController } from './component-definitions.controller';
import { ComponentDefinitionsService } from './component-definitions.service';

describe('FormDefinitionsService', () => {
  let service: ComponentDefinitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ColdCacheModule, PolicyDefinitionsModule],
      controllers: [ComponentDefinitionsController],
      providers: [ComponentDefinitionsService, JwtService, JwtStrategy, PrismaService, CacheService],
    }).compile();

    service = module.get<ComponentDefinitionsService>(ComponentDefinitionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
