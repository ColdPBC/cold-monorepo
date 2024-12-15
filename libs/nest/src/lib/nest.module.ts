import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { HttpModule } from '@nestjs/axios';
import { HotShotsModule } from 'nestjs-hot-shots';
import { BullModule } from '@nestjs/bull';
import { PrismaModule } from './prisma';
import { HealthModule } from './health';
import { DarklyService } from './darkly';
import { ColdCacheModule } from './cache';
import { AuthorizationModule } from './authorization';
import { InterceptorModule } from './interceptors';
import { BaseWorker, WorkerLogger } from './worker';
import { ColdRabbitModule } from './rabbit'; //import { CronModule, CronService } from './crons';
import { DatadogTraceModule } from 'nestjs-ddtrace';
import { KmsModule, KmsService, S3Module, SecretsModule, SecretsService } from './aws';
import { RedisServiceConfig, GeneratorsModule } from './utility';
import { MqttModule } from './mqtt';
import { ComplianceDataModule } from './compliance';

@Module({
	imports: [MqttModule, GeneratorsModule],
})
export class NestModule {
	static async forRootAsync(): Promise<any> {
		const logger = new WorkerLogger('NestModule');
		const config = new ConfigService();

		if (!process.env.NX_TASK_TARGET_PROJECT && !process.env.NX_TASK_TARGET_PROJECT) {
			if (!process.env.DD_SERVICE) {
				throw new Error('DD_SERVICE is not set in this environment; It is required for the NestModule when not run via NX command to function properly.');
			}
		}

		const ss: SecretsService = new SecretsService();
		await ss.init();

		const service = config.getOrThrow('DD_SERVICE');

		const secrets = await ss.getSecrets('core');

		const configSecrets: any = [];

		configSecrets.push(() => secrets);

		try {
			const serviceSecrets = await ss.getServiceSecrets(service);
			if (serviceSecrets) {
				configSecrets.push(() => serviceSecrets);
			}
		} catch (e) {
			logger.error(e.message, e);
		}

		const configModule = ConfigModule.forRoot({
			isGlobal: true,
			load: configSecrets,
			cache: false,
		});

		const parts = service.split('-');
		const type = parts.length > 2 ? parts[1] : 'core';
		const project = parts.length > 2 ? parts[2] : parts[1];

		/**
		 * Imports Array
		 */
		const imports: any = [
			await configModule, //ConfigurationModule.forRootAsync(),
			S3Module,
			SecretsModule,
			BullModule.forRoot(await new RedisServiceConfig(secrets).getQueueConfig(type, project)),
			HttpModule,
			MqttModule,
			KmsModule,
			ComplianceDataModule,
			GeneratorsModule,
		];

		/**
		 * Providers Array
		 */
		const providers: any = [ConfigService, KmsService];

		/**
		 * Controllers Array
		 */
		const controllers: any = [];

		/**
		 * Exports Array
		 */
		const exports: any = [
			ConfigModule,
			S3Module,
			SecretsModule,
			BullModule.forRoot(await new RedisServiceConfig(secrets).getQueueConfig(type, project)),
			HttpModule,
			MqttModule,
			ComplianceDataModule,
			GeneratorsModule,
			KmsModule,
		];

		logger.info('Configuring Nest Module...');

		//const darkly = new DarklyService(config);
		//await darkly.onModuleInit(await secrets()['LD_SDK_KEY']);

		//configure-enable-hot-shots-module
		const enableHotShots = true; // await darkly.getBooleanFlag('static-enable-hot-shots-module');
		if (enableHotShots) {
			imports.push(
				HotShotsModule.forRoot({
					port: 8125,
					host: '127.0.0.1',
					globalize: true,
					errorHandler: err => {
						logger.error(err.message, {
							stack: err.stack,
							name: err.name,
							env: config.get('NODE_ENV'),
							version: process.env.npm_package_version || config.get('DD_VERSION') || BaseWorker.getPkgVersion(),
							service: config.get('DD_SERVICE') || BaseWorker.getProjectName(),
						});
					},
					prefix: 'cold_',
					globalTags: {
						env: config.get('NODE_ENV') || 'unknown',
						version: process.env.npm_package_version || config.get('DD_VERSION') || BaseWorker.getPkgVersion(),
						service: config.get('DD_SERVICE') || BaseWorker.getProjectName(),
					},
				}),
			);

			exports.push(HotShotsModule);
		}

		/**
		 * Cron module
		 */
		//await darkly.getFlag('static-enable-cron-module');
		/* if (enableCronModule) {
       imports.push(CronModule);
       providers.push(CronService);
       exports.push(CronService);
     }*/

		/**
		 * Datadog tracing module
		 */
		const enableDDTrace = true; //await darkly.getBooleanFlag('static-enable-data-dog-trace-module');
		if (enableDDTrace) {
			imports.push(
				DatadogTraceModule.forRoot({
					controllers: true,
					providers: true,
				}),
			);

			exports.push(DatadogTraceModule);
		}

		/**
		 * Health module
		 */
		const enableHealthModule = true; //await darkly.getBooleanFlag('static-enable-health-module');
		if (enableHealthModule) {
			imports.push(HealthModule);
			exports.push(HealthModule);
		}

		/**
		 * Authorization module
		 */
		const enableAuthorizationModule = true; //await darkly.getBooleanFlag('static-enable-authorization-module');
		if (enableAuthorizationModule) {
			if (!secrets['REDISCLOUD_URL']) {
				throw new Error('REDISCLOUD_URL is not set in this environment; It is required for the authorization module to function properly.');
			}

			imports.push(await ColdCacheModule.forRootAsync(secrets), await AuthorizationModule.forFeatureAsync());
			exports.push(await ColdCacheModule.forRootAsync(secrets), await AuthorizationModule.forFeatureAsync());
		}

		/**
		 * Prisma Module
		 */
		const enablePrismaModule = true; //await darkly.getBooleanFlag('static-enable-prisma-module');
		if (enablePrismaModule) {
			imports.push(PrismaModule);
			exports.push(PrismaModule);
		}

		/**
		 * Interceptors module
		 */
		const enableInterceptorModule = true; //await darkly.getBooleanFlag('static-enable-interceptors-module');
		if (enableInterceptorModule) {
			imports.push(InterceptorModule);
			exports.push(InterceptorModule);
		}

		/**
		 * Rabbit Module
		 */
		const enableRabbitModule = true; //await darkly.getBooleanFlag('static-enable-rabbit-module');
		if (enableRabbitModule) {
			imports.push(await ColdRabbitModule.forRootAsync(secrets));
			exports.push(await ColdRabbitModule.forRootAsync(secrets));
		}

		return {
			module: NestModule,
			imports,
			controllers,
			providers,
			exports,
		};
	}
}
