import { Module } from '@nestjs/common';
import { CacheService, ColdCacheModule, ColdRabbitModule, ColdRabbitService, PrismaModule } from '@coldpbc/nest';
import { RabbitService } from './rabbit.service';
import { ServiceDefinitionsService } from './service_definitions.service';
import { ServiceDefinitionsController } from './service_definitions.controller';

@Module({
  imports: [PrismaModule, ColdCacheModule, ColdRabbitModule.forFeature()],
  controllers: [ServiceDefinitionsController],
  providers: [ServiceDefinitionsService, CacheService, ColdRabbitService, RabbitService],
  exports: [ServiceDefinitionsService, CacheService, ColdRabbitService, RabbitService],
})
export class Service_definitionsModule {}
