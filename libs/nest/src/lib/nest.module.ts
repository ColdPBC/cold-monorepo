import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { HotShotsModule } from 'nestjs-hot-shots';
import { redisStore } from 'cache-manager-redis-yet';
import { BullModule } from '@nestjs/bull';
import { PrismaModule, PrismaService } from './prisma';
import { HealthController, HealthModule, HealthService } from './health';
import { DarklyService } from './darkly';
import { ColdCacheModule } from './cache';
import { AuthorizationModule, JwtAuthGuard, JwtStrategy } from './authorization';
import { InterceptorModule, OrgUserInterceptor } from './interceptors';
import { BaseWorker, WorkerLogger } from './worker';
import { ColdRabbitModule, ColdRabbitService } from './rabbit'; //import { CronModule, CronService } from './crons';
import { DatadogTraceModule } from 'nestjs-ddtrace';
import { S3Module, S3Service, SecretsModule, SecretsService } from './aws';
import { RedisServiceConfig } from './utility';
import { MqttModule } from './mqtt';

@Module({
  imports: [MqttModule],
})
export class NestModule {
  static async forRootAsync(redisDB: number, bucket?: string) {
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

    const parts = service.split('-');
    const type = parts.length > 2 ? parts[1] : 'core';
    const project = parts.length > 2 ? parts[2] : parts[1];

    /**
     * Imports Array
     */
    const imports: any = [
      ConfigModule.forRoot({
        isGlobal: true,
        load: configSecrets,
        cache: false,
      }),
      SecretsModule,
      BullModule.forRoot(await new RedisServiceConfig(config).getQueueConfig(type, project)),
      HttpModule,
      MqttModule,
    ];

    /**
     * Providers Array
     */
    const providers: any = [
      ConfigService,
      {
        provide: APP_INTERCEPTOR,
        useClass: OrgUserInterceptor,
      },
    ];

    /**
     * Controllers Array
     */
    const controllers: any = [];

    /**
     * Exports Array
     */
    const exports: any = [HttpModule, ConfigService];

    logger.info('Configuring Nest Module...');

    if (bucket) {
      imports.push(S3Module.forRootAsync(bucket));
      providers.push(S3Service);
      exports.push(S3Service);
    }

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
      controllers.push(HealthController);
      providers.push(HealthService);
      exports.push(HealthService);
    }

    /**
     * Authorization module
     */
    const enableAuthorizationModule = await darkly.getBooleanFlag('static-enable-authorization-module');
    if (enableAuthorizationModule) {
      if (!secrets['REDISCLOUD_URL']) {
        throw new Error('REDISCLOUD_URL is not set in this environment; It is required for the authorization module to function properly.');
      }

      imports.push(
        CacheModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async config => {
            return {
              store: await redisStore({
                url: config['internalConfig']['REDISCLOUD_URL'],
                ttl: 1000 * 60 * 60,
              }).catch(err => {
                console.error(err);
                throw new Error('Failed to connect to REDISCLOUD_URL');
              }),
            };
          },
          inject: [ConfigService],
          isGlobal: true,
        }),
        ColdCacheModule,
        await AuthorizationModule.forFeatureAsync(),
      );

      providers.push(JwtStrategy, JwtService, {
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
      });

      exports.push(JwtStrategy, JwtService);
    }

    /**
     * Interceptors module
     */
    const enableInterceptorModule = await darkly.getBooleanFlag('static-enable-interceptors-module');
    if (enableInterceptorModule) {
      imports.push(InterceptorModule);
    }

    /**
     * Prisma Module
     */
    const enablePrismaModule = await darkly.getBooleanFlag('static-enable-prisma-module');
    if (enablePrismaModule) {
      imports.push(PrismaModule);
      providers.push(PrismaService);
      exports.push(PrismaService);
    }

    /**
     * Rabbit Module
     */
    const enableRabbitModule = await darkly.getBooleanFlag('static-enable-rabbit-module');
    if (enableRabbitModule) {
      imports.push(ColdRabbitModule.forFeature());
      providers.push(ColdRabbitService);
      exports.push(ColdRabbitService);
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
