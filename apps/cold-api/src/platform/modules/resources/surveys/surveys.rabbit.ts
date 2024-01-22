import { Injectable } from '@nestjs/common';
import { BaseWorker, MqttService, RabbitMessagePayload } from '@coldpbc/nest';
import { SurveysService } from './surveys.service';
import { Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class SurveysRabbitService extends BaseWorker {
  constructor(private readonly surveys: SurveysService, private mqtt: MqttService) {
    super(SurveysRabbitService.name);
  }

  @RabbitRPC({
    exchange: 'amq.direct',
    routingKey: `cold.core.api.survey_data.rpc`,
    queue: `cold.core.api.survey_data.rpc`,
    allowNonJsonMessages: false,
  })
  async processRPCMessages(msg: RabbitMessagePayload): Promise<any> {
    switch (msg.event) {
      case 'survey_data.updated': {
        this.logger.info(`Received ${msg.event} message from ${msg.from}`, { ...msg });

        const parsed: any = typeof msg.data == 'string' ? JSON.parse(msg.data) : msg.data;

        const { organization, user, survey } = parsed;

        return await this.surveys.submitResults(survey.name, survey, user, organization.id);
      }
      default: {
        const e = new Error(`Received unknown RPC event: ${msg.event}`);
        this.logger.error(e.message, e.stack);
        return new Nack();
      }
    }
  }

  @RabbitRPC({
    exchange: 'amq.direct',
    routingKey: `cold.core.api.survey_data`,
    queue: `cold.core.api.survey_data`,
    allowNonJsonMessages: false,
  })
  async processAsyncMessages(msg: RabbitMessagePayload): Promise<void> {
    switch (msg.event) {
      case 'survey_data.updated': {
        this.logger.info(`Received ${msg.event} message from ${msg.from}`, { ...msg });

        const parsed: any = typeof msg.data == 'string' ? JSON.parse(msg.data) : msg.data;

        const { organization, user, survey } = parsed.data;

        await this.surveys.submitResults(survey.name, survey, user, organization.id);
        break;
      }
      default: {
        const e = new Error(`Received unknown RPC event: ${msg.event}`);
        this.logger.error(e.message, e.stack);
      }
    }
  }
}
