import { AuthenticatedUser, BaseWorker, ColdRabbitService, PrismaService } from '@coldpbc/nest';
import { get, merge } from 'lodash';
import { Global, Injectable } from '@nestjs/common';

@Global()
@Injectable()
export class BroadcastEventService extends BaseWorker {
  /**
   * Constructs a new instance of the BroadcastEventService.
   *
   * @param {PrismaService} prisma - The PrismaService instance for database operations.
   * @param {ColdRabbitService} rabbit - The ColdRabbitService instance for RabbitMQ operations.
   */
  constructor(private readonly prisma: PrismaService, private readonly rabbit: ColdRabbitService) {
    super(BroadcastEventService.name);
  }

  /**
   * This method is used to send an event.
   * It either takes a request object or an orgId and a user.
   *
   * @param {boolean} isRPC - Indicates whether the event is a Remote Procedure Call.
   * @param {string} event - The event name.
   * @param {any} data - The data to be sent with the event.
   * @param {Request | AuthenticatedUser} requestOrUser - The request object or the user.
   * @param {string} [orgId] - The organization id. This is optional when a request object is provided.
   * @returns {Promise<any | void>} The response from the event or void if it's an asynchronous event.
   * @throws Will throw an error if the user is required when authenticated request object is not provided.
   * @throws Will throw an error if the organization id is required and not provided.
   */
  async sendEvent(isRPC: boolean, event: string, data: any, request: Request): Promise<any | void>;
  async sendEvent(isRPC: boolean, event: string, data: any, user: AuthenticatedUser): Promise<any | void>;
  async sendEvent(isRPC: boolean, event: string, data: any, user: AuthenticatedUser, orgId: string): Promise<any | void>;
  async sendEvent(isRPC: boolean, event: string, data: any, requestOrUser: Request | AuthenticatedUser, orgId?: string): Promise<any | void> {
    // Extract the user from the request or use the provided user
    const currentUser = (requestOrUser['user'] || requestOrUser) as AuthenticatedUser;

    // If no user is provided, throw an error
    if (!currentUser) {
      throw new Error('User is required, when authenticated request object is not provided');
    }

    let org: string = '';
    if (!orgId) {
      // If orgId is not provided, try to extract it from the request or the user's claims
      if (requestOrUser instanceof Request && !requestOrUser['params'].orgId) {
        org = currentUser.coldclimate_claims.org_id;
      } else if (requestOrUser instanceof Request && requestOrUser['params'].orgId) {
        // if orgId is not provided, try to get it from request otherwise get it from user claims;
        org = get(requestOrUser, 'params.orgId', currentUser.coldclimate_claims.org_id);
      }
    } else {
      // If orgId is provided but doesn't start with 'org_', throw an error
      if (!orgId || !orgId.startsWith('org_')) {
        throw new Error('Organization id is required.');
      }
      org = orgId;
    }

    // Fetch the organization from the database
    const organization = await this.prisma.organizations.findUnique({
      where: {
        id: org,
      },
    });

    // Fetch all integrations for the organization
    const integrations = await this.prisma.integrations.findMany({
      where: {
        organization_id: orgId,
      },
      include: {
        service_definition: true,
      },
    });

    // Loop through each integration
    for (const integration of integrations) {
      const service_definition = integration.service_definition;

      // If the service definition doesn't have a routing key, log a warning and skip this iteration
      const routingKey = get(service_definition, 'definition.rabbitMQ.publishOptions.routing_key');
      if (!routingKey) {
        this.logger.warn('rabbitMQ.publishOptions.routing_key not found in service definition; unable to publish to service', { service_definition });
        continue;
      }

      // Merge the supplied data with the organization, service definition, integration, and user
      const merged = merge(data, { organization, service_definition, integration, user: currentUser });

      // Prepare the payload
      const payload = {
        from: 'cold-api',
        ...merged,
      };

      // If the event is an RPC, send an async event, otherwise send an RPC event and return the response
      if (isRPC) {
        this.sendAsyncEvent(routingKey, event, payload);
      } else {
        return this.sendRPCEvent(routingKey, event, payload);
      }
    }
  }

  /**
   * This method is used to send an asynchronous event.
   *
   * @param {string} routingKey - The routing key for the event.
   * @param {string} event - The event name.
   * @param {any} payload - The data to be sent with the event.
   * @returns {Promise<void>} A Promise that resolves once the event is sent.
   */
  async sendAsyncEvent(routingKey: string, event: string, payload: any): Promise<void> {
    this.rabbit.publish(routingKey, event, payload);
  }

  /**
   * This method is used to send a Remote Procedure Call (RPC) event.
   *
   * @param {string} routingKey - The routing key for the event.
   * @param {string} event - The event name.
   * @param {any} payload - The data to be sent with the event.
   * @returns {Promise<any>} A Promise that resolves with the response from the event.
   */
  async sendRPCEvent(routingKey: string, event: string, payload: any): Promise<any> {
    await this.rabbit.request(routingKey, { ...payload, event });
  }
}
