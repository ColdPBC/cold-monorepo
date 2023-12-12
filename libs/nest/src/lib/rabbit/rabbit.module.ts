import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ColdRabbitService } from './rabbit.service';
import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { COLD_RABBIT_CONFIG } from './constants';

@Module({
  providers: [ColdRabbitService],
  exports: [ColdRabbitService],
})
export class ColdRabbitModule extends createConfigurableDynamicRootModule<ColdRabbitModule, RabbitMQConfig>(COLD_RABBIT_CONFIG) {}
