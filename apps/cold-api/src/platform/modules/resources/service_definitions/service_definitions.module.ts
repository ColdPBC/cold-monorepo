import { Module } from '@nestjs/common';
import { RabbitService } from './rabbit.service';
import { ServiceDefinitionsService } from './service_definitions.service';
import { ServiceDefinitionsController } from './service_definitions.controller';

@Module({
  controllers: [ServiceDefinitionsController],
  providers: [ServiceDefinitionsService, RabbitService],
  exports: [ServiceDefinitionsService, RabbitService],
})
export class Service_definitionsModule {}
