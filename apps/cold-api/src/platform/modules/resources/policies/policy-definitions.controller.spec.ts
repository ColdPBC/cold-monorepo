import { Test, TestingModule } from '@nestjs/testing';
import { CacheService, DarklyService, JwtStrategy, PrismaModule, PrismaService } from 'nest';
import { PolicyDefinitionsController } from './policy-definitions.controller';
import { PolicyDefinitionsService } from './policy-definitions.service';
import { mockDeep } from 'jest-mock-extended';
import { Auth0UtilityService } from '../auth0/auth0.utility.service';
import { JwtService } from '@nestjs/jwt';
import { fullReqExample } from '../_global/global.examples';

describe('PolicyContentController', () => {
  let controller: PolicyDefinitionsController;
  let service: PolicyDefinitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PolicyDefinitionsController],
      providers: [PolicyDefinitionsService, PrismaService, CacheService, DarklyService],
    })
      .overrideProvider(PolicyDefinitionsService)
      .useValue(mockDeep<PolicyDefinitionsService>())
      .overrideProvider(Auth0UtilityService)
      .useValue(mockDeep<Auth0UtilityService>())
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

    controller = module.get<PolicyDefinitionsController>(PolicyDefinitionsController);
    service = module.get<PolicyDefinitionsService>(PolicyDefinitionsService);
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
});
