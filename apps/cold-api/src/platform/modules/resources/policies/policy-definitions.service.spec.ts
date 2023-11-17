import { Test, TestingModule } from '@nestjs/testing';
import { ColdCacheModule, PrismaModule } from 'nest';
import { PolicyDefinitionsController } from './policy-definitions.controller';
import { PolicyDefinitionsService } from './policy-definitions.service';

describe('PolicyContentService', () => {
  let service: PolicyDefinitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ColdCacheModule],
      controllers: [PolicyDefinitionsController],
      providers: [PolicyDefinitionsService],
    }).compile();

    service = module.get<PolicyDefinitionsService>(PolicyDefinitionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
