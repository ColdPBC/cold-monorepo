import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { ColdRabbitService } from './rabbit.service';
import { ConfigModule } from '@nestjs/config';

@Module({})
@Global()
export class ColdRabbitModule {
	static async forRootAsync(): Promise<DynamicModule> {
		const module: DynamicModule = {
			module: ColdRabbitModule,
			imports: [ConfigModule, RabbitMQModule.forRoot(RabbitMQModule, await ColdRabbitService.getRabbitConfig())],
			providers: [ColdRabbitService],
			exports: [ColdRabbitService, RabbitMQModule],
		};

		return module;
	}
}
