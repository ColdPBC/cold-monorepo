import { Test, TestingModule } from '@nestjs/testing';
import { MqttValidatorService } from './mqtt.validator.service';

describe('MqttValidatorService', () => {
  let service: MqttValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MqttValidatorService],
    }).compile();

    service = module.get<MqttValidatorService>(MqttValidatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
