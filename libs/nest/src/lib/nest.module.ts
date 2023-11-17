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

import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { RedactorModule } from './redactor';
import { HealthController, HealthModule, HealthService } from './health';
import { DarklyModule, DarklyService } from './darkly';
import { ColdCacheModule } from './cache';
import { AuthorizationModule } from './authorization/authorization.module';
import { InterceptorModule } from './interceptors/interceptor.module';
import { JwtStrategy } from './authorization/jwt.strategy';
import { JwtAuthGuard } from './authorization/guards/jwtAuth.guard';

@Module({
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
    DatadogTraceModule.forRoot(),
    HotShotsModule.forRoot({
      port: 8125,
      host: '127.0.0.1',
      globalTags: {
        version: process.env['npm_package_version'] || '0.0.0',
        service: process.env['npm_package_name'] || 'cold-api-nest',
        env: process.env['NODE_ENV'] || 'development',
      },
    }),
    HealthModule,
    DarklyModule,
    ColdCacheModule,
  ],
  controllers: [HealthController],
  providers: [
    PrismaService,
    ConfigService,
    DarklyService,
    JwtStrategy,
    JwtService,
    HealthService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [PrismaService, JwtStrategy, JwtService, HttpModule, ConfigService, DarklyService, HealthService, ColdCacheModule],
})
export class NestModule {}
