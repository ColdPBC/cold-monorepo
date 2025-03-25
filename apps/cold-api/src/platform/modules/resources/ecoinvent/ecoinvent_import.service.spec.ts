import { Test, TestingModule } from '@nestjs/testing';
import { EcoinventImportService } from './ecoinvent_import.service';

describe('EcoinventImportService', () => {
  let service: EcoinventImportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EcoinventImportService],
    }).compile();

    service = module.get<EcoinventImportService>(EcoinventImportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
