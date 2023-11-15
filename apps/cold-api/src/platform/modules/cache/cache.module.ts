import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';

import { CacheService } from './cache.service';
import { DarklyModule } from '../vendor/darkly/darkly.module';
import { DarklyService } from '../vendor/darkly/darkly.service';

@Module({
  imports: [
    CacheModule.register({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        url: `${configService.get<string>('REDISCLOUD_URL')}`,
        ttl: 1000 * 60 * 60,
      }),
    }),
    DarklyModule,
  ],
  providers: [CacheService, DarklyService],
  exports: [CacheService, DarklyService],
})
export class ColdCacheModule {}
