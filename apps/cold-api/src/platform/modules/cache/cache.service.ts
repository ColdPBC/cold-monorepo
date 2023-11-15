// cache.service.ts
import { Global, Inject, Injectable } from '@nestjs/common';
import { RedisCache } from 'cache-manager-redis-yet';
import { Span, TraceService } from 'nestjs-ddtrace';
import { filter } from 'lodash';
import { BaseWorker } from '../../worker/worker.class';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Store } from 'cache-manager';
import { DarklyService } from '../vendor/darkly/darkly.service';

@Global()
@Span()
@Injectable()
export class CacheService extends BaseWorker {
  store: Store;
  defaultTTL: number;
  initialized: boolean;

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: RedisCache, private readonly darkly: DarklyService, private readonly tracer: TraceService) {
    super('CacheService');

    this.defaultTTL = process.env.CACHE_TTL ? parseInt(process.env.CACHE_TTL) : 1000 * 60 * 60;

    this.init();
  }

  async init(): Promise<boolean> {
    if (this.initialized) {
      return true;
    }

    if (!(await this.darkly.getFlag('api-cache-service'))) {
      this.logger.warn('api-cache-service flag is disabled, enable this flag to remove this warning');
      return false;
    }

    this.store = this.cacheManager.store;
    this.logger.debug('CacheService initialized');
    this.initialized = true;

    return this.initialized;
  }

  async get<T>(key: string): Promise<T | undefined> {
    if (!(await this.init())) {
      return undefined;
    }

    const response = await this.store.get<T>(key);

    this.metrics.increment('cold.api.cache', { action: 'get', key: key, environment: process.env.NODE_ENV || 'development' });

    return response;
  }

  async set<T>(key: string, value: T, options?: { ttl?: number; update?: boolean; wildcard?: boolean }): Promise<void> {
    try {
      if (!(await this.init())) {
        return undefined;
      }

      if (!options) {
        options = { ttl: this.defaultTTL, update: false, wildcard: false };
      }

      if (options.update && (await this.store.get(key))) {
        await this.delete(key, options.wildcard);
      }

      this.metrics.increment('cold.api.cache', { action: 'set', key: key, environment: process.env.NODE_ENV || 'development' });

      return await this.store.set(key, value, options.ttl);
    } catch (err) {
      this.logger.error(err.message, { error: err, key: key, value: value, options: options });
    }
  }

  async delete(pattern: string, wildcard?: boolean): Promise<void> {
    if (!(await this.init())) {
      return undefined;
    }

    this.metrics.increment('cold.api.cache', 1, { action: 'delete', key: pattern, environment: process.env.NODE_ENV || 'development' });

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

    return await this.store.reset();
  }
}
