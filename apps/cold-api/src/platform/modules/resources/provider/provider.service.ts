import { Injectable } from '@nestjs/common';
import { Span } from 'nestjs-ddtrace';
import { AuthenticatedUser, BaseWorker, CacheService, ColdRabbitService, PrismaService } from '@coldpbc/nest';

@Span()
@Injectable()
export class ProviderService extends BaseWorker {
  constructor(private rabbit: ColdRabbitService, private prisma: PrismaService, private readonly cache: CacheService) {
    super('PolicyContentService');
  }

  /**
   * Retrieves data from a provider.
   *
   * @param {AuthenticatedUser} user - The authenticated user.
   * @param {any} payload - The payload containing routing key and action.
   * @param {boolean} bpc - Flag indicating whether to use cached data.
   * @returns {Promise<any>} - A promise that resolves to the data retrieved from the provider.
   * @throws {Error} - If an error occurs during retrieval.
   */
  async requestProviderDataRPC(user: AuthenticatedUser, data: any, bpc: boolean): Promise<any> {
    try {
      if (bpc) {
        const cached = await this.cache.get(`${data.routingKey}:${data.action}`);
        if (cached) {
          this.logger.info('Returning cached data', { user, ...cached });
          return cached;
        }
      }

      const response = await this.rabbit.request(data.routingKey, data, 'ui_request');

      return response;
    } catch (e: any) {
      this.logger.error(e.message, { user });
      throw e;
    }
  }
}
