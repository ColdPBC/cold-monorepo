import { Module } from '@nestjs/common';

import { MqttService, NestModule } from '@coldpbc/nest';
import { ClimatiqModule } from './climatiq/climatiq.module';
import { ClimatiqService } from './climatiq/climatiq.service';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RabbitService } from './rabbit/rabbit.service';
import { BullModule } from '@nestjs/bull';
import { OutboundQueueProcessor } from './redis/outbound.processor';
import process from 'process';

@Module({
	providers: [AppService],
})
export class AppModule {
	static async forRootAsync() {
		return {
			module: AppModule,
			imports: [
				await ConfigModule.forRoot({
					isGlobal: true,
				}),
				await NestModule.forRootAsync(),
				ClimatiqModule,
				BullModule.registerQueue({
					name: process.env?.DD_SERVICE?.split('-')[2],
				}),
			],
			controllers: [],
			providers: [ClimatiqService, RabbitService, OutboundQueueProcessor, MqttService],
			exports: [RabbitService],
		};
	}
}
