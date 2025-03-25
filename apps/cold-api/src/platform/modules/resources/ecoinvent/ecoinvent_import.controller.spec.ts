import { Test, TestingModule } from '@nestjs/testing';
import { EcoinventImportController } from './ecoinvent_import.controller';
import { EcoinventImportService } from './ecoinvent_import.service';

describe('EcoinventImportController', () => {
  let controller: EcoinventImportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EcoinventImportController],
      providers: [EcoinventImportService],
    }).compile();

    controller = module.get<EcoinventImportController>(EcoinventImportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
