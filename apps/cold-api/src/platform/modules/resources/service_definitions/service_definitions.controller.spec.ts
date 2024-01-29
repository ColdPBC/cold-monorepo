import { Test, TestingModule } from '@nestjs/testing';
import { ServiceDefinitionsController } from './service_definitions.controller';

describe('ServiceDefinitionsController', () => {
  let controller: ServiceDefinitionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceDefinitionsController],
    }).compile();

    controller = module.get<ServiceDefinitionsController>(ServiceDefinitionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
