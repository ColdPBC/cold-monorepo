import { AmqpConnection, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { DynamicModule, Module } from '@nestjs/common';
import { ColdRabbitService } from './rabbit.service';

@Module({
  imports: [RabbitMQModule.forRoot(RabbitMQModule, ColdRabbitService.getRabbitConfig()), ColdRabbitModule],
  providers: [ColdRabbitService],
  exports: [ColdRabbitService, AmqpConnection],
})
export class ColdRabbitModule {
  static async forFeature(): Promise<DynamicModule> {
    const module: DynamicModule = {
      module: ColdRabbitModule,
      imports: [RabbitMQModule.forRoot(RabbitMQModule, ColdRabbitService.getRabbitConfig()), ColdRabbitModule],
      providers: [ColdRabbitService],
      exports: [ColdRabbitService, AmqpConnection],
    };

    return module;
  }
}
