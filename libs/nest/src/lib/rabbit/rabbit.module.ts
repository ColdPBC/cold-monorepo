import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { ColdRabbitService } from './rabbit.service';
import { ConfigModule } from '@nestjs/config';
import { EventService } from './event.service';

@Global()
@Module({})
export class ColdRabbitModule {
	static async forRootAsync(secrets?: any): Promise<DynamicModule> {
		if (!secrets) {
			console.warn('No secrets provided to ColdRabbitModule.forRootAsync');
		}
		const module: DynamicModule = {
			module: ColdRabbitModule,
			imports: [ConfigModule, RabbitMQModule.forRoot(RabbitMQModule, await ColdRabbitService.getRabbitConfig(secrets ? secrets.RABBITMQ_URL : undefined))],
			providers: [ColdRabbitService, EventService],
			exports: [ConfigModule, ColdRabbitService, EventService, RabbitMQModule],
		};

		return module;
	}
}
