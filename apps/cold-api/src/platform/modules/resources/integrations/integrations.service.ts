import { Injectable } from '@nestjs/common';
import { Span } from 'nestjs-ddtrace';
import { AuthenticatedUser, BaseWorker, CacheService, ColdRabbitService, PrismaService } from '@coldpbc/nest';
import { integration_service_type } from '@prisma/client';

@Span()
@Injectable()
export class IntegrationsService extends BaseWorker {
  constructor(private prisma: PrismaService, private readonly cache: CacheService) {
    super('PolicyContentService');
  }

  /**
   * Registers a service with the API.
   *
   * @param {string} name - The name of the service.
   * @param {string} type - The type of the service.
   * @param {string} label - The label of the service.
   * @param {any} definition - The definition of the service.
   * @returns {Promise<any>} - A promise that resolves to the registered service.
   * @throws {Error} - If an error occurs during registration.
   */
  async registerService(name: string, type: integration_service_type, label: string, definition: any): Promise<any> {
    try {
      const existing = await this.prisma.service_definitions.findFirst({
        where: {
          name: name,
        },
      });

      if (existing) {
        this.logger.debug(`Service already registered; will update record with current values`, {
          existing,
          name,
          type,
          label,
          definition,
        });
        return await this.prisma.service_definitions.update({
          where: {
            id: existing.id,
          },
          data: {
            name,
            type,
            label,
            definition,
          },
        });
      }

      this.logger.debug(`Registering service`, { name, type, label, definition });

      const service = await this.prisma.service_definitions.create({
        data: {
          name,
          type,
          label,
          definition,
        },
      });

      this.logger.debug(`Service registered`, service);
      return service;
    } catch (err) {
      this.logger.error(err.message, { error: err, definition });
      throw err;
    }
  }

  /**
   * Retrieves data from a integrations.
   *
   * @param {AuthenticatedUser} user - The authenticated user.
   * @param {any} payload - The payload containing routing key and action.
   * @param {boolean} bpc - Flag indicating whether to use cached data.
   * @returns {Promise<any>} - A promise that resolves to the data retrieved from the integrations.
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

      const rabbit: ColdRabbitService = new ColdRabbitService();
      const response = await rabbit.request(data.routingKey, data);

      return response;
    } catch (e: any) {
      this.logger.error(e.message, { user });
      throw e;
    }
  }
}
