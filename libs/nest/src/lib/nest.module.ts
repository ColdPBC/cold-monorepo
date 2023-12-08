import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { DatadogTraceModule } from 'nestjs-ddtrace';
import { HotShotsModule } from 'nestjs-hot-shots';
import { redisStore } from 'cache-manager-redis-yet';

import { PrismaModule, PrismaService } from './prisma';
import { HealthController, HealthModule, HealthService } from './health';
import { DarklyModule } from './darkly';
import { ColdCacheModule } from './cache';
import { AuthorizationModule, JwtAuthGuard, JwtStrategy } from './authorization';
import { InterceptorModule } from './interceptors';
import { BaseWorker, WorkerLogger } from './worker';

@Module({})
export class NestModule {
  static async forRootAsync() {
    const logger = new WorkerLogger('NestModule');
    const config = new ConfigService();
    return {
      module: NestModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        CacheModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (cfg: ConfigService) => ({
            store: await redisStore({
              url: cfg.get<string>('REDISCLOUD_URL'),
              ttl: 1000 * 60 * 60,
            }),
          }),
          inject: [ConfigService],
          isGlobal: true,
        }),
        HealthModule,
        DarklyModule,
        PrismaModule,
        PassportModule,
        AuthorizationModule,
        HttpModule,
        InterceptorModule,
        DatadogTraceModule.forRoot({ controllers: true, providers: true }),
        HotShotsModule.forRoot({
          port: 8125,
          host: '127.0.0.1',
          globalize: true,
          errorHandler: err => {
            logger.error(err.message, {
              stack: err.stack,
              name: err.name,
              env: config.get('NODE_ENV') || config.get('DD_ENV') || 'unknown',
              version: config.get('DD_VERSION') || BaseWorker.getPkgVersion(),
              service: config.get('DD_SERVICE') || BaseWorker.getProjectName(),
            });
          },
          prefix: 'cold_',
          globalTags: {
            env: config.get('NODE_ENV') || config.getOrThrow('DD_ENV') || 'unknown',
            version: config.get('DD_VERSION') || BaseWorker.getPkgVersion(),
            service: config.get('DD_SERVICE') || BaseWorker.getProjectName(),
          },
        }),
        ColdCacheModule,
      ],
      controllers: [HealthController],
      providers: [
        PrismaService,
        ConfigService,
        JwtStrategy,
        JwtService,
        HealthService,
        {
          provide: APP_GUARD,
          useClass: JwtAuthGuard,
        },
      ],
      exports: [PrismaService, JwtStrategy, JwtService, HttpModule, ConfigService, HealthService],
    };
  }
}
