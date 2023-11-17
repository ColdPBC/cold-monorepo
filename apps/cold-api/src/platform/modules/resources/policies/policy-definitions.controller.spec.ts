import { Test, TestingModule } from '@nestjs/testing';
import { ColdCacheModule, PrismaModule } from 'nest';
import { PolicyDefinitionsController } from './policy-definitions.controller';
import { PolicyDefinitionsService } from './policy-definitions.service';

describe('PolicyContentController', () => {
  let controller: PolicyDefinitionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ColdCacheModule],
      controllers: [PolicyDefinitionsController],
      providers: [PolicyDefinitionsService],
    }).compile();

    controller = module.get<PolicyDefinitionsController>(PolicyDefinitionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
