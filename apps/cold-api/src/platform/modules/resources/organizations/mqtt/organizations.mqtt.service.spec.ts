import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsMqttService } from './organizations.mqtt.service';

describe('OrganizationMqttService', () => {
  let service: OrganizationsMqttService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationsMqttService],
    }).compile();

    service = module.get<OrganizationsMqttService>(OrganizationsMqttService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
