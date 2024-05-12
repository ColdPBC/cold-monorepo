import { Module } from '@nestjs/common';
import { ComplianceMQTT } from './organizations.mqtt.service';
import { ComplianceModule } from '@coldpbc/nest';

@Module({
  imports: [ComplianceModule],
  providers: [ComplianceMQTT],
  exports: [ComplianceMQTT],
})
export class MqttModule {}
