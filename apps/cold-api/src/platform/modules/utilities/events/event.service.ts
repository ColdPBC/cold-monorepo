import { BaseWorker, ColdRabbitService, IAuthenticatedUser, IRequest, PrismaService, RabbitMessageOptions } from '@coldpbc/nest';
import { get, merge } from 'lodash';
import { Global, Injectable } from '@nestjs/common';

@Global()
@Injectable()
export class EventService extends BaseWorker {
  /**
   * Constructs a new instance of the BroadcastEventService.
   *
   * @param {PrismaService} prisma - The PrismaService instance for database operations.
   * @param {ColdRabbitService} rabbit - The ColdRabbitService instance for RabbitMQ operations.
   */
  constructor(readonly prisma: PrismaService, readonly rabbit: ColdRabbitService) {
    super(EventService.name);
  }

  async sendPlatformEvent(
    routingKey: string,
    event: string,
    data: any,
    requestOrUser: Request | IAuthenticatedUser,
    orgId?: string,
    options?: RabbitMessageOptions,
  ): Promise<any | void> {
    // Extract the user from the request or use the provided user
    const currentUser = (requestOrUser['user'] || requestOrUser) as IAuthenticatedUser;

    // If no user is provided, throw an error
    if (!currentUser) {
      throw new Error('User is required, when authenticated request object is not provided');
    }

    let org = '';
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

    // Merge the supplied data with the organization, service definition, integration, and user
    const merged = merge({ payload: data }, { organization, integrations, user: currentUser });

    await this.sendAsyncEvent(routingKey, event, merged, options);
  }

  /**
   * This method is used to send an event to all enabled integrations.
   * It either takes a request object or an orgId and a user.
   *
   * @param {boolean} isRPC - Indicates whether the event is a Remote Procedure Call.
   * @param {string} event - The event name.
   * @param {any} data - The data to be sent with the event.
   * @param request
   * @param options
   * @returns {Promise<any | void>} The response from the event or void if it's an asynchronous event.
   * @throws Will throw an error if the user is required when authenticated request object is not provided.
   * @throws Will throw an error if the organization id is required and not provided.
   */
  async sendIntegrationEvent(isRPC: boolean, event: string, data: any, request: IRequest): Promise<any | void>;
  async sendIntegrationEvent(isRPC: boolean, event: string, data: any, user: IAuthenticatedUser): Promise<any | void>;
  async sendIntegrationEvent(isRPC: boolean, event: string, data: any, user: IAuthenticatedUser, options?: RabbitMessageOptions): Promise<any | void>;
  async sendIntegrationEvent(isRPC: boolean, event: string, data: any, requestOrUser: IRequest | IAuthenticatedUser, options?: RabbitMessageOptions): Promise<any | void> {
    // Extract the user from the request or use the provided user
    const currentUser = (requestOrUser['user'] || requestOrUser) as IAuthenticatedUser;

    // If no user is provided, throw an error
    if (!currentUser) {
      throw new Error('User is required, when authenticated request object is not provided');
    }

    let org: any = null;
    if (data.org || data.organization || requestOrUser['organization']) {
      org = data.org || data.organization || requestOrUser['organization'];
    }

    if (!org) {
      let orgId;

      // If orgId is not provided, try to extract it from the request or the user's claims
      if (requestOrUser instanceof Request && !requestOrUser['params'].orgId) {
        orgId = currentUser.coldclimate_claims.org_id;
      } else if (requestOrUser instanceof Request && requestOrUser['params'].orgId) {
        // if orgId is not provided, try to get it from request otherwise get it from user claims;
        orgId = get(requestOrUser, 'params.orgId', currentUser.coldclimate_claims.org_id);
      }

      // If orgId is provided but doesn't start with 'org_', throw an error
      if (!orgId || !orgId.startsWith('org_')) {
        throw new Error('Organization id is required.');
      }
    }

    // Fetch all integrations for the organization
    const integrations = await this.prisma.integrations.findMany({
      where: {
        organization_id: org?.id,
      },
      include: {
        service_definition: true,
      },
    });

    const responses: any[] = [];
    // Loop through each integration
    for (const integration of integrations) {
      const service_definition = integration.service_definition;

      // If the service definition doesn't have a routing key, log a warning and skip this iteration
      const routingKey: any = get(service_definition, `definition.rabbitMQ.${isRPC ? 'rpcOptions' : 'publishOptions'}.routing_key`);
      if (!routingKey) {
        this.logger.warn('rabbitMQ.publishOptions.routing_key not found in service definition; unable to publish to service', { service_definition });
        continue;
      }

      // Merge the supplied data with the organization, service definition, integration, and user
      const merged = merge(
        { payload: data },
        {
          organization: org,
          service_definition,
          integration,
          user: currentUser,
        },
      );

      // If the event is an RPC, send an async event, otherwise send an RPC event and return the response
      if (!isRPC) {
        await this.sendAsyncEvent(routingKey, event, merged, options);
      } else {
        responses.push(await this.sendRPCEvent(routingKey, event, merged, options));
      }
    }

    if (isRPC) {
      return responses;
    }
  }

  /**
   * This method is used to send an asynchronous event.
   *
   * @param {string} routingKey - The routing key for the event.
   * @param {string} event - The event name.
   * @param {any} payload - The data to be sent with the event.
   * @param options
   * @returns {Promise<void>} A Promise that resolves once the event is sent.
   */
  async sendAsyncEvent(routingKey: string, event: string, payload: any, options?: RabbitMessageOptions): Promise<void> {
    await this.rabbit.publish(routingKey, { from: 'cold-api', event, data: payload }, options);
  }

  /**
   * This method is used to send a Remote Procedure Call (RPC) event.
   *
   * @param {string} routingKey - The routing key for the event.
   * @param {string} event - The event name.
   * @param {any} payload - The data to be sent with the event.
   * @param options
   * @returns {Promise<any>} A Promise that resolves with the response from the event.
   */
  async sendRPCEvent(routingKey: string, event: string, payload: any, options?: RabbitMessageOptions): Promise<any> {
    await this.rabbit.request(routingKey, { from: 'cold-api', event, data: payload }, options);
  }
}
