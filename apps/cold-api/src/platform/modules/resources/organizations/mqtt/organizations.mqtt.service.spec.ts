import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceMQTT } from './organizations.mqtt.service';

describe('OrganizationMqttService', () => {
  let service: ComplianceMQTT;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplianceMQTT],
    }).compile();

    service = module.get<ComplianceMQTT>(ComplianceMQTT);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
