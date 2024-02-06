import { Injectable } from '@nestjs/common';
import { Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { BaseWorker, RabbitMessagePayload } from '@coldpbc/nest';
import { MembersService } from './members.service';

@Injectable()
export class MembersRabbitService extends BaseWorker {
  constructor(private readonly members: MembersService) {
    super(MembersRabbitService.name);
  }

  /**
   * Handles RPC messages received from RabbitMQ.
   *
   * @param data.msg - The RPC message in string format.
   *
   * @return - A Promise that resolves to the response of the RPC message.
   *          The response will be of type unknown.
   *          If the RPC message is valid and the action is recognized, the response will be the result of the corresponding action.
   *          If the RPC message is invalid or the action is unknown, an error response will be returned.
   * @param msg
   */
  @RabbitRPC({
    exchange: 'amq.direct',
    routingKey: `rpc.api.organizations.members`,
    queue: `rpc.api.organization.members`,
    allowNonJsonMessages: false,
  })
  async handleRPCMessages(msg: RabbitMessagePayload): Promise<any | Nack> {
    try {
      const parsed: unknown = msg.data || msg;
      this.logger.info(`received RPC ${msg.event} request from ${msg.from}`, parsed);

      switch (msg.method) {
        case 'getOrganizationMembers': {
          const { orgId, req, bpc } = msg.data;
          return this.members.getOrganizationMembers(orgId, req, bpc);
        }
        case 'addUserToOrganization': {
          const { orgId, userId, req, roleName, bpc } = msg.data;
          return this.members.addUserToOrganization(orgId, userId, req, roleName, bpc);
        }
        case 'removeUserFromOrganization': {
          const { orgId, body, req } = msg.data;
          return this.members.removeUserFromOrganization(orgId, body, req);
        }
        default:
          return new Nack();
      }
    } catch (err) {
      this.logger.error(err.message, { error: err, data: JSON.parse(msg.data) });
      return new Nack();
    }
  }
}
