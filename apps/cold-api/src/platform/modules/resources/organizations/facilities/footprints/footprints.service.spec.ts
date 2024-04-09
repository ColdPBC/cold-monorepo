import { Test, TestingModule } from '@nestjs/testing';
import { FootprintsService } from './footprints.service';

describe('FootprintsService', () => {
  let service: FootprintsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FootprintsService],
    }).compile();

    service = module.get<FootprintsService>(FootprintsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
