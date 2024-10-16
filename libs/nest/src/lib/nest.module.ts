import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { HttpModule } from '@nestjs/axios';
import { HotShotsModule } from 'nestjs-hot-shots';
import { BullModule } from '@nestjs/bull';
import { PrismaModule } from './prisma';
import { HealthModule } from './health';
import { ColdCacheModule } from './cache';
import { AuthorizationModule } from './authorization';
import { InterceptorModule } from './interceptors';
import { BaseWorker, WorkerLogger } from './worker';
import { ColdRabbitModule } from './rabbit'; //import { CronModule, CronService } from './crons';
import { DatadogTraceModule } from 'nestjs-ddtrace';
import { S3Module, SecretsModule, SecretsService } from './aws';
import { RedisServiceConfig, GeneratorsModule } from './utility';
import { MqttModule } from './mqtt';
import { ComplianceDataModule } from './compliance';
import { DarklyModule } from './darkly';

export interface service_flags {
	disableHotShots: boolean;
	disableDDTrace: boolean;
	disableHealthModule: boolean;
	disableAuthorizationModule: boolean;
	disablePrismaModule: boolean;
	disableInterceptorModule: boolean;
	disableRabbitModule: boolean;
	disableDarklyModule: boolean;
	disableBullModule: boolean;
	disableS3Module: boolean;
	disableSMModule: boolean;
	disableComplianceDataModule: boolean;
	disableMqttModule: boolean;
}

@Module({
	imports: [MqttModule, GeneratorsModule],
})
export class NestModule {
	static async forRootAsync(flags?: service_flags) {
		const logger = new WorkerLogger('NestModule');
		const config = new ConfigService();

		const ss = new SecretsService();
		await ss.onModuleInit();
		const service = config.getOrThrow('DD_SERVICE');
		const configSecrets: any = [];

		const secrets = await ss.getRootSecrets(service);
		configSecrets.push(() => secrets);

		const serviceSecrets = await ss.getServiceSecrets(service);
		if (serviceSecrets) {
			configSecrets.push(() => serviceSecrets);
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
			configModule, //ConfigurationModule.forRootAsync(),
			SecretsModule,
			HttpModule,
			GeneratorsModule,
		];

		/**
		 * Providers Array
		 */
		const providers: any = [ConfigService];

		/**
		 * Controllers Array
		 */
		const controllers: any = [];

		/**
		 * Exports Array
		 */
		const exports: any = [HttpModule, ConfigService];

		logger.info('Configuring Nest Module...');

		if (!flags?.disableComplianceDataModule) {
			imports.push(ComplianceDataModule);
			exports.push(ComplianceDataModule);
		}

		if (!flags?.disableBullModule) {
			imports.push(BullModule.forRoot(await new RedisServiceConfig(secrets).getQueueConfig(type, project)));
		}

		if (!flags?.disableDarklyModule) {
			imports.push(DarklyModule);
			exports.push(DarklyModule);
		}

		if (!flags?.disableMqttModule) {
			imports.push(MqttModule);
			exports.push(MqttModule);
		}

		if (!flags?.disableS3Module) {
			imports.push(S3Module);
			exports.push(S3Module);
		}

		//configure-enable-hot-shots-module
		const enableHotShots = !flags?.disableHotShots; //await darkly.getBooleanFlag('static-enable-hot-shots-module');
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
							version: config.get('DD_VERSION') || BaseWorker.getPkgVersion(),
							service: config.get('DD_SERVICE') || BaseWorker.getProjectName(),
						});
					},
					prefix: 'cold_',
					globalTags: {
						env: config.get('NODE_ENV') || 'unknown',
						version: config.get('DD_VERSION') || BaseWorker.getPkgVersion(),
						service: config.get('DD_SERVICE') || BaseWorker.getProjectName(),
					},
				}),
			);
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
		const enableDDTrace = !flags?.disableDDTrace; //await darkly.getBooleanFlag('static-enable-data-dog-trace-module');
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
		const enableHealthModule = !flags?.disableHealthModule; //await darkly.getBooleanFlag('static-enable-health-module');
		if (enableHealthModule) {
			imports.push(HealthModule);
			exports.push(HealthModule);
		}

		/**
		 * Authorization module
		 */
		const enableAuthorizationModule = !flags?.disableAuthorizationModule; // await darkly.getBooleanFlag('static-enable-authorization-module');
		if (enableAuthorizationModule) {
			if (!secrets['REDISCLOUD_URL']) {
				throw new Error('REDISCLOUD_URL is not set in this environment; It is required for the authorization module to function properly.');
			}

			imports.push(ColdCacheModule.forRootAsync(secrets), await AuthorizationModule.forFeatureAsync());
			exports.push(AuthorizationModule);
		}

		/**
		 * Prisma Module
		 */
		const enablePrismaModule = !flags?.disablePrismaModule; //await darkly.getBooleanFlag('static-enable-prisma-module');
		if (enablePrismaModule) {
			imports.push(PrismaModule);
		}

		/**
		 * Interceptors module
		 */
		const enableInterceptorModule = !flags?.disableInterceptorModule; //await darkly.getBooleanFlag('static-enable-interceptors-module');
		if (enableInterceptorModule) {
			imports.push(InterceptorModule);
			exports.push(InterceptorModule);
		}

		/**
		 * Rabbit Module
		 */
		const enableRabbitModule = !flags?.disableRabbitModule; //await darkly.getBooleanFlag('static-enable-rabbit-module');
		if (enableRabbitModule) {
			imports.push(ColdRabbitModule.forRootAsync());
			exports.push(ColdRabbitModule);
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
