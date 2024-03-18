import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';

import { CacheService } from './cache.service';

@Global()
@Module({})
export class ColdCacheModule {
  static async forRootAsync(secrets: any) {
    return {
      module: ColdCacheModule,
      imports: [
        CacheModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async () => {
            return {
              store: await redisStore({
                url: secrets['REDISCLOUD_URL'],
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
      ],
      providers: [CacheService],
      exports: [CacheService],
    };
  }
}
