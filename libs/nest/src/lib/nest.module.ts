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
import { S3Module, SecretsModule, SecretsService } from './aws';
import { RedisServiceConfig, GeneratorsModule } from './utility';
import { MqttModule } from './mqtt';
import { ComplianceDataModule } from './compliance';

@Module({
  imports: [MqttModule, GeneratorsModule],
})
export class NestModule {
  static async forRootAsync() {
    const logger = new WorkerLogger('NestModule');
    const config = new ConfigService();

    const ss = new SecretsService();
    await ss.onModuleInit();
    const service = config.getOrThrow('DD_SERVICE');
    const configSecrets: any = [];

    const secrets = await ss.getRootSecrets(service);
    configSecrets.push(() => secrets);

    const darkly = new DarklyService(config);
    await darkly.onModuleInit(secrets['LD_SDK_KEY']);

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
      BullModule.forRoot(await new RedisServiceConfig(secrets).getQueueConfig(type, project)),
      HttpModule,
      MqttModule,
      ComplianceDataModule,
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
    const exports: any = [HttpModule, ConfigService, ComplianceDataModule];

    logger.info('Configuring Nest Module...');

    imports.push(S3Module);

    //configure-enable-hot-shots-module
    const enableHotShots = await darkly.getBooleanFlag('static-enable-hot-shots-module');
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
    const enableDDTrace = await darkly.getBooleanFlag('static-enable-data-dog-trace-module');
    if (enableDDTrace) {
      imports.push(
        DatadogTraceModule.forRoot({
          controllers: true,
          providers: true,
        }),
      );
    }

    /**
     * Health module
     */
    const enableHealthModule = await darkly.getBooleanFlag('static-enable-health-module');
    if (enableHealthModule) {
      imports.push(HealthModule);
    }

    /**
     * Authorization module
     */
    const enableAuthorizationModule = await darkly.getBooleanFlag('static-enable-authorization-module');
    if (enableAuthorizationModule) {
      if (!secrets['REDISCLOUD_URL']) {
        throw new Error('REDISCLOUD_URL is not set in this environment; It is required for the authorization module to function properly.');
      }

      imports.push(ColdCacheModule.forRootAsync(secrets), await AuthorizationModule.forFeatureAsync());
    }

    /**
     * Prisma Module
     */
    const enablePrismaModule = await darkly.getBooleanFlag('static-enable-prisma-module');
    if (enablePrismaModule) {
      imports.push(PrismaModule);
    }

    /**
     * Interceptors module
     */
    const enableInterceptorModule = await darkly.getBooleanFlag('static-enable-interceptors-module');
    if (enableInterceptorModule) {
      imports.push(InterceptorModule);
    }

    /**
     * Rabbit Module
     */
    const enableRabbitModule = await darkly.getBooleanFlag('static-enable-rabbit-module');
    if (enableRabbitModule) {
      imports.push(ColdRabbitModule.forRootAsync());
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
