import { Test, TestingModule } from '@nestjs/testing';
import { LangchainLoaderService } from './langchain.loader.service';

describe('LangchainLoaderService', () => {
  let service: LangchainLoaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LangchainLoaderService],
    }).compile();

    service = module.get<LangchainLoaderService>(LangchainLoaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
