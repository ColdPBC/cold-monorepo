import { Module } from '@nestjs/common';
import { ComplianceMQTT } from './organizations.mqtt.service';
import { ComplianceRepositoryModule } from '@coldpbc/nest';

@Module({
  imports: [ComplianceRepositoryModule],
  providers: [ComplianceMQTT],
  exports: [ComplianceMQTT],
})
export class MqttModule {}
