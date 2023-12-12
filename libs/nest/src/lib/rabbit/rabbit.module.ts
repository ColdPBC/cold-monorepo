import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { DynamicModule, Module } from '@nestjs/common';
import { ColdRabbitService } from './rabbit.service';

@Module({})
export class ColdRabbitModule {
  static forFeature(): DynamicModule {
    const module: DynamicModule = {
      module: ColdRabbitModule,
      imports: [RabbitMQModule.forRoot(RabbitMQModule, ColdRabbitService.getRabbitConfig()), ColdRabbitModule],
      providers: [ColdRabbitService],
      exports: [ColdRabbitService, RabbitMQModule],
    };

    return module;
  }
}
