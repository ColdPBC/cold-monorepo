import { Test, TestingModule } from '@nestjs/testing';
import { ClimatiqService } from './climatiq.service';

describe('ClimatiqService', () => {
  let service: ClimatiqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClimatiqService],
    }).compile();

    service = module.get<ClimatiqService>(ClimatiqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
