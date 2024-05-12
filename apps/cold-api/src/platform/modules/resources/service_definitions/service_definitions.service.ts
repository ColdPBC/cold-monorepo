import { Get, Injectable } from '@nestjs/common';
import { Span } from 'nestjs-ddtrace';
import { BaseWorker, Cuid2Generator, IAuthenticatedUser, PrismaService, Roles } from '@coldpbc/nest';
import { integration_service_type } from '@prisma/client';
import { allRoles } from '../_global/global.params';

@Span()
@Injectable()
export class ServiceDefinitionsService extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
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
      const cuid2 = new Cuid2Generator('sdef');
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
            name: existing.name,
          },
          data: {
            //update ID to be scoped to service definition if it is not already
            id: existing.id.includes('sdef') ? existing.id : cuid2.scopedId,
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
          id: cuid2.scopedId,
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
   * Gets a service by name.
   *
   * @param {string} name - The name of the service.
   * @returns {Promise<any>} - A promise that resolves to the service.
   * @throws {Error} - If an error occurs during retrieval.
   */
  async getService(user: IAuthenticatedUser, name: string): Promise<any> {
    try {
      const service = await this.prisma.service_definitions.findUnique({
        where: {
          name: name,
        },
        include: {
          integrations: user.isColdAdmin,
        },
      });

      if (!service) throw new Error(`Service not found for ${name}`);

      return service;
    } catch (err) {
      this.logger.error(err.message, { error: err, name });
      throw err;
    }
  }

  /**
   * Gets all services.
   *
   * @returns {Promise<any>} - A promise that resolves to the services.
   * @throws {Error} - If an error occurs during retrieval.
   */
  @Get('services')
  @Roles(...allRoles)
  async getServices(user: IAuthenticatedUser): Promise<any> {
    try {
      const services = await this.prisma.service_definitions.findMany({
        include: {
          integrations: user.isColdAdmin,
        },
      });

      if (!services) throw new Error(`Services not found`);

      return services;
    } catch (err) {
      this.logger.error(err.message, { error: err });
      throw err;
    }
  }
}
