import { Test, TestingModule } from '@nestjs/testing';
import { FreeplayService } from './freeplay.service';

describe('FreeplayService', () => {
  let service: FreeplayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FreeplayService],
    }).compile();

    service = module.get<FreeplayService>(FreeplayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
