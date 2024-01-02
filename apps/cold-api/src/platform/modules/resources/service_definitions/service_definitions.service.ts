import { Injectable } from '@nestjs/common';
import { Span } from 'nestjs-ddtrace';
import { BaseWorker, CacheService, ColdRabbitService, PrismaService } from '@coldpbc/nest';
import { integration_service_type } from '@prisma/client';

@Span()
@Injectable()
export class ServiceDefinitionsService extends BaseWorker {
  constructor(private prisma: PrismaService, private readonly cache: CacheService, private rabbit: ColdRabbitService) {
    super('ServiceDefinitionsService');
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
}
