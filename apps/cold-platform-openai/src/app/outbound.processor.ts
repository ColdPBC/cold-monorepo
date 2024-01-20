import { OnQueueActive, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { BaseWorker } from '@coldpbc/nest';
import { AppService } from './app.service';
import { OpenaiAssistant } from './openai.assistant';
import OpenAI from 'openai';

@Processor('openai')
export class OutboundQueueProcessor extends BaseWorker {
  constructor(private readonly openAI: AppService, private readonly assistant: OpenaiAssistant) {
    super(OutboundQueueProcessor.name);
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.info(`Processing job ${job.id} of type ${job.name} with data ${job.data}`, job);
  }

  @OnQueueFailed()
  onFailed(job: Job) {
    this.logger.error(`Job ${job.id} of type ${job.name} FAILED ${job.failedReason}`, job);
  }

  @Process('file.uploaded')
  async processMessages() {
    throw new Error('Not implemented');
  }

  @Process('compliance.activated')
  async processCompliance(job: Job) {
    //this.logger.info(`Received new compliance.activated job}`, { name: job.name, id: job.id });
    const client = new OpenAI({
      organization: process.env['OPENAI_ORG_ID'],
      apiKey: process.env['OPENAI_API_KEY'],
    });

    this.logger.info(`Creating thread`);
    const thread = await client.beta.threads.create();

    this.logger.info(`Created thread`, thread);

    //await this.assistant.processComplianceJob(job);

    /*stream.on('connect', () => {
      this.logger.info(`Connected to stream ${stream}`);
    });
    stream.on('message', message => {
      this.logger.info(`Received message ${message}`);
    });
    stream.on('error', error => {
      this.logger.error(`Received error ${error}`);
    });
    stream.on('end', () => {
      this.logger.info(`Received end event`);
    });
    stream.on('chatCompletion', completion => {
      completion.choices.forEach(choice => {
        this.logger.info(`Received choice ${choice}`);
      });
    });
    stream.on('chatCompletion', () => {
      this.logger.info(`Received close event`);
    });*/

    /**
     * connect: () => void;
     *   functionCall: (functionCall: ChatCompletionMessage.FunctionCall) => void;
     *   message: (message: ChatCompletionMessageParam) => void;
     *   chatCompletion: (completion: ChatCompletion) => void;
     *   finalContent: (contentSnapshot: string) => void;
     *   finalMessage: (message: ChatCompletionMessageParam) => void;
     *   finalChatCompletion: (completion: ChatCompletion) => void;
     *   finalFunctionCall: (functionCall: ChatCompletionMessage.FunctionCall) => void;
     *   functionCallResult: (content: string) => void;
     *   finalFunctionCallResult: (content: string) => void;
     *   error: (error: OpenAIError) => void;
     *   abort: (error: APIUserAbortError) => void;
     *   end: () => void;
     *   totalUsage:
     */
  }
}
