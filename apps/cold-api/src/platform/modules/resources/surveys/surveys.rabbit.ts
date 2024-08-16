import { Injectable } from '@nestjs/common';
import { BaseWorker, MqttService, RabbitMessagePayload } from '@coldpbc/nest';
import { SurveysService } from './surveys.service';
import { Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { omit } from 'lodash';

@Injectable()
export class SurveysRabbitService extends BaseWorker {
  constructor(readonly surveys: SurveysService, mqtt: MqttService) {
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
        this.logger.info(`Received ${msg.event} message from ${msg.from}`, omit(msg.data, ['survey']));

        const parsed: any = typeof msg.data == 'string' ? JSON.parse(msg.data) : msg.data;

        const { organization, user, survey } = parsed;

        return await this.surveys.submitResults(survey.name, survey, { user, organization }, organization.id);
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
  async processAsyncMessages(msg: RabbitMessagePayload): Promise<void | Nack> {
    try {
      switch (msg.event) {
        case 'survey_data.updated': {
          this.logger.info(`Received ${msg.event} message from ${msg.from}`, omit(msg.data, ['survey']));

          const parsed: any = typeof msg.data == 'string' ? JSON.parse(msg.data) : msg.data;

          const { organization, user, survey } = parsed;

          await this.surveys.submitResults(survey.name, survey, { user, organization }, organization.id);
          break;
        }
        default: {
          const e = new Error(`Received unknown ASYNC event: ${msg.event}`);
          this.logger.error(e.message, e.stack);
          return new Nack(false);
        }
      }
    } catch (err) {
      this.logger.error(err.message, err.stack);
      return new Nack(false);
    }
  }
}
