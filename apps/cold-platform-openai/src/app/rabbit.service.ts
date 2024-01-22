import {Injectable} from '@nestjs/common';
import {BackOffStrategies, BaseWorker, PrismaService, RabbitMessagePayload, S3Service} from '@coldpbc/nest';
import {Nack, RabbitRPC, RabbitSubscribe} from '@golevelup/nestjs-rabbitmq';
import {InjectQueue} from '@nestjs/bull';
import {omit} from 'lodash';
import {toFile} from 'openai';
import {Queue} from 'bull';

import {AppService, OpenAIAssistant} from './app.service';

import {organizations} from '../../../../libs/nest/src/validation/generated/modelSchema/organizationsSchema';
import {OpenaiAssistant} from './openai.assistant';

/**
 * RabbitService class.
 */
@Injectable()
export class RabbitService extends BaseWorker {
  unanswerable = {
    type: 'function',
    function: {
      name: 'unanswerable',
      description: 'Used when a question is NOT answerable by the assistant',
      parameters: {
        type: 'object',
        properties: {
          justification: {
            type: 'string',
            description: 'A paragraph justifying the answer provided',
          },
          what_we_need: {
            type: 'string',
            description: 'a paragraph describing in detail the information you would need to answer the question.',
          },
          reference: {
            type: 'object',
            description: 'a JSON object that describes the source material, if any, that you relied upon to answer the question.',
          },
        },
        required: [],
      },
    },
  };
  answerable = {
    type: 'function',
    function: {
      name: 'answerable',
      description: 'Used when a question is answerable by the assistant',
      parameters: {
        type: 'object',
        required: ['answer'],
        properties: {
          answer: {
            type: ['boolean', 'string', 'array'],
            items: {
              type: 'string',
            },
            description: 'The answer to the prompt.',
          },
          justification: {
            type: 'string',
            description: 'A paragraph justifying the answer provided',
          },
          reference: {
            type: 'object',
            description: 'a JSON object that describes the source material, if any, that you relied upon to answer the question.',
          },
        },
      },
    },
  };

  constructor(
    @InjectQueue('openai') private queue: Queue,
    private assistant: OpenaiAssistant,
    private readonly openAI: AppService,
    private readonly s3: S3Service,
    private readonly prisma: PrismaService,
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
      const parsed: unknown = typeof msg.data == 'string' ? JSON.parse(msg.data) : msg.data;
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
      const parsed = typeof msg.data == 'string' ? JSON.parse(msg.data) : msg.data;
      this.logger.info(`received async ${msg.event} request from ${msg.from}`, { parsed, from: msg.from });

      this.processAsyncMessage(msg.event, msg.from, parsed);

      return new Nack();
    } catch (err) {
      this.logger.error(err.message, { ...msg });
      return new Nack();
    }
  }

  async processRPCMessage(event: string, from: string, parsed: any) {
    try {
      this.logger.info(`Processing ${event} event triggered by ${parsed.user?.coldclimate_claims?.email} from ${from}`, { parsed });

      const service = parsed.service;
      const org: organizations = parsed.organization;
      const user = parsed.user;

      switch (event) {
        case 'integration.enabled': {
          const assistant: OpenAIAssistant = {
            name: `${org.name}`,
            instructions: `You are an AI sustainability expert. You help ${org.display_name} understand their impact on the environment and what tasks they must complete to meet a given set of compliance requirements. Enter your responses in a json format`,
            description: `OpenAI assistant for ${org.display_name}`,
            model: 'gpt-4-1106-preview',
            tools: [{ type: 'retrieval' }, this.answerable, this.unanswerable],
          };

          const response = await this.openAI.createAssistant(user, org, service, assistant);
          return response;
        }
        case 'file.uploaded': {
          const { uploaded, user } = parsed;
          const s3File: any = await this.s3.getObject(user, 'cold-api-uploaded-files', uploaded.key);

          const files = await this.openAI.client.files.list();
          let oaiFile = files.data.find(async f => {
            const s3File: any = await this.s3.getObject(user, 'cold-api-uploaded-files', uploaded.key);

            return f.filename == `${uploaded.original_name}:${s3File.Metadata.md5hash}`;
          });

          if (!oaiFile) {
            oaiFile = await this.openAI.client.files.create({
              file: await toFile(s3File.Body as Buffer, `${uploaded.original_name}:${s3File.Metadata.md5hash}`),
              purpose: 'assistants',
            });
          } else {
            this.logger.warn(`File ${uploaded.original_name}:${s3File.Metadata.md5hash} already exists in openAI`, {
              oaiFile,
              ...omit(s3File, ['Body']),
              user,
              uploaded,
            });
          }

          const response = await this.openAI.linkFile(user, { id: uploaded.organization_id }, oaiFile.id, uploaded.original_name, uploaded.key, uploaded.bucket);

          this.logger.info(`Created new file `, {
            openai_file: oaiFile,
            ...omit(s3File, ['Body']),
            user,
            uploaded,
            openai_response: response,
          });
          break;
        }
      }
    } catch (e) {
      this.logger.error(e.message, { e, event, from, parsed });
      throw e;
    }
  }

  async processAsyncMessage(event: string, from: string, parsed: any) {
    const service = parsed.service;
    const organization: organizations = parsed.organization;
    const user = parsed.user;

    this.logger.info(`Processing ${event} event triggered by ${user?.coldclimate_claims?.email} from ${from}`, {
      parsed,
      from,
      event,
      service,
      organization,
      user,
    });

    switch (event) {
      case 'organization_compliances.created':
        return await this.assistant.processComplianceJob({ event, from, ...parsed });

      case 'integration.enabled': {
        const assistant: OpenAIAssistant = {
          name: `${organization.name}`,
          instructions: `You are an AI sustainability expert. You help ${organization.display_name} understand their impact on the environment and what tasks they must complete to meet a given set of compliance requirements. Enter your responses in a json format`,
          description: `OpenAI assistant for ${organization.display_name}`,
          model: 'gpt-4-1106-preview',
          tools: [{ type: 'retrieval' }, this.answerable, this.unanswerable],
        };

        return await this.openAI.createAssistant(user, organization, service, assistant);
      }
      case 'file.uploaded': {
        const { uploaded, user } = parsed;
        const s3File: any = await this.s3.getObject(user, 'cold-api-uploaded-files', uploaded.key);
        const filename = `${uploaded.original_name}:${s3File.Metadata.md5hash}`;

        const files = await this.openAI.client.files.list();
        let oaiFile = files.data.find(f => {
          return f.filename == filename;
        });

        if (!oaiFile) {
          oaiFile = await this.openAI.client.files.create({
            file: await toFile(s3File.Body as Buffer, filename),
            purpose: 'assistants',
          });
        } else {
          this.logger.warn(`File ${uploaded.original_name}:${s3File.Metadata.md5Hash} already exists in openAI`, {
            oaiFile,
            ...omit(s3File, ['Body']),
            user,
            uploaded,
          });
        }

        const response = await this.openAI.linkFile(user, { id: uploaded.organization_id }, oaiFile.id, filename, uploaded.key, uploaded.bucket);

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
        const job = await this.queue.add(event, parsed, { backoff: { type: BackOffStrategies.EXPONENTIAL } });
        this.logger.info(`${job.name} job added to ${job.queue['keyPrefix']} ${job.queue.name} queue`, {
          id: job.id,
          event,
          from,
          data: job.data,
        });
        break;
      }
    }
  }
}
