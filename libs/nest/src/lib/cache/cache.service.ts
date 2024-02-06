// cache.service.ts
import { Global, Inject, Injectable } from '@nestjs/common';
import { RedisCache } from 'cache-manager-redis-yet';
import { Span } from 'nestjs-ddtrace';
import { filter } from 'lodash';
import { BaseWorker } from '../worker';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Store } from 'cache-manager';
import { ConfigService } from '@nestjs/config';

@Global()
@Span()
@Injectable()
export class CacheService extends BaseWorker {
  store: Store;
  defaultTTL: number;
  initialized: boolean = false;

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: RedisCache, private readonly config: ConfigService) {
    super('CacheService');
    this.store = this.cacheManager.store;
    this.defaultTTL = parseInt(this.config.get('CACHE_TTL', `${1000 * 60 * 60}`));

    this.init();
  }

  async init(): Promise<boolean> {
    if (this.initialized) {
      return true;
    }

    this.logger.debug('CacheService initialized');
    this.initialized = true;

    return this.initialized;
  }

  async get<T>(key: string): Promise<T | undefined> {
    if (!(await this.init())) {
      return undefined;
    }

    this.setTags({ action: 'get', key });

    const response = await this.store.get<T>(key);

    this.metrics.increment('cold.api.cache', this.tags);

    return response;
  }

  async set<T>(key: string, value: T, options?: { ttl?: number; update?: boolean; wildcard?: boolean }): Promise<void> {
    try {
      if (!(await this.init())) {
        return undefined;
      }

      this.setTags({ action: 'set', key, options });

      if (!options) {
        options = { ttl: this.defaultTTL, update: false, wildcard: false };
      }

      if (options.update && (await this.store.get(key))) {
        await this.delete(key, options.wildcard);
      }

      this.metrics.increment('cold.api.cache', this.tags);

      return await this.store.set(key, value, options.ttl);
    } catch (err: any) {
      this.logger.error(err.message, { error: err, key: key, value: value, options: options });
    }
  }

  async delete(pattern: string, wildcard?: boolean): Promise<void> {
    if (!(await this.init())) {
      return undefined;
    }

    this.setTags({ action: 'delete', key: pattern });

    this.metrics.increment('cold.api.cache', 1, this.tags);

    if (wildcard) {
      const keys = await this.store.keys();

      const filtered = await filter(keys, key => key.startsWith(pattern));

      for (const k of filtered) {
        await this.store.del(k);
      }
    } else {
      await this.store.del(pattern);
    }

    return;
  }

  async reset(): Promise<void> {
    if (!(await this.init())) {
      return undefined;
    }

    this.setTags({ action: 'reset' });

    this.metrics.increment('cold.api.cache', 1, this.tags);

    return await this.store.reset();
  }
}
