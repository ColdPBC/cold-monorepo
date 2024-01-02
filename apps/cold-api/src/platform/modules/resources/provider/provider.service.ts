import { Injectable } from '@nestjs/common';
import { Span } from 'nestjs-ddtrace';
import { AuthenticatedUser, BaseWorker, CacheService, ColdRabbitService, PrismaService, RabbitMessagePayload } from '@coldpbc/nest';

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
   * @param body
   * @param {boolean} bpc - Flag indicating whether to use cached data.
   * @returns {Promise<any>} - A promise that resolves to the data retrieved from the provider.
   * @throws {Error} - If an error occurs during retrieval.
   */
  async requestProviderDataRPC(
    user: AuthenticatedUser,
    body: {
      routing_key: string;
      payload: RabbitMessagePayload;
    },
    bpc: boolean,
  ): Promise<any> {
    try {
      if (bpc) {
        const cached = await this.cache.get(`${body.routing_key}:${body.payload.event}`);
        if (cached) {
          this.logger.info('Returning cached data', { user, ...cached });
          return cached;
        }
      }

      const response = await this.rabbit.request(body.routing_key, body.payload);

      return response;
    } catch (e: any) {
      this.logger.error(e.message, { user });
      throw e;
    }
  }
}
