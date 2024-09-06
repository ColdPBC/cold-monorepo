import { Test, TestingModule } from '@nestjs/testing';
import { SustainabilityAttributesController } from './sustainability_attributes.controller';
import { SustainabilityAttributesService } from './sustainability_attributes.service';

describe('CertificationsController', () => {
  let controller: SustainabilityAttributesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SustainabilityAttributesController],
      providers: [SustainabilityAttributesService],
    }).compile();

    controller = module.get<SustainabilityAttributesController>(SustainabilityAttributesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
