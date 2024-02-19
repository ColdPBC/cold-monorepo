import { Injectable } from '@nestjs/common';
import { Span } from 'nestjs-ddtrace';
import { BaseWorker, CacheService, PrismaService } from '@coldpbc/nest';

@Span()
@Injectable()
export class IntegrationsService extends BaseWorker {
  constructor(private prisma: PrismaService, private readonly cache: CacheService) {
    super('PolicyContentService');
  }

  /**
   * Get All Integrations
   *
   * @param {AuthenticatedUser} user - The authenticated user.
   * @param {any} payload - The payload containing routing key and action.
   * @param {boolean} bpc - Flag indicating whether to use cached data.
   * @returns {Promise<any>} - A promise that resolves to the data retrieved from the integrations.
   * @throws {Error} - If an error occurs during retrieval.
   */
  async getAllIntegrations(req: any, data: any, bpc: boolean): Promise<any> {
    const { user } = req;
    try {
      if (bpc) {
        const cached = await this.cache.get(`${data.routingKey}:${data.action}`);
        if (cached) {
          this.logger.info('Returning cached data', { user, ...cached });
          return cached;
        }
      }

      const integrations = await this.prisma.integrations.findMany();

      this.logger.info('Returning integrations', { user, integrations });

      return integrations;
    } catch (e: any) {
      this.logger.error(e.message, { user });
      throw e;
    }
  }
}
