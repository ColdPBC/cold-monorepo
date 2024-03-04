import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker, CacheService, ColdRabbitService, MqttService, PrismaService } from '@coldpbc/nest';
import { LocationsService } from '../locations/locations.service';
import { get } from 'lodash';
import { EventService } from '../../../utilities/events/event.service';
import { OrganizationHelper } from '../helpers/organization.helper';

@Injectable()
export class OrganizationIntegrationsService extends BaseWorker {
  constructor(
    private readonly cache: CacheService,
    private readonly locations: LocationsService,
    private readonly mqtt: MqttService,
    private readonly helper: OrganizationHelper,
    private readonly prisma: PrismaService,
    private readonly rabbit: ColdRabbitService,
    private readonly broadcast: EventService,
  ) {
    super(OrganizationIntegrationsService.name);
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
  async getOrganizationIntegrations(req: any, orgId: string, bpc?: boolean): Promise<any> {
    const { user } = req;
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
    req: any,
    orgId: string,
    locId: string,
    body: {
      service_definition_id: string;
      location_id?: string;
      timeout?: number;
      metadata: any;
    },
  ): Promise<any> {
    const { user, url } = req;
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

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'create',
        status: 'complete',
        data: {
          ...response,
        },
      });

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

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'create',
        status: 'failed',
        data: {
          error: e.message,
        },
      });

      throw e;
    }
  }

  /**
   * Enable Integration For Organization
   * @param req
   * @param orgId
   * @param body
   */
  async enableIntegration(
    req: any,
    orgId: string,
    body: {
      service_definition_id: string;
      timeout?: number;
      metadata: any;
    },
  ): Promise<any> {
    const { user, url } = req;
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

      const org = await this.helper.getOrganizationById(orgId, user);

      await this.broadcast.sendIntegrationEvent(
        false,
        'compliance.activated',
        {
          organization: org,
          service_definition_id: service.id,
          metadata: body.metadata,
          user: user,
        },
        user,
        orgId,
        {
          exchange: 'amq.direct',
          timeout: body.timeout || 5000,
        },
      );

      this.logger.info(`Integration enabled for ${org.name} with service ${service.name}`, {
        user,
        org,
        service,
        metadata: body.metadata,
      });

      this.mqtt.publishMQTT('ui', {
        org_id: org.id,
        user: user,
        swr_key: url,
        action: 'update',
        status: 'complete',
        data: {
          service_definition: service,
          metadata: body.metadata,
        },
      });

      return { message: `Integration enable request for ${org.name} with service ${service.name} was added to the queue` };
    } catch (e: any) {
      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'create',
        status: 'failed',
        data: {
          error: e.message,
        },
      });

      this.logger.error(e.message, { user });
      throw e;
    }
  }

  async createIntegration(
    req: any,
    orgId: string,
    body: {
      service_definition_id: string;
      timeout?: number;
      metadata: any;
    },
  ): Promise<any> {
    const { user, url } = req;
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

      const org = await this.helper.getOrganizationById(orgId, user);

      await this.broadcast.sendIntegrationEvent(
        false,
        'integration.enabled',
        {
          organization: org,
          service_definition_id: service.id,
          metadata: body.metadata,
          user: user,
        },
        user,
        orgId,
        {
          exchange: 'amq.direct',
          timeout: body.timeout || 5000,
        },
      );

      this.logger.info(`Integration enabled for ${org.name} with service ${service.name}`, {
        user,
        org,
        service,
        metadata: body.metadata,
      });

      this.mqtt.publishMQTT('ui', {
        org_id: org.id,
        user: user,
        swr_key: url,
        action: 'create',
        status: 'complete',
        data: {
          service_definition: service,
          metadata: body.metadata,
        },
      });

      return { message: `Integration enable request for ${org.name} with service ${service.name} was added to the queue` };
    } catch (e: any) {
      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'create',
        status: 'failed',
        data: {
          error: e.message,
        },
      });

      this.logger.error(e.message, { user });
      throw e;
    }
  }
}
