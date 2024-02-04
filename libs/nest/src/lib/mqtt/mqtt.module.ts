import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { MqttValidatorService } from './validator/mqtt.validator.service';

@Module({
  providers: [MqttService, MqttValidatorService],
  exports: [MqttService],
})
export class MqttModule {}
