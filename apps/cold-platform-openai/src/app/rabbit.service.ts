import {Injectable} from '@nestjs/common';
import {BackOffStrategies, BaseWorker, PrismaService, RabbitMessagePayload, S3Service} from '@coldpbc/nest';
import {Nack, RabbitRPC, RabbitSubscribe} from '@golevelup/nestjs-rabbitmq';
import {InjectQueue} from '@nestjs/bull';
import {omit} from 'lodash';
import {toFile} from 'openai';
import {Queue} from 'bull';
import {AppService, OpenAIAssistant} from './app.service';
import {organizations} from '../../../../libs/nest/src/validation/generated/modelSchema/organizationsSchema';

/**
 * RabbitService class.
 */
@Injectable()
export class RabbitService extends BaseWorker {
  constructor(@InjectQueue('openai') private queue: Queue, private readonly openAI: AppService, private readonly s3: S3Service, private readonly prisma: PrismaService) {
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
  async handleRPCMessages(msg: RabbitMessagePayload): Promise<unknown> {
    try {
      const parsed: unknown = typeof msg.data == 'string' ? JSON.parse(msg.data) : msg.data;
      this.logger.debug(`received RPC ${msg.event} request from ${msg.from}`, parsed);
      //const job = await this.queue.add(parsed, { backoff: BackOffStrategies.EXPONENTIAL });
      const response = this.processRPCMessage(msg.event, msg.from, parsed);

      return response;
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
  async handleAsyncMessages(msg: RabbitMessagePayload): Promise<unknown> {
    try {
      const parsed = typeof msg.data == 'string' ? JSON.parse(msg.data) : msg.data;
      this.logger.info(`received async ${msg.event} request from ${msg.from}`, { parsed, from: msg.from });
      //

      switch (msg.event) {
        case 'file.uploaded': {
          const { uploaded, user } = parsed;
          const s3File = await this.s3.getObject(user, 'cold-api-uploaded-files', uploaded.key);

          const files = await this.openAI.client.files.list();
          let oaiFile = files.data.find(f => f.filename == `${uploaded.original_name}:${s3File.Metadata.md5Hash}`);

          if (!oaiFile) {
            oaiFile = await this.openAI.client.files.create({
              file: await toFile(s3File.Body as Buffer, `${uploaded.original_name}:${s3File.Metadata.md5Hash}`),
              purpose: 'assistants',
            });
          } else {
            this.logger.warn(`File ${uploaded.original_name}:${s3File.Metadata.md5Hash} already exists in openAI`, {
              oaiFile,
              s3File,
              user,
              uploaded,
            });
          }

          const response = await this.openAI.linkFileToAssistant(user, { id: uploaded.organization_id }, oaiFile.id, uploaded.key, uploaded.bucket);

          this.logger.info(`Created new file `, {
            openai_file: oaiFile,
            ...omit(s3File, ['Body']),
            user,
            uploaded,
            openai_response: response,
          });
          break;
        }
        default: {
          const job = await this.queue.add(msg.event, parsed, { backoff: { type: BackOffStrategies.EXPONENTIAL } });
          this.logger.info(`${job.name} job added to ${job.queue['keyPrefix']} ${job.queue.name} queue`, {
            id: job.id,
            event: msg.event,
            from: msg.from,
            data: job.data,
          });
          break;
        }
      }
    } catch (err) {
      this.logger.error(err.message, { ...msg });
      return new Nack();
    }
  }

  async processRPCMessage(event: string, from: string, data: unknown) {
    try {
      this.logger.info(`Processing ${event} event triggered by ${data['user']['coldclimate_claims']['email']} from ${from}`, { data });

      const service = data['service'];
      const org: organizations = data['organization'];
      const user = data['user'];

      switch (event) {
        case 'integration.enabled': {
          const assistant: OpenAIAssistant = {
            name: `${org.name}`,
            instructions: `You are an AI sustainability expert. You help ${org.display_name} understand their impact on the environment and what tasks they must complete to meet a given set of compliance requirements. Enter your responses in a json format`,
            description: `OpenAI assistant for ${org.display_name}`,
            model: 'gpt-4-1106-preview',
          };

          return await this.openAI.createAssistant(user, org, service, assistant);
        }
      }
    } catch (e) {
      this.logger.error(e.message, { e, event, from, data });
      throw e;
    }
  }

  async processAsyncMessage(event: string, from: string, data: unknown) {
    this.logger.info(`Processing ${event} event triggered by ${data['user']['coldclimate_claims']['email']} from ${from}`, { data });

    const service = data['service'];
    const org: organizations = data['organization'];
    const user = data['user'];

    switch (event) {
      case 'integration.enabled': {
        const assistant: OpenAIAssistant = {
          name: `${org.name}`,
          instructions: `You are an AI sustainability expert. You help ${org.display_name} understand their impact on the environment and what tasks they must complete to meet a given set of compliance requirements. Enter your responses in a json format`,
          description: `OpenAI assistant for ${org.display_name}`,
          model: 'gpt-4-1106-preview',
        };

        return await this.openAI.createAssistant(user, org, service, assistant);
      }
    }
  }
}
