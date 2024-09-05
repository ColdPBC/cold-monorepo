import { Test, TestingModule } from '@nestjs/testing';
import { SustainabilityAttributesService } from './sustainability_attributes.service';

describe('SustainabilityAttributesService', () => {
  let service: SustainabilityAttributesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SustainabilityAttributesService],
    }).compile();

    service = module.get<SustainabilityAttributesService>(SustainabilityAttributesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
