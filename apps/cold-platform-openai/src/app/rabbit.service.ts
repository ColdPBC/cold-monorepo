import {Injectable, Logger, LoggerService} from '@nestjs/common';
import {BackOffStrategies, Cuid2Generator, PrismaService, RabbitMessagePayload, S3Service} from '@coldpbc/nest';
import {Nack, RabbitRPC, RabbitSubscribe} from '@golevelup/nestjs-rabbitmq';
import {InjectFlowProducer, InjectQueue} from '@nestjs/bullmq';
import {Queue} from 'bull';
import {AppService} from './app.service';
import {organizations, survey_definitions} from '@prisma/client';

import {FileService} from './assistant/files/file.service';

import {FlowProducer} from 'bullmq';

/**
 * RabbitService class.
 */
@Injectable()
export class RabbitService {
  logger: LoggerService;

  constructor(
    @InjectFlowProducer('flow') private surveyFlow: FlowProducer,
    @InjectQueue('openai-flows') private queue: Queue,
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
    private readonly s3: S3Service,
  ) {
    //super(RabbitService.name);

    this.logger = new Logger();
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
      //     this.logger.log(`received RPC ${msg.event} request from ${msg.from}`, parsed);

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
      //     this.logger.debug(`received async ${msg.event} request from ${msg.from}`, { parsed, from: msg.from });

      this.processAsyncMessage(msg.event, msg.from, parsed);

      return new Nack();
    } catch (err) {
      this.logger.error(err.message, { ...msg });
      return new Nack();
    }
  }

  async processRPCMessage(event: string, from: string, parsed: any) {
    try {
      this.logger.debug(`Processing ${event} event triggered by ${parsed.user?.coldclimate_claims?.email} from ${from}`, { parsed });

      switch (event) {
        case 'integration.enabled': {
          const response = await this.appService.createAssistant(parsed);
          return response;
        }
        case 'file.uploaded': {
          const uploader = new FileService(this.appService, this.prisma, this.s3);
          return await uploader.uploadOrgFilesToOpenAI(parsed);
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

    this.logger.log(`Processing ${event} event triggered by ${user?.coldclimate_claims?.email} from ${from}`, {
      parsed,
      from,
      event,
      service,
      organization,
      user,
    });

    switch (event) {
      case 'organization_compliances.created':
        {
          const flowCUID = new Cuid2Generator('flow');
          const surveys = parsed.surveys;
          const flow = {
            name: `${organization.id}:surveys`,
            queueName: 'openai-flows',
            opts: {
              jobId: flowCUID.generate().scopedId,
            },
            children: [],
          };
          try {
            for (const survey of surveys as survey_definitions[]) {
              const surveyFlow = {
                name: `${organization.id}:${survey.name}`,
                data: {
                  survey,
                  user,
                  compliance: parsed.compliance,
                  integration: parsed.integration,
                  organization: parsed.organization,
                },
                opts: {
                  jobId: flowCUID.generate('survey').scopedId,
                },
                queueName: 'openai-survey',
              };
              /*
const sections = Object.keys(survey.definition['sections']);

// Add sections to survey flow
for (const section of sections) {
const sectionFlow = {
id: flowCUID.generate(section).scopedId,
name: `${organization.id}:${survey.name}:${section}`,
data: {
survey,
user,
compliance: parsed.compliance,
integration: parsed.integration,
organization: parsed.organization,
section,
},
children: [],
queueName: 'openai-survey-section',
};

const questions = Object.keys(survey.definition['sections'][section]['follow_up']);

// Add questions to section flow
for (const question of questions) {
sectionFlow.children.push({
id: flowCUID.generate(question).scopedId,
name: `${organization.id}:${survey.name}:${section}:${question}`,
data: {
survey,
user,
compliance: parsed.compliance,
integration: parsed.integration,
organization: parsed.organization,
section,
question,
},
queueName: 'openai-survey-section-question',
});
}

surveyFlow.children.push(sectionFlow);
} // End of sections

*/

              flow.children.push(surveyFlow);
            }

            return await this.surveyFlow.add(flow);
          } catch (e) {
            this.logger.error(e.message, e);
          }
        }
        break;
      case 'integration.enabled': {
        return await this.queue.add('integration.enabled', parsed, { backoff: { type: BackOffStrategies.EXPONENTIAL } });
      }
      case 'file.uploaded': {
        return await this.queue.add('file.uploaded', parsed, { backoff: { type: BackOffStrategies.EXPONENTIAL } });
      }
      default: {
        const job = await this.queue.add(event, parsed, { backoff: { type: BackOffStrategies.EXPONENTIAL } });
        this.logger.log(`${job.name} job added to ${job.queue['keyPrefix']} ${job.queue.name} queue`, {
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
