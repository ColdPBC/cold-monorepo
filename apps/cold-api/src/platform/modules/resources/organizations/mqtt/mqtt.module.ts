import { Module } from '@nestjs/common';
import { ComplianceMQTT } from './organizations.mqtt.service';
import { ComplianceRepository } from './compliance.repository';

@Module({
  imports: [],
  providers: [ComplianceMQTT, ComplianceRepository],
  exports: [ComplianceRepository],
})
export class MqttModule {}
