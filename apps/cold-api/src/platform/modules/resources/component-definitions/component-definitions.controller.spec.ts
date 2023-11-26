import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy, ColdCacheModule, CacheService, PrismaModule, PrismaService, DarklyService } from '@coldpbc/nest';
import { PolicyDefinitionsModule } from '../policies/policy-definitions.module';
import { ComponentDefinitionsController } from './component-definitions.controller';
import { ComponentDefinitionsService } from './component-definitions.service';
import { mockDeep } from 'jest-mock-extended';
import { authenticatedUserExample, fullReqExample, noBodyOrQueryReqExample } from '../_global/global.examples';
import { CreateComponentDefinitionDto } from './dto/create-component-definition.dto';

describe('ComponentDefinitionsController', () => {
  let controller: ComponentDefinitionsController;
  let service: ComponentDefinitionsService;
  const mock: CreateComponentDefinitionDto = {
    id: 'test',
    name: 'test',
    type: 'DATAGRID',
    definition: {},
    description: 'test',
    updated_at: new Date(),
    created_at: new Date(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ColdCacheModule, PolicyDefinitionsModule],
      controllers: [ComponentDefinitionsController],
      providers: [ComponentDefinitionsService, JwtService, JwtStrategy, PrismaService, CacheService],
    })
      .overrideProvider(ComponentDefinitionsService)
      .useValue(mockDeep<ComponentDefinitionsService>())
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

    controller = module.get<ComponentDefinitionsController>(ComponentDefinitionsController);
    service = module.get<ComponentDefinitionsService>(ComponentDefinitionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Create called', async () => {
    const response = await controller.create(fullReqExample, mock);
    expect(service.create).toHaveBeenCalled();
  });

  it('Update called', async () => {
    const response = await controller.update('123', mock, noBodyOrQueryReqExample);
    expect(service.update).toHaveBeenCalled();
  });

  it('FindAll called', async () => {
    const response = await controller.findAll(fullReqExample);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('FindByType called', async () => {
    const response = await controller.getAllByType('DATAGRID', noBodyOrQueryReqExample);
    expect(service.findByType).toHaveBeenCalled();
  });

  it('FindByType called', async () => {
    const response = await controller.remove('DATAGRID', fullReqExample);
    expect(service.remove).toHaveBeenCalled();
  });
});
