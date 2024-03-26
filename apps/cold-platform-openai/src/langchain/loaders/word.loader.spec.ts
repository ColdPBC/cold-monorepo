import { Test, TestingModule } from '@nestjs/testing';
import { WordLoader } from './word.loader';

describe('WordService', () => {
  let service: WordLoader;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordLoader],
    }).compile();

    service = module.get<WordLoader>(WordLoader);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
