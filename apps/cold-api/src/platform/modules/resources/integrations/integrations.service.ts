import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Span } from 'nestjs-ddtrace';
import { get } from 'lodash';
import { AuthenticatedUser, BaseWorker, CacheService, ColdRabbitService, PrismaService } from '@coldpbc/nest';
import { OrganizationLocationsService } from '../organization_locations/organization_locations.service';

@Span()
@Injectable()
export class IntegrationsService extends BaseWorker {
  constructor(
    private prisma: PrismaService,
    private readonly cache: CacheService,
    private readonly rabbit: ColdRabbitService,
    private readonly locations: OrganizationLocationsService,
  ) {
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
  async getAllIntegrations(user: AuthenticatedUser, data: any, bpc: boolean): Promise<any> {
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

  /**
   * Get Organization Integrations
   *
   * @param {AuthenticatedUser} user - The authenticated user.
   * @param {string} orgId
   * @param location_id
   * @param {boolean} bpc - Flag indicating whether to use cached data.
   * @returns {Promise<any>} - A promise that resolves to the data retrieved from the integrations.
   * @throws {Error} - If an error occurs during retrieval.
   */
  async getOrganizationIntegrations(user: AuthenticatedUser, orgId: string, bpc?: boolean): Promise<any> {
    try {
      if (bpc) {
        const cached = await this.cache.get(`organizations:${orgId}:integrations`);
        if (cached) {
          this.logger.info('Returning cached data', { user, ...cached });
          return cached;
        }
      }

      const integrations = await this.prisma.integrations.findMany({
        where: {
          organization_id: bpc && user.isColdAdmin ? orgId : user.coldclimate_claims.org_id,
        },
        include: {
          organization: true,
          service_definition: true,
        },
      });

      await this.cache.set(`organizations:${orgId}:integrations`, integrations, { ttl: 60 * 60 * 24 });

      this.logger.info('Returning integrations', { user, integrations });

      return integrations;
    } catch (e: any) {
      this.logger.error(e.message, { user });
      throw new UnprocessableEntityException(e);
    }
  }

  async createLocationIntegration(
    user: AuthenticatedUser,
    orgId: string,
    locId: string,
    body: {
      service_definition_id: string;
      location_id?: string;
      timeout?: number;
      metadata: any;
    },
  ): Promise<any> {
    try {
      const service = await this.prisma.service_definitions.findUnique({
        where: {
          id: body.service_definition_id,
        },
      });

      if (!service || !get(service.definition, 'rabbitMQ.publishOptions.routing_key', false)) {
        throw new UnprocessableEntityException(`Service definition ${body.service_definition_id} not found.`);
      }

      const org = await this.prisma.organizations.findUnique({
        where: {
          id: user.isColdAdmin ? orgId : user.coldclimate_claims.org_id,
        },
        include: {
          integrations: true,
          locations: true,
        },
      });

      if (!org) {
        throw new UnprocessableEntityException(`Organization ${orgId} is invalid.`);
      }

      let location;

      if (locId) {
        location = org.locations.find(l => l.id === locId);
      } else {
        location = org.locations.find(l => l.address === body.metadata?.address);
      }

      if (!location) {
        location = await this.locations.createOrganizationLocation(user, orgId, body.metadata);
      }

      const response = await this.rabbit.request(
        get(service.definition, 'rabbitMQ.rpcOptions.routing_key', 'deadletter'),
        {
          data: {
            organization: org,
            location_id: location.id,
            service_definition_id: service.id,
            metadata: body.metadata,
            user: user,
          },
          from: 'cold.api',
          event: 'integration.enabled',
        },
        {
          exchange: 'amq.direct',
          timeout: body.timeout || 5000,
        },
      );
      switch (response.status) {
        case 201:
        case 200:
          return response.data;
        case 404:
          throw new NotFoundException(response.response);
        case 409:
          throw new ConflictException(response.response);
        case 422:
          throw new UnprocessableEntityException(response.response);
        default:
          return response;
      }
    } catch (e: any) {
      this.logger.error(e.message, { user });
      throw e;
    }
  }

  async createIntegration(
    user: AuthenticatedUser,
    orgId: string,
    body: {
      service_definition_id: string;
      timeout?: number;
      metadata: any;
    },
  ): Promise<any> {
    try {
      const service = await this.prisma.service_definitions.findUnique({
        where: {
          id: body.service_definition_id,
        },
      });

      if (!service) {
        throw new UnprocessableEntityException(`Service definition ${body.service_definition_id} not found.`);
      }

      if (!get(service.definition, 'rabbitMQ.publishOptions.routing_key', false)) {
        this.logger.warn(`Service definition ${body.service_definition_id} does not have a routing key at path 'rabbitMQ.publishOptions.routing_key'`, { service });
      }

      const org = await this.prisma.organizations.findUnique({
        where: {
          id: user.isColdAdmin ? orgId : user.coldclimate_claims.org_id,
        },
        include: {
          integrations: true,
        },
      });

      if (!org) {
        throw new UnprocessableEntityException(`Organization ${orgId} is invalid.`);
      }

      let response = await this.rabbit.request(
        get(service.definition, 'rabbitMQ.rpcOptions.routing_key', 'deadletter'),
        {
          data: {
            organization: org,
            service: service,
            service_definition_id: service.id,
            metadata: body.metadata,
            user: user,
          },
          from: 'cold.api',
          event: 'integration.enabled',
        },
        {
          exchange: 'amq.direct',
          timeout: body.timeout || 5000,
        },
      );

      if (!response) {
        response = await this.rabbit.publish(
          get(service.definition, 'rabbitMQ.publishOptions.routing_key', 'deadletter'),
          {
            data: {
              organization: org,
              service: service,
              service_definition_id: service.id,
              metadata: body.metadata,
              user: user,
            },
            from: 'cold.api',
          },
          'integration.enabled',
          {
            exchange: 'amq.direct',
            timeout: body.timeout || 5000,
          },
        );
      }
      switch (response?.status) {
        case 201:
        case 200:
          return response.data;
        case 404:
          throw new NotFoundException(response.response);
        case 409:
          throw new ConflictException(response.response);
        case 422:
          throw new UnprocessableEntityException(response.response);
        default:
          return response;
      }
    } catch (e: any) {
      this.logger.error(e.message, { user });
      throw e;
    }
  }
}
