import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';

import { CacheService } from './cache.service';
import { DarklyModule, DarklyService } from '../darkly';

@Global()
@Module({
  imports: [
    CacheModule.register({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        db: configService.get('REDIS_DB', 0),
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
