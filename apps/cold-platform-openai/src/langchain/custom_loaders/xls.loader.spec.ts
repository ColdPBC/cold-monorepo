import { Test, TestingModule } from '@nestjs/testing';
import { XlsLoader } from './xls.loader';

describe('XlsService', () => {
  let service: XlsLoader;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XlsLoader],
    }).compile();

    service = module.get<XlsLoader>(XlsLoader);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
