import { Injectable } from '@nestjs/common';
import { BackOffStrategies, BaseWorker, PrismaService, RabbitMessagePayload, S3Service } from '@coldpbc/nest';
import { Nack, RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { AppService } from './app.service';
import { FileService } from './assistant/files/file.service';
import { ConfigService } from '@nestjs/config';

/**
 * RabbitService class.
 */
@Injectable()
export class RabbitService extends BaseWorker {
  constructor(
    @InjectQueue('openai') private queue: Queue,
    private readonly config: ConfigService,
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
    private readonly s3: S3Service,
    private readonly files: FileService,
  ) {
    super(RabbitService.name);
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
    routingKey: `cold.platform.openai.rpc`,
    queue: `cold.platform.openai.rpc`,
    allowNonJsonMessages: false,
  })
  async handleRPCMessages(msg: RabbitMessagePayload): Promise<any | Nack> {
    try {
      const parsed: unknown = msg.data || msg;
      this.logger.info(`received RPC ${msg.event} request from ${msg.from}`, parsed);

      return this.processRPCMessage(msg.event, msg.from, parsed);
    } catch (err) {
      this.logger.error(err.message, { error: err, data: JSON.parse(msg.data) });
      return new Nack();
    }
  }

  /**
   * Handles async messages received from RabbitMQ.
   *
   * @param {object} msg - The data object containing the message.
   * @param {string} msg.data - The message received from RabbitMQ.
   * @param {string} msg.from - The name of the service that sent the message.
   * @param {string} msg.action - The action to be performed.
   *
   * @returns {Promise<unknown>} - A Promise representing the result of handling the message.
   */
  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: `cold.platform.openai`,
    queue: `cold.platform.openai`,
    allowNonJsonMessages: false,
  })
  async handleAsyncMessages(msg: RabbitMessagePayload): Promise<void | Nack> {
    try {
      msg.data = typeof msg.data == 'string' ? JSON.parse(msg.data) : msg.data;
      this.logger.info(`received async ${msg.event} request from ${msg.from}`, { ...msg });

      this.processAsyncMessage(msg.event, msg.from, msg.data);

      return new Nack();
    } catch (err) {
      this.logger.error(err.message, { ...msg });
      return new Nack();
    }
  }

  async processRPCMessage(event: string, from: string, parsed: any) {
    try {
      this.logger.info(`Processing ${event} event triggered by ${parsed.user?.coldclimate_claims?.email} from ${from}`, { parsed });

      switch (event) {
        case 'organization.created': {
          const response = await this.appService.createAssistant(parsed);
          return response;
        }
        case 'file.uploaded': {
          const uploader = new FileService(this.config, this.appService, this.prisma, this.s3);
          return await uploader.uploadOrgFilesToOpenAI(parsed);
        }
        case 'organization_files.get': {
          return await this.files.listAssistantFiles(parsed.user, parsed.organization.id);
        }
      }
    } catch (e) {
      this.logger.error(e.message, { e, event, from, parsed });
      throw e;
    }
  }

  async processAsyncMessage(event: string, from: string, parsed: any) {
    const { user } = parsed;

    this.logger.info(`Processing ${event} event triggered by ${user?.coldclimate_claims?.email} from ${from}`, {
      ...parsed,
    });

    switch (event) {
      case 'organization.created': {
        const response = await this.appService.createAssistant(parsed);
        return response;
      }
      case 'organization.deleted': {
        const response = await this.appService.deleteAssistant(parsed);
        return response;
      }
      case 'compliance_automation.enabled':
        {
          let surveys;
          if (parsed.surveys) {
            surveys = parsed.surveys;
          } else {
            surveys = parsed.payload.surveys;
          }

          try {
            for (const survey of surveys) {
              await this.queue.add(
                event,
                {
                  survey,
                  user,
                  on_update_url: parsed.on_update_url,
                  compliance: parsed.compliance,
                  integration: parsed.integration,
                  organization: parsed.organization,
                },
                { backoff: { type: BackOffStrategies.EXPONENTIAL } },
              );
            }
          } catch (e) {
            this.logger.error(e.message, e);
          }
        }
        break;
      case 'file.uploaded':
        return await this.queue.add(event, parsed, { backoff: { type: BackOffStrategies.EXPONENTIAL } });
      default:
        return new Nack();
    }
  }
}
