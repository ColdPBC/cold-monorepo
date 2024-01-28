import { Injectable } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import OpenAI from 'openai';
import { AppService } from '../app.service';
import { AssistantService } from './assistant.service';
import { BaseWorker } from '@coldpbc/nest';

@Injectable()
@Processor('openai')
export class AssistantConsumer extends BaseWorker {
  client: OpenAI;
  started: Date;

  constructor(private readonly appService: AppService, private readonly assistant: AssistantService) {
    super(AssistantConsumer.name);
    this.client = new OpenAI({
      organization: process.env['OPENAI_ORG_ID'],
      apiKey: process.env['OPENAI_API_KEY'],
    });
  }

  @Process('file.uploaded')
  async processMessages() {
    throw new Error('Not implemented');
  }

  @Process('integration.enabled')
  async processIntegrationEnabled(job: Job) {
    try {
      const { user, organization, service, assistant } = job.data;
      await this.appService.createAssistant(user, organization, service, assistant);
    } catch (e) {
      this.logger.error(e.message, e);
      throw e;
    }
  }

  @Process('survey')
  async processCompliance(job: Job) {
    try {
      await this.assistant.process_survey(job);
    } catch (e) {
      this.logger.error(e.message, e);
      throw e;
    }
  }
}
