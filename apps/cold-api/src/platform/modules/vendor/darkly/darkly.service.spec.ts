import { Test, TestingModule } from '@nestjs/testing';
import { DarklyService } from './darkly.service';

describe('DarklyService', () => {
  let service: DarklyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DarklyService],
    }).compile();

    service = module.get<DarklyService>(DarklyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
