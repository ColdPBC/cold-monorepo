import { Test, TestingModule } from '@nestjs/testing';
import { Auth0TokenService, CacheService, DarklyService, JwtStrategy, PrismaService } from '@coldpbc/nest';
import { Policy_definitionsController } from './policy_definitions.controller';
import { Policy_definitionsService } from './policy_definitions.service';
import { mockDeep } from 'jest-mock-extended';
import { JwtService } from '@nestjs/jwt';
import { fullReqExample } from '../_global/global.examples';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('PolicyDefinitionsController', () => {
  let controller: Policy_definitionsController;
  let service: Policy_definitionsService;
  /*
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [Policy_definitionsController],
      providers: [ConfigService, Policy_definitionsService, PrismaService, CacheService, DarklyService],
    })
      .overrideProvider(Policy_definitionsService)
      .useValue(mockDeep<Policy_definitionsService>())
      .overrideProvider(Auth0TokenService)
      .useValue(mockDeep<Auth0TokenService>())
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

    controller = module.get<Policy_definitionsController>(Policy_definitionsController);
    service = module.get<Policy_definitionsService>(Policy_definitionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('FindAllPolicies called', async () => {
    await controller.findAll();
    expect(service.findAllPolicies).toHaveBeenCalled();
  });

  it('FindAllPolicies called', async () => {
    await controller.findByName('test');
    expect(service.findPolicyByName).toHaveBeenCalled();
  });

  it('FindAllPolicies called', async () => {
    await controller.findContentByName('test');
    expect(service.findPolicyByName).toHaveBeenCalled();
  });

  it('FindSignedDataByEmail called', async () => {
    await controller.findSigned(fullReqExample);
    expect(service.findSignedDataByEmail).toHaveBeenCalled();
  });

  it('FindSignedDataByEmail called', async () => {
    await controller.signPolicy(1, fullReqExample);
    expect(service.createSignedData).toHaveBeenCalled();
  });

 */
});
