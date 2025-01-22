import { Test, TestingModule } from '@nestjs/testing';
import { BackboneService } from './backbone.service';

describe('BackboneService', () => {
  let service: BackboneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackboneService],
    }).compile();

    service = module.get<BackboneService>(BackboneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
