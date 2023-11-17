import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ServeStaticModule } from '@nestjs/serve-static';
import { redisStore } from 'cache-manager-redis-yet';
import { DatadogTraceModule } from 'nestjs-ddtrace';
import { HotShotsModule } from 'nestjs-hot-shots';
import { join } from 'path';
import { AuthorizationModule } from '../authorization/authorization.module';
import { JwtAuthGuard } from '../authorization/guards/jwtAuth.guard';
import { JwtStrategy } from '../authorization/jwt.strategy';
import { HealthController, HealthModule, HealthService, DarklyModule, DarklyService, PrismaModule } from 'nest';
import { ActionsModule } from './resources/actions/actions.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { ComponentDefinitionsModule } from './resources/component-definitions/component-definitions.module';
import { NewsModule } from './resources/news/news.module';
import { PolicyDefinitionsModule } from './resources/policies/policy-definitions.module';
import { SurveysModule } from './resources/surveys/surveys.module';
import { InterceptorModule } from '../interceptors/interceptor.module';
import { Auth0Module } from './resources/auth0/auth0.module';

process.env.DD_VERSION = process.env.npm_package_version;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      serveStaticOptions: {
        index: false,
      },
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
    InterceptorModule,
    PrismaModule,
    PassportModule,
    AuthorizationModule,
    HttpModule,
    Auth0Module,
    ComponentDefinitionsModule,
    PolicyDefinitionsModule,
    SurveysModule,
    CategoriesModule,
    NewsModule,
    ActionsModule,
    DatadogTraceModule.forRoot(),
    HotShotsModule.forRoot({
      port: 8125,
      host: '127.0.0.1',
      globalTags: { version: process.env.npm_package_version || '0.0.0', service: process.env.npm_package_name || 'cold-api-nest', env: process.env.NODE_ENV || 'development' },
    }),
  ],
  controllers: [HealthController],
  providers: [
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
  exports: [JwtStrategy, JwtService, HttpModule, ConfigService],
})
export class AppModule {}
