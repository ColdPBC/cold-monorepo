import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { ColdRabbitService } from './rabbit.service';
import { ConfigModule } from '@nestjs/config';
import { EventService } from './event.service';

@Module({})
@Global()
export class ColdRabbitModule {
	static async forRootAsync(): Promise<DynamicModule> {
		const module: DynamicModule = {
			module: ColdRabbitModule,
			imports: [ConfigModule, RabbitMQModule.forRoot(RabbitMQModule, await ColdRabbitService.getRabbitConfig())],
			providers: [ColdRabbitService, EventService],
			exports: [ConfigModule, ColdRabbitService, RabbitMQModule, EventService],
		};

		return module;
	}
}
