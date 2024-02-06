import { Injectable } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import OpenAI, { UnprocessableEntityError } from 'openai';
import { AppService } from '../app.service';
import { AssistantService } from './assistant.service';
import { BaseWorker } from '@coldpbc/nest';
import { FileService } from './files/file.service';

@Injectable()
@Processor('openai')
export class AssistantConsumer extends BaseWorker {
  client: OpenAI;
  started: Date;

  constructor(private readonly appService: AppService, private readonly assistant: AssistantService, private readonly fileService: FileService) {
    super(AssistantConsumer.name);
    this.client = new OpenAI({
      organization: process.env['OPENAI_ORG_ID'],
      apiKey: process.env['OPENAI_API_KEY'],
    });
  }

  @Process('openai')
  async process(job: Job) {
    this.logger.info(`Received job ${job.id} of type ${job.name}`);
    switch (job.name) {
      case 'file.uploaded':
        return this.processFileJob(job);
      case 'integration.enabled':
        return this.processIntegrationEnabled(job);
      case 'survey':
        return this.processCompliance(job);
      default: {
        const message = `Unknown job type ${job.name}`;
        const apiError = new UnprocessableEntityError(422, undefined, message, undefined);
        this.logger.error(apiError.message, { error: apiError, id: job.id, data: job.data });
        throw apiError;
      }
    }
  }

  @Process('file.uploaded')
  async processFileJob(job: Job) {
    return this.fileService.uploadOrgFilesToOpenAI(job);
  }

  @Process('integration.enabled')
  async processIntegrationEnabled(job: Job) {
    try {
      return await this.appService.createAssistant(job.data);
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
