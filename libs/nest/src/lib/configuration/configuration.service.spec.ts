import { Test, TestingModule } from '@nestjs/testing';
import { S3ConfigurationService } from './configuration.service';

describe('ConfigurationService', () => {
  let service: S3ConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [S3ConfigurationService],
    }).compile();

    service = module.get<S3ConfigurationService>(S3ConfigurationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
