import { AmqpConnection, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { DynamicModule, Module } from '@nestjs/common';
import { ColdRabbitService } from './rabbit.service';

@Module({
  imports: [RabbitMQModule.forRoot(RabbitMQModule, ColdRabbitService.getRabbitConfig('provider')), ColdRabbitModule],
  providers: [ColdRabbitService],
  exports: [ColdRabbitService, AmqpConnection],
})
export class ColdRabbitModule {
  static async forFeature(type: string): Promise<DynamicModule> {
    const module: DynamicModule = {
      module: ColdRabbitModule,
      imports: [RabbitMQModule.forRoot(RabbitMQModule, ColdRabbitService.getRabbitConfig(type)), ColdRabbitModule],
      providers: [ColdRabbitService],
      exports: [ColdRabbitService, AmqpConnection],
    };

    return module;
  }
}
